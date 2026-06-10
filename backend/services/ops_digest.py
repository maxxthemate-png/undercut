"""Daily founder ops digest — one email with the numbers that matter.

Includes a staleness alarm: if the newest reprice run is >1h old the subject is
prefixed [STALE REPRICE CRON] — catches GitHub silently disabling schedules
(it does so after 60 days of repo inactivity).
"""
from datetime import datetime, timedelta

from sqlalchemy import select, func

from ..models.database import SessionLocal
from ..models.repricer_models import User, Lead, RepricerListing, PriceChange, RepriceRun
from ..services import billing
from ..utils.notifications import send_email_alert
from ..utils.logging import get_logger

logger = get_logger(__name__)

PLAN_PRICE = {pid: p["price"] for pid, p in billing.PLANS.items()}


def run_ops_digest() -> dict:
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        d1 = now - timedelta(days=1)

        by_plan = {(p or "free"): int(n) for p, n in
                   db.execute(select(User.plan, func.count()).group_by(User.plan)).all()}
        mrr = sum(by_plan.get(pid, 0) * price for pid, price in PLAN_PRICE.items())
        signups_24h = db.scalar(select(func.count()).select_from(User).where(User.created_at >= d1)) or 0
        trials_ending = db.scalar(select(func.count()).select_from(User).where(
            User.plan == billing.TRIAL_PLAN, User.trial_ends_at.isnot(None),
            User.trial_ends_at > now, User.trial_ends_at <= now + timedelta(days=3))) or 0
        past_due = db.scalar(select(func.count()).select_from(User).where(
            User.payment_status == "past_due")) or 0

        leads_24h = db.execute(
            select(Lead.source, func.count()).where(Lead.created_at >= d1).group_by(Lead.source)).all()
        reprices_24h = db.scalar(select(func.count()).select_from(PriceChange).where(
            PriceChange.created_at >= d1)) or 0
        enabled = db.scalar(select(func.count()).select_from(RepricerListing).where(
            RepricerListing.repricing_enabled.is_(True))) or 0
        failing = db.scalar(select(func.count()).select_from(RepricerListing).where(
            RepricerListing.consecutive_failures >= 3)) or 0

        runs_24h = db.scalars(select(RepriceRun).where(RepriceRun.ran_at >= d1)).all()
        run_errors = sum(r.errors or 0 for r in runs_24h)
        last_run = db.scalars(select(RepriceRun).order_by(RepriceRun.ran_at.desc()).limit(1)).first()
        stale = not last_run or not last_run.ran_at or (now - last_run.ran_at) > timedelta(hours=1)

        lead_lines = "\n".join(f"  - {src or 'unknown'}: {n}" for src, n in leads_24h) or "  (none)"
        body = (
            f"MRR: ${mrr}  ·  plans: {by_plan}\n"
            f"Signups 24h: {signups_24h}  ·  trials ending <=3d: {trials_ending}  ·  past_due: {past_due}\n"
            f"Leads 24h:\n{lead_lines}\n"
            f"Reprices 24h: {reprices_24h}  ·  enabled listings: {enabled}  ·  failing (3+ errors): {failing}\n"
            f"Cron runs 24h: {len(runs_24h)} (errors: {run_errors})  ·  last run: "
            f"{last_run.ran_at.isoformat() if last_run and last_run.ran_at else 'NEVER'}\n"
        )
        subject = ("[STALE REPRICE CRON] " if stale else "") + f"Daily digest — ${mrr} MRR, {signups_24h} signups"
        ok = send_email_alert(subject, body)
        return {"sent": bool(ok), "stale_cron": stale, "mrr": mrr, "signups_24h": int(signups_24h)}
    finally:
        db.close()
