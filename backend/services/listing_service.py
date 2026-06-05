"""Business-logic layer between the API / Celery tasks and the database.

Two calling conventions live here:

* **Worker-facing** coroutines (``ingest_listings``, ``get_queued_for_outreach`` …)
  manage their own DB session, because the Celery tasks call them with no session
  in scope, e.g. ``await ingest_listings(rows)``.
* **API-facing** helpers (``query_listings``, ``get_listing_detail`` …) take an
  injected ``Session`` (FastAPI ``Depends(get_db)``) and return plain dicts.

ORM objects returned to the worker are safe to read after the session closes
because the engine uses ``expire_on_commit=False`` and relationships are
eager-loaded before return.
"""
import uuid as _uuidlib
from contextlib import contextmanager
from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import select, func
from sqlalchemy.orm import Session, joinedload

from ..utils.logging import get_logger
from ..models.database import SessionLocal
from ..models.models import (
    Listing, Seller, OutreachAttempt, Deal, PlatformListing,
    ListingStatus, SellerResponseType, PlatformStatus, SystemState,
)

logger = get_logger(__name__)


# ─── Session + small helpers ──────────────────────────────────────────────────
@contextmanager
def _session():
    """Self-managing session: commit on success, rollback on error, always close."""
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def _uuid(value) -> Optional[_uuidlib.UUID]:
    try:
        return _uuidlib.UUID(str(value))
    except (ValueError, TypeError, AttributeError):
        return None


def _enum(v):
    return v.value if hasattr(v, "value") else v


def _iso(dt):
    return dt.isoformat() if isinstance(dt, datetime) else None


def _split_location(loc: str):
    if not loc:
        return None, None
    parts = [p.strip() for p in loc.replace(";", ",").split(",")]
    city = parts[0] if parts and parts[0] else None
    state = parts[1] if len(parts) > 1 and parts[1] else None
    return city, state


# ─── Serializers ────────────────────────────────────────────────────────────
def listing_to_dict(l: Listing) -> dict:
    return {
        "id": str(l.id),
        "external_id": l.external_id,
        "source_platform": l.source_platform,
        "source_url": l.source_url,
        "title": l.title,
        "description": l.description,
        "price": l.price,
        "category": l.category,
        "condition": l.condition,
        "year": l.year,
        "make": l.make,
        "model": l.model,
        "mileage": l.mileage,
        "location_city": l.location_city,
        "location_state": l.location_state,
        "photos": l.photos or [],
        "deal_score": l.deal_score,
        "estimated_market_value": l.estimated_market_value,
        "estimated_upside": l.estimated_upside,
        "score_reasoning": l.score_reasoning,
        "status": _enum(l.status),
        "seller_id": str(l.seller_id) if l.seller_id else None,
        "discovered_at": _iso(l.discovered_at),
        "listed_at": _iso(l.listed_at),
        "updated_at": _iso(l.updated_at),
    }


def deal_to_dict(d: Deal) -> dict:
    return {
        "id": str(d.id),
        "listing_id": str(d.listing_id) if d.listing_id else None,
        "seller_asking_price": d.seller_asking_price,
        "buyer_offer_price": d.buyer_offer_price,
        "our_fee": d.our_fee,
        "buyer_name": d.buyer_name,
        "buyer_contact": d.buyer_contact,
        "buyer_found_via": d.buyer_found_via,
        "buyer_inquiry_at": _iso(d.buyer_inquiry_at),
        "offer_made_at": _iso(d.offer_made_at),
        "deal_agreed_at": _iso(d.deal_agreed_at),
        "deal_closed_at": _iso(d.deal_closed_at),
        "photo_package_sold": d.photo_package_sold,
        "photo_package_fee": d.photo_package_fee,
        "total_revenue": d.total_revenue,
        "notes": d.notes,
        "created_at": _iso(d.created_at),
    }


# ══════════════════════════════════════════════════════════════════════════════
# WORKER-FACING  (self-managing session — called by Celery tasks)
# ══════════════════════════════════════════════════════════════════════════════
async def ingest_listings(scored: list[dict]) -> dict:
    """Upsert scored listing dicts (keyed on external_id). Qualified rows become
    QUEUED_OUTREACH so the outreach task picks them up."""
    ingested = updated = 0
    with _session() as db:
        for row in scored:
            ext = row.get("external_id")
            if not ext:
                continue
            city, state = _split_location(row.get("location", ""))
            fields = dict(
                source_platform=row.get("source_platform", "facebook"),
                source_url=row.get("source_url", ""),
                title=(row.get("title") or "")[:500],
                description=row.get("description"),
                price=float(row.get("price") or 0),
                category=row.get("category"),
                location_city=city,
                location_state=state,
                photos=row.get("photos") or [],
                deal_score=row.get("deal_score"),
                estimated_market_value=row.get("estimated_market_value"),
                estimated_upside=row.get("estimated_upside"),
                score_reasoning=row.get("score_reasoning"),
            )
            existing = db.scalar(select(Listing).where(Listing.external_id == ext))
            if existing:
                for k, v in fields.items():
                    setattr(existing, k, v)
                if existing.status == ListingStatus.NEW:
                    existing.status = ListingStatus.QUEUED_OUTREACH
                updated += 1
            else:
                db.add(Listing(external_id=ext, status=ListingStatus.QUEUED_OUTREACH, **fields))
                ingested += 1
    logger.info("Listings ingested", ingested=ingested, updated=updated)
    return {"ingested": ingested, "updated": updated}


async def get_queued_for_outreach(limit: int = 10) -> list[Listing]:
    """Listings ready for a first DM (best deals first). Seller eager-loaded."""
    with _session() as db:
        rows = db.scalars(
            select(Listing)
            .options(joinedload(Listing.seller))
            .where(Listing.status == ListingStatus.QUEUED_OUTREACH)
            .order_by(Listing.deal_score.desc().nullslast())
            .limit(limit)
        ).all()
        for r in rows:
            _ = r.seller  # force-load relationship while session is open
        return rows


def get_queued_for_outreach_sync(count_only: bool = False):
    """Synchronous variant used by the Level-1 'notify operator' path."""
    with _session() as db:
        base = select(Listing).where(Listing.status == ListingStatus.QUEUED_OUTREACH)
        if count_only:
            return db.scalar(
                select(func.count()).select_from(Listing)
                .where(Listing.status == ListingStatus.QUEUED_OUTREACH)
            ) or 0
        rows = db.scalars(base.options(joinedload(Listing.seller))).all()
        for r in rows:
            _ = r.seller
        return rows


async def mark_dm_sent(listing_id: str, dm_text: str, sent_at: datetime) -> None:
    """Record a successful DM: log an OutreachAttempt, advance status, bump seller."""
    with _session() as db:
        listing = db.get(Listing, _uuid(listing_id))
        if not listing:
            return
        db.add(OutreachAttempt(
            listing_id=listing.id,
            dm_text=dm_text,
            sent_at=sent_at or datetime.utcnow(),
            sent_successfully=True,
        ))
        listing.status = ListingStatus.DM_SENT
        if listing.seller:
            listing.seller.last_dm_sent_at = sent_at or datetime.utcnow()
            listing.seller.dm_count = (listing.seller.dm_count or 0) + 1


async def get_listings_awaiting_reply() -> list[Listing]:
    """DM'd listings whose seller has a thread URL we can poll for replies."""
    with _session() as db:
        rows = db.scalars(
            select(Listing)
            .options(joinedload(Listing.seller))
            .where(Listing.status == ListingStatus.DM_SENT)
        ).all()
        rows = [r for r in rows if r.seller and r.seller.dm_thread_url]
        for r in rows:
            _ = r.seller
        return rows


async def record_seller_response(
    listing_id: str,
    response_text: str,
    response_type: SellerResponseType,
    classification_data: dict | None = None,
) -> None:
    """Attach a seller reply to the latest outreach attempt and route status."""
    with _session() as db:
        listing = db.get(Listing, _uuid(listing_id))
        if not listing:
            return
        attempt = db.scalars(
            select(OutreachAttempt)
            .where(OutreachAttempt.listing_id == listing.id)
            .order_by(OutreachAttempt.sent_at.desc().nullslast())
        ).first()
        if attempt:
            attempt.response_text = response_text
            attempt.response_at = datetime.utcnow()
            attempt.response_classification = response_type
        if listing.seller:
            listing.seller.response_type = response_type
            listing.seller.last_response_at = datetime.utcnow()
        if response_type == SellerResponseType.INTERESTED:
            listing.status = ListingStatus.SELLER_INTERESTED
        elif response_type == SellerResponseType.NOT_INTERESTED:
            listing.status = ListingStatus.REJECTED


async def expire_old_listings(older_than_days: int = 90) -> int:
    """Mark stale, non-closed listings EXPIRED. Returns count expired."""
    cutoff = datetime.utcnow() - timedelta(days=older_than_days)
    with _session() as db:
        rows = db.scalars(
            select(Listing).where(
                Listing.discovered_at < cutoff,
                Listing.status.notin_([ListingStatus.DEAL_CLOSED, ListingStatus.EXPIRED]),
            )
        ).all()
        for r in rows:
            r.status = ListingStatus.EXPIRED
        return len(rows)


# ══════════════════════════════════════════════════════════════════════════════
# API-FACING  (take an injected Session, return JSON-able dicts)
# ══════════════════════════════════════════════════════════════════════════════
def query_listings(db: Session, status: str | None = None, min_score: float | None = None,
                   limit: int = 50, offset: int = 0) -> dict:
    q = select(Listing)
    cq = select(func.count()).select_from(Listing)
    if status:
        try:
            st = ListingStatus(status)
            q = q.where(Listing.status == st)
            cq = cq.where(Listing.status == st)
        except ValueError:
            pass
    if min_score is not None:
        q = q.where(Listing.deal_score >= min_score)
        cq = cq.where(Listing.deal_score >= min_score)
    total = db.scalar(cq) or 0
    rows = db.scalars(
        q.order_by(Listing.deal_score.desc().nullslast()).offset(offset).limit(limit)
    ).all()
    return {"listings": [listing_to_dict(r) for r in rows], "total": total,
            "limit": limit, "offset": offset}


def get_listing_detail(db: Session, listing_id: str) -> Optional[dict]:
    l = db.get(Listing, _uuid(listing_id))
    return listing_to_dict(l) if l else None


def skip_listing(db: Session, listing_id: str) -> Optional[dict]:
    l = db.get(Listing, _uuid(listing_id))
    if not l:
        return None
    l.status = ListingStatus.REJECTED
    db.commit()
    return listing_to_dict(l)


def query_deals(db: Session, status: str | None = None, limit: int = 20) -> dict:
    q = select(Deal)
    cq = select(func.count()).select_from(Deal)
    if status == "closed":
        q = q.where(Deal.deal_closed_at.isnot(None))
        cq = cq.where(Deal.deal_closed_at.isnot(None))
    elif status in ("open", "active", "in_progress"):
        q = q.where(Deal.deal_closed_at.is_(None))
        cq = cq.where(Deal.deal_closed_at.is_(None))
    total = db.scalar(cq) or 0
    rows = db.scalars(q.order_by(Deal.created_at.desc()).limit(limit)).all()
    return {"deals": [deal_to_dict(r) for r in rows], "total": total}


def get_deal_detail(db: Session, deal_id: str) -> Optional[dict]:
    d = db.get(Deal, _uuid(deal_id))
    return deal_to_dict(d) if d else None


def create_deal(db: Session, listing_id: str) -> Optional[dict]:
    """Create the Deal record once a seller commits (agreement signed).

    This is the bridge between an interested seller and revenue tracking: without
    it there is no deal for close_deal() to settle. One deal per listing
    (listing_id is unique), so the call is idempotent — an existing deal is
    returned rather than duplicated.
    """
    listing = db.get(Listing, _uuid(listing_id))
    if not listing:
        return None
    existing = db.scalars(select(Deal).where(Deal.listing_id == listing.id)).first()
    if existing:
        return deal_to_dict(existing)
    deal = Deal(
        listing_id=listing.id,
        seller_asking_price=float(listing.price or 0),
        deal_agreed_at=datetime.utcnow(),
    )
    db.add(deal)
    listing.status = ListingStatus.AGREEMENT_SIGNED
    db.commit()
    db.refresh(deal)
    return deal_to_dict(deal)


def close_deal(db: Session, deal_id: str, buyer_price: float) -> Optional[dict]:
    d = db.get(Deal, _uuid(deal_id))
    if not d:
        return None
    was_closed = d.deal_closed_at is not None
    d.buyer_offer_price = buyer_price
    d.our_fee = (buyer_price or 0) - (d.seller_asking_price or 0)
    d.deal_closed_at = datetime.utcnow()
    d.total_revenue = (d.our_fee or 0) + (d.photo_package_fee or 0)
    if d.listing:
        d.listing.status = ListingStatus.DEAL_CLOSED
    # Keep the SystemState aggregate counters in sync (first close only, so a
    # re-close / price correction never double-counts).
    if not was_closed:
        st = db.get(SystemState, 1)
        if st is not None:
            st.total_deals_closed = (st.total_deals_closed or 0) + 1
            st.total_revenue = (st.total_revenue or 0.0) + (d.total_revenue or 0.0)
    db.commit()
    return deal_to_dict(d)


# ══════════════════════════════════════════════════════════════════════════════
# PLATFORM POSTINGS  (cross-posting = where the arbitrage spread is captured)
# ══════════════════════════════════════════════════════════════════════════════
async def get_pending_platform_listings(limit: int = 20) -> list[PlatformListing]:
    """PENDING cross-post rows with their source Listing eager-loaded."""
    with _session() as db:
        rows = db.scalars(
            select(PlatformListing)
            .options(joinedload(PlatformListing.listing))
            .where(PlatformListing.status == PlatformStatus.PENDING)
            .limit(limit)
        ).all()
        for r in rows:
            _ = r.listing  # force-load while session open
        return rows


async def mark_platform_listing_result(platform_listing_id: str, result: dict) -> None:
    """Record a cross-post attempt outcome (success -> ACTIVE, else ERROR)."""
    with _session() as db:
        pl = db.get(PlatformListing, _uuid(platform_listing_id))
        if not pl:
            return
        if result.get("success"):
            pl.status = PlatformStatus.ACTIVE
            pl.platform_listing_id = result.get("listing_id")
            pl.platform_url = result.get("listing_url")
            pl.posted_at = datetime.utcnow()
            pl.error_message = None
        else:
            pl.status = PlatformStatus.ERROR
            pl.error_message = (result.get("error") or "unknown error")[:1000]
