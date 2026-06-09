"""Founder metrics dashboard — internal aggregate business stats (read-only).

Protected by the UNDERCUT_API_KEY via the `X-Admin-Key` header (same secret the
scheduled cron uses). No PII beyond masked emails is returned.
"""
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User, Store, RepricerListing, PriceChange, Lead
from ..services import billing
from ..utils.settings import settings

router = APIRouter(prefix="/api/admin", tags=["admin"])
public_router = APIRouter(prefix="/api/admin", tags=["admin-public"])

# starter/pro/scale -> monthly price (for MRR); trial/free contribute 0
PLAN_PRICE = {pid: p["price"] for pid, p in billing.PLANS.items()}


def _require_admin(x_admin_key: str | None):
    if not settings.UNDERCUT_API_KEY or x_admin_key != settings.UNDERCUT_API_KEY:
        raise HTTPException(status_code=403, detail="invalid admin key")


def _mask(email: str | None) -> str:
    if not email or "@" not in email:
        return email or ""
    user, domain = email.split("@", 1)
    return (user[:2] + "***") + "@" + domain


@router.get("/metrics")
def metrics(x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    _require_admin(x_admin_key)
    now = datetime.utcnow()
    d7 = now - timedelta(days=7)

    # Users by plan + active trials
    plan_rows = db.execute(select(User.plan, func.count()).group_by(User.plan)).all()
    by_plan = {(plan or "free"): int(n) for plan, n in plan_rows}
    users_total = sum(by_plan.values())
    active_trials = db.scalar(
        select(func.count()).select_from(User)
        .where(User.plan == billing.TRIAL_PLAN, User.trial_ends_at > now)) or 0

    # MRR = paid-plan headcount × price
    mrr = sum(by_plan.get(pid, 0) * price for pid, price in PLAN_PRICE.items())

    # Leads
    leads_total = db.scalar(select(func.count()).select_from(Lead)) or 0
    leads_7d = db.scalar(select(func.count()).select_from(Lead).where(Lead.created_at >= d7)) or 0
    src_rows = db.execute(select(Lead.source, func.count()).group_by(Lead.source)).all()
    leads_by_source = {(s or "unknown"): int(n) for s, n in src_rows}

    # Stores + listings
    stores_total = db.scalar(select(func.count()).select_from(Store)) or 0
    listings_total = db.scalar(select(func.count()).select_from(RepricerListing)) or 0
    listings_active = db.scalar(
        select(func.count()).select_from(RepricerListing)
        .where(RepricerListing.repricing_enabled.is_(True))) or 0

    # Reprices (price changes)
    reprices_total = db.scalar(select(func.count()).select_from(PriceChange)) or 0
    reprices_7d = db.scalar(select(func.count()).select_from(PriceChange).where(PriceChange.created_at >= d7)) or 0

    # 14-day daily reprice series (for the chart)
    series = []
    for i in range(13, -1, -1):
        start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        end = start + timedelta(days=1)
        c = db.scalar(select(func.count()).select_from(PriceChange)
                      .where(PriceChange.created_at >= start, PriceChange.created_at < end)) or 0
        series.append({"date": start.strftime("%m/%d"), "reprices": int(c)})

    recent_leads = db.scalars(select(Lead).order_by(Lead.created_at.desc()).limit(8)).all()
    recent_signups = db.scalars(select(User).order_by(User.created_at.desc()).limit(8)).all()

    return {
        "generated_at": now.isoformat() + "Z",
        "mrr": mrr,
        "users": {"total": users_total, "by_plan": by_plan, "active_trials": int(active_trials)},
        "leads": {"total": int(leads_total), "last_7d": int(leads_7d), "by_source": leads_by_source},
        "stores": int(stores_total),
        "listings": {"total": int(listings_total), "repricing_enabled": int(listings_active)},
        "reprices": {"total": int(reprices_total), "last_7d": int(reprices_7d), "series": series},
        "recent_leads": [{"email": _mask(l.email), "source": l.source,
                          "at": l.created_at.isoformat() if l.created_at else None} for l in recent_leads],
        "recent_signups": [{"email": _mask(u.email), "plan": u.plan,
                            "at": u.created_at.isoformat() if u.created_at else None} for u in recent_signups],
    }


@public_router.get("/public-stats")
def public_stats(db: Session = Depends(get_db)):
    """Public, non-sensitive vanity stats for social proof (no PII, no revenue, no auth).
    Safe to surface on the marketing site, e.g. 'N prices optimized and counting'."""
    reprices = db.scalar(select(func.count()).select_from(PriceChange)) or 0
    sellers = db.scalar(select(func.count()).select_from(Store)) or 0
    listings = db.scalar(select(func.count()).select_from(RepricerListing)) or 0
    return {"reprices": int(reprices), "sellers": int(sellers), "listings_managed": int(listings)}
