"""Autonomous lifecycle emails — lead drip + trial reminders.
Run via the key-protected POST /api/cron/lifecycle-emails endpoint (daily GitHub Action).
Idempotent: tracks Lead.nurture_stage + User.last_lifecycle_stage so a re-run won't double-send.
"""
from datetime import datetime, timedelta

from sqlalchemy import select

from ..models.database import SessionLocal
from ..models.repricer_models import User, Lead
from ..services import billing
from ..utils.notifications import send_customer_email
from ..utils import email_templates as T
from ..utils.logging import get_logger

logger = get_logger(__name__)

# (stage, min age in days before sending, template fn)
DRIP_STEPS = [
    (1, 1, T.lead_drip_day1),
    (2, 3, T.lead_drip_day3),
    (3, 7, T.lead_drip_day7),
]


def run_lifecycle_emails() -> dict:
    db = SessionLocal()
    sent = {"lead_drip": 0, "trial_ending": 0, "trial_expired": 0}
    errors: list[str] = []
    now = datetime.utcnow()
    try:
        user_emails = set(db.scalars(select(User.email)).all())

        # --- Lead drip (to leads who haven't signed up) ---
        leads = db.scalars(select(Lead).where(
            Lead.nurture_stage < 3, Lead.email_unsubscribed.is_(False))).all()
        for lead in leads:
            if lead.email in user_emails:
                lead.nurture_stage = 99  # converted — stop drip
                continue
            if lead.last_emailed_at and (now - lead.last_emailed_at) < timedelta(hours=20):
                continue
            age_days = (now - (lead.created_at or now)).total_seconds() / 86400.0
            step = next(((s, fn) for (s, min_age, fn) in DRIP_STEPS
                         if s > (lead.nurture_stage or 0) and age_days >= min_age), None)
            if not step:
                continue
            stage, fn = step
            subject, html = fn()
            try:
                if send_customer_email(lead.email, subject, html):
                    lead.nurture_stage = stage
                    lead.last_emailed_at = now
                    sent["lead_drip"] += 1
            except Exception as e:
                errors.append(f"drip {lead.email}: {e}")
        db.commit()

        # --- Trial ending (<=3 days out, not yet warned) ---
        soon = now + timedelta(days=3)
        for u in db.scalars(select(User).where(
                User.plan == billing.TRIAL_PLAN, User.trial_ends_at.isnot(None),
                User.trial_ends_at > now, User.trial_ends_at <= soon,
                User.email_unsubscribed.is_(False))).all():
            if u.last_lifecycle_stage == "trial_ending":
                continue
            subject, html = T.trial_ending_email(billing.trial_days_left(u))
            try:
                if send_customer_email(u.email, subject, html):
                    u.last_lifecycle_stage = "trial_ending"
                    u.last_lifecycle_email = now
                    sent["trial_ending"] += 1
            except Exception as e:
                errors.append(f"ending {u.email}: {e}")
        db.commit()

        # --- Trial expired (ended, not yet notified) ---
        for u in db.scalars(select(User).where(
                User.plan == billing.TRIAL_PLAN, User.trial_ends_at.isnot(None),
                User.trial_ends_at <= now,
                User.email_unsubscribed.is_(False))).all():
            if u.last_lifecycle_stage == "trial_expired":
                continue
            subject, html = T.trial_expired_email()
            try:
                if send_customer_email(u.email, subject, html):
                    u.last_lifecycle_stage = "trial_expired"
                    u.last_lifecycle_email = now
                    sent["trial_expired"] += 1
            except Exception as e:
                errors.append(f"expired {u.email}: {e}")
        db.commit()
    finally:
        db.close()
    logger.info("lifecycle emails run", **sent)
    return {"sent": sent, "errors": errors[:10]}
