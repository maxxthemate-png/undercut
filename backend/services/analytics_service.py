"""Aggregate stats for the dashboard API and the daily operator report."""
from datetime import datetime

from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..utils.logging import get_logger
from ..models.models import (
    Listing, OutreachAttempt, Deal, PlatformListing,
    ListingStatus, PlatformStatus,
)
from .listing_service import _session

logger = get_logger(__name__)


def _today_start() -> datetime:
    now = datetime.utcnow()
    return now.replace(hour=0, minute=0, second=0, microsecond=0)


# ─── Worker-facing (self-managing session) ────────────────────────────────────
async def get_daily_stats() -> dict:
    """Numbers for the 8am operator SMS/email report."""
    start = _today_start()
    with _session() as db:
        return {
            "new_listings": db.scalar(
                select(func.count()).select_from(Listing).where(Listing.discovered_at >= start)) or 0,
            "dms_sent": db.scalar(
                select(func.count()).select_from(OutreachAttempt).where(OutreachAttempt.sent_at >= start)) or 0,
            "replies": db.scalar(
                select(func.count()).select_from(OutreachAttempt).where(OutreachAttempt.response_at >= start)) or 0,
            "interested": db.scalar(
                select(func.count()).select_from(Listing).where(Listing.status == ListingStatus.SELLER_INTERESTED)) or 0,
            "active_platform_listings": db.scalar(
                select(func.count()).select_from(PlatformListing)
                .where(PlatformListing.status.in_([PlatformStatus.POSTED, PlatformStatus.ACTIVE]))) or 0,
            "total_deals": db.scalar(
                select(func.count()).select_from(Deal).where(Deal.deal_closed_at.isnot(None))) or 0,
            "total_revenue": float(db.scalar(
                select(func.coalesce(func.sum(Deal.total_revenue), 0.0))) or 0.0),
        }


# ─── API-facing (injected Session) ────────────────────────────────────────────
def get_summary(db: Session) -> dict:
    """Top-line dashboard summary card."""
    dms_total = db.scalar(select(func.count()).select_from(OutreachAttempt)) or 0
    responded = db.scalar(
        select(func.count()).select_from(OutreachAttempt).where(OutreachAttempt.response_at.isnot(None))) or 0
    deals_closed = db.scalar(
        select(func.count()).select_from(Deal).where(Deal.deal_closed_at.isnot(None))) or 0
    total_revenue = float(db.scalar(select(func.coalesce(func.sum(Deal.total_revenue), 0.0))) or 0.0)
    pipeline = float(db.scalar(
        select(func.coalesce(func.sum(Listing.estimated_upside), 0.0))
        .where(Listing.status.notin_([ListingStatus.DEAL_CLOSED, ListingStatus.REJECTED, ListingStatus.EXPIRED]))) or 0.0)
    return {
        "total_listings_discovered": db.scalar(select(func.count()).select_from(Listing)) or 0,
        "dms_sent_total": dms_total,
        "dms_sent_today": db.scalar(
            select(func.count()).select_from(OutreachAttempt).where(OutreachAttempt.sent_at >= _today_start())) or 0,
        "seller_response_rate": round(responded / dms_total, 4) if dms_total else 0.0,
        "active_deals": db.scalar(
            select(func.count()).select_from(Deal).where(Deal.deal_closed_at.is_(None))) or 0,
        "deals_closed": deals_closed,
        "total_revenue": total_revenue,
        "avg_deal_size": round(total_revenue / deals_closed, 2) if deals_closed else 0.0,
        "pipeline_value": pipeline,
    }


def get_revenue_by_month(db: Session) -> dict:
    """Closed-deal revenue grouped by YYYY-MM (Postgres to_char)."""
    month = func.to_char(Deal.deal_closed_at, "YYYY-MM")
    rows = db.execute(
        select(month.label("m"),
               func.coalesce(func.sum(Deal.total_revenue), 0.0),
               func.count())
        .where(Deal.deal_closed_at.isnot(None))
        .group_by(month)
        .order_by(month)
    ).all()
    return {"months": [{"month": m, "revenue": float(rev), "deals": cnt} for m, rev, cnt in rows]}
