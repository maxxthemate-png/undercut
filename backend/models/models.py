"""
ListingArb — Database Models
All core entities: listings, sellers, deals, platforms, outreach, audit log
"""

from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text,
    ForeignKey, Enum, JSON, Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, DeclarativeBase
import uuid


class Base(DeclarativeBase):
    pass


# ─── Enums ───────────────────────────────────────────────────────────────────

class ListingStatus(str, PyEnum):
    NEW = "new"
    SCORED = "scored"
    QUEUED_OUTREACH = "queued_outreach"
    DM_SENT = "dm_sent"
    SELLER_INTERESTED = "seller_interested"
    AGREEMENT_SENT = "agreement_sent"
    AGREEMENT_SIGNED = "agreement_signed"
    PHOTOS_ARRANGED = "photos_arranged"
    LISTING_CREATED = "listing_created"
    POSTED = "posted"
    BUYER_FOUND = "buyer_found"
    DEAL_CLOSED = "deal_closed"
    REJECTED = "rejected"
    EXPIRED = "expired"


class SellerResponseType(str, PyEnum):
    INTERESTED = "interested"
    NOT_INTERESTED = "not_interested"
    QUESTION = "question"
    NEGOTIATING = "negotiating"
    NO_RESPONSE = "no_response"


class PlatformStatus(str, PyEnum):
    PENDING = "pending"
    POSTED = "posted"
    ACTIVE = "active"
    SOLD = "sold"
    EXPIRED = "expired"
    ERROR = "error"


# ─── Models ──────────────────────────────────────────────────────────────────

class Listing(Base):
    """
    Core entity — a marketplace listing we've discovered.
    Tracks the full lifecycle from discovery to deal close.
    """
    __tablename__ = "listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    external_id = Column(String(255), unique=True, nullable=False, index=True)
    source_platform = Column(String(50), nullable=False)  # facebook, craigslist, etc.
    source_url = Column(Text, nullable=False)

    # Item details
    title = Column(String(500), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    category = Column(String(100))
    condition = Column(String(50))
    year = Column(Integer)
    make = Column(String(100))
    model = Column(String(100))
    mileage = Column(Integer)
    location_city = Column(String(100))
    location_state = Column(String(50))
    photos = Column(JSON)  # List of photo URLs

    # Scoring
    deal_score = Column(Float)           # 0-100, higher = better deal
    estimated_market_value = Column(Float)
    estimated_upside = Column(Float)     # Projected fee we'd earn
    score_reasoning = Column(Text)       # Why the AI scored it this way

    # Status
    status = Column(Enum(ListingStatus), default=ListingStatus.NEW, index=True)

    # Seller linkage
    seller_id = Column(UUID(as_uuid=True), ForeignKey("sellers.id"))
    seller = relationship("Seller", back_populates="listings")

    # Timestamps
    discovered_at = Column(DateTime, default=datetime.utcnow)
    listed_at = Column(DateTime)          # When seller originally posted
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    outreach_attempts = relationship("OutreachAttempt", back_populates="listing")
    platform_listings = relationship("PlatformListing", back_populates="listing")
    deal = relationship("Deal", back_populates="listing", uselist=False)

    __table_args__ = (
        Index("ix_listings_status_score", "status", "deal_score"),
        Index("ix_listings_source", "source_platform", "external_id"),
    )


class Seller(Base):
    """
    A person who listed something on Facebook Marketplace.
    Tracks communication history and agreement status.
    """
    __tablename__ = "sellers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    fb_profile_url = Column(String(500), unique=True)
    fb_user_id = Column(String(100), index=True)
    name = Column(String(200))
    location = Column(String(200))
    member_since = Column(String(50))

    # Communication
    dm_thread_url = Column(Text)
    last_dm_sent_at = Column(DateTime)
    dm_count = Column(Integer, default=0)
    response_type = Column(Enum(SellerResponseType))
    last_response_at = Column(DateTime)

    # Agreement
    agreement_sent_at = Column(DateTime)
    agreement_signed_at = Column(DateTime)
    agreement_pdf_url = Column(Text)

    # Reputation (from past deals)
    deals_completed = Column(Integer, default=0)
    is_blocked = Column(Boolean, default=False)  # Never DM again
    notes = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    listings = relationship("Listing", back_populates="seller")


class OutreachAttempt(Base):
    """
    Individual DM attempt record — full audit trail of every message sent.
    """
    __tablename__ = "outreach_attempts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"), nullable=False)
    listing = relationship("Listing", back_populates="outreach_attempts")

    dm_text = Column(Text, nullable=False)
    sent_at = Column(DateTime)
    sent_successfully = Column(Boolean)
    error_message = Column(Text)

    # Response tracking
    response_text = Column(Text)
    response_at = Column(DateTime)
    response_classification = Column(Enum(SellerResponseType))
    auto_replied = Column(Boolean, default=False)
    auto_reply_text = Column(Text)


class PlatformListing(Base):
    """
    Tracks where we've posted a listing and its status on each platform.
    """
    __tablename__ = "platform_listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"), nullable=False)
    listing = relationship("Listing", back_populates="platform_listings")

    platform = Column(String(100), nullable=False)  # ebay_motors, rvtrader, etc.
    platform_listing_id = Column(String(255))        # ID on that platform
    platform_url = Column(Text)
    listed_price = Column(Float)

    status = Column(Enum(PlatformStatus), default=PlatformStatus.PENDING)
    posted_at = Column(DateTime)
    expires_at = Column(DateTime)
    views = Column(Integer, default=0)
    inquiries = Column(Integer, default=0)

    error_message = Column(Text)

    __table_args__ = (
        Index("ix_platform_listings_platform", "platform", "status"),
    )


class Deal(Base):
    """
    A completed or in-progress deal — tracks the financial outcome.
    """
    __tablename__ = "deals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"), unique=True)
    listing = relationship("Listing", back_populates="deal")

    seller_asking_price = Column(Float, nullable=False)
    buyer_offer_price = Column(Float)
    our_fee = Column(Float)           # buyer_offer - seller_asking

    # Buyer info
    buyer_name = Column(String(200))
    buyer_contact = Column(String(200))
    buyer_found_via = Column(String(100))  # Which platform

    # Timeline
    buyer_inquiry_at = Column(DateTime)
    offer_made_at = Column(DateTime)
    deal_agreed_at = Column(DateTime)
    deal_closed_at = Column(DateTime)

    # Photo package upsell
    photo_package_sold = Column(Boolean, default=False)
    photo_package_fee = Column(Float, default=0)

    total_revenue = Column(Float)  # our_fee + photo_package_fee
    notes = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)


class AuditLog(Base):
    """
    Immutable log of every automated action — for debugging and compliance.
    """
    __tablename__ = "audit_log"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    entity_type = Column(String(50))   # listing, seller, deal, system
    entity_id = Column(String(100))
    action = Column(String(200), nullable=False)
    actor = Column(String(50), default="system")  # system, operator, agent_name
    details = Column(JSON)
    success = Column(Boolean, default=True)
    error = Column(Text)


class SystemState(Base):
    """
    Global system state — pause/resume, autonomy level, stats.
    """
    __tablename__ = "system_state"

    id = Column(Integer, primary_key=True, default=1)
    is_paused = Column(Boolean, default=False)
    autonomy_level = Column(Integer, default=1)
    pause_reason = Column(Text)
    paused_at = Column(DateTime)
    paused_by = Column(String(100))
    last_scrape_at = Column(DateTime)
    total_dms_sent = Column(Integer, default=0)
    total_deals_closed = Column(Integer, default=0)
    total_revenue = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
