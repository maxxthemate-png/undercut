"""Repricer domain models (multi-tenant eBay repricing SaaS).

Each Store is one connected eBay seller. RepricerListing is one of their
listings under price automation. PriceChange + CompetitorSnapshot are audit
trails. Uses the same declarative Base as the rest of the app.
"""
import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .models import Base


class User(Base):
    """A SaaS customer — the multi-tenant owner of Stores."""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    plan = Column(String(20), default="free")          # trial | free | starter | pro | scale
    listing_limit = Column(Integer, default=25)
    stripe_customer_id = Column(String(100))
    stripe_subscription_id = Column(String(100))
    trial_ends_at = Column(DateTime)                   # founding-trial expiry (no-card); NULL = not on trial
    last_lifecycle_email = Column(DateTime)            # last nurture/lifecycle email sent
    last_lifecycle_stage = Column(String(30))          # e.g. trial_ending | trial_expired
    email_unsubscribed = Column(Boolean, default=False)  # CAN-SPAM opt-out (marketing/lifecycle)
    payment_status = Column(String(20), default="ok")  # ok | past_due (dunning; plan untouched)
    payment_failed_at = Column(DateTime)               # first failure of the current dunning cycle
    first_reprice_emailed_at = Column(DateTime)        # one-shot 'first reprice' email stamp
    last_weekly_digest_at = Column(DateTime)           # weekly digest cadence stamp
    winback_emailed_at = Column(DateTime)              # one-shot win-back email stamp

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    stores = relationship("Store", back_populates="user")


class Store(Base):
    """A connected eBay seller account (one tenant)."""
    __tablename__ = "stores"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    name = Column(String(200))
    ebay_user_id = Column(String(100), index=True)

    # OAuth tokens for this seller's eBay account
    oauth_access_token = Column(Text)
    oauth_refresh_token = Column(Text)
    token_expires_at = Column(DateTime)

    is_active = Column(Boolean, default=True)
    # account-level defaults (per-listing rules can override)
    ai_enabled = Column(Boolean, default=True)
    default_undercut_value = Column(Float, default=0.01)
    default_undercut_type = Column(String(10), default="amount")  # amount | percent

    last_reprice_run_at = Column(DateTime)             # last scheduled run that processed this store
    connected_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="stores")
    listings = relationship("RepricerListing", back_populates="store")


class RepricerListing(Base):
    """One eBay listing under price automation."""
    __tablename__ = "repricer_listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    store_id = Column(UUID(as_uuid=True), ForeignKey("stores.id"), nullable=False, index=True)
    store = relationship("Store", back_populates="listings")

    ebay_item_id = Column(String(50), index=True)
    sku = Column(String(120))
    title = Column(String(500))
    category_id = Column(String(20))

    current_price = Column(Float)
    quantity = Column(Integer, default=1)

    # pricing rule (per listing)
    floor_price = Column(Float)            # hard minimum — never price below
    ceiling_price = Column(Float)          # optional maximum
    undercut_value = Column(Float, default=0.01)
    undercut_type = Column(String(10), default="amount")  # amount | percent
    ai_enabled = Column(Boolean, default=True)
    repricing_enabled = Column(Boolean, default=False, index=True)

    last_competitor_low = Column(Float)
    last_repriced_at = Column(DateTime)
    consecutive_failures = Column(Integer, default=0)  # eBay update failures in a row
    last_error = Column(Text)
    last_error_at = Column(DateTime)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    changes = relationship("PriceChange", back_populates="listing")


class PriceChange(Base):
    """Audit log of every reprice."""
    __tablename__ = "price_changes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("repricer_listings.id"), nullable=False, index=True)
    listing = relationship("RepricerListing", back_populates="changes")

    old_price = Column(Float)
    new_price = Column(Float)
    competitor_low = Column(Float)
    source = Column(String(20))            # rule | ai
    reason = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class CompetitorSnapshot(Base):
    """Point-in-time competitor pricing for a listing."""
    __tablename__ = "competitor_snapshots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("repricer_listings.id"), nullable=False, index=True)
    lowest_price = Column(Float)
    listing_count = Column(Integer)
    fetched_at = Column(DateTime, default=datetime.utcnow, index=True)


class Lead(Base):
    """A captured lead / waitlist email (pre-account) — from the marketing pages."""
    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False, index=True)
    source = Column(String(50))            # landing | compare | ...
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    nurture_stage = Column(Integer, default=0)   # 0=none,1=day1,2=day3,3=day7,99=converted/done
    last_emailed_at = Column(DateTime)
    email_unsubscribed = Column(Boolean, default=False)  # CAN-SPAM opt-out


class RepriceRun(Base):
    """One scheduled/manual reprice run — powers the ops digest + staleness alarm."""
    __tablename__ = "reprice_runs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ran_at = Column(DateTime, default=datetime.utcnow, index=True)
    checked = Column(Integer, default=0)
    repriced = Column(Integer, default=0)
    errors = Column(Integer, default=0)
    error_sample = Column(Text)
