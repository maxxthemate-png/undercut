"""Autonomous lifecycle emails — lead drip + trial reminders.
Run via the key-protected POST /api/cron/lifecycle-emails endpoint (daily GitHub Action).
Idempotent: tracks Lead.nurture_stage + User.last_lifecycle_stage so a re-run won't double-send.
"""
from datetime import datetime, timedelta

from sqlalchemy import select

from ..models.database import SessionLocal
from ..models.repricer_models import User, Lead, Store, RepricerListing, PriceChange
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
    sent = {"lead_drip": 0, "trial_ending": 0, "trial_expired": 0,
            "first_reprice": 0, "weekly_digest": 0, "winback": 0}
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
            # Demo-share leads get a personalized first touch (their own checked result),
            # then slot into the normal day3/day7 drip.
            if lead.source == "demo_share" and (lead.nurture_stage or 0) == 0:
                stage = 1
                subject, html = T.demo_followup(getattr(lead, "note", None))
            else:
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

        # --- Trial expired (ended in the last week, not yet notified) ---
        # Match plan "free" too: logging in normalizes an expired trial -> free
        # BEFORE this cron runs, which previously made returning users skip this
        # email entirely. The 7-day window stops ancient accounts from matching.
        for u in db.scalars(select(User).where(
                User.plan.in_((billing.TRIAL_PLAN, "free")), User.trial_ends_at.isnot(None),
                User.trial_ends_at <= now, User.trial_ends_at > now - timedelta(days=7),
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

        def _user_changes_q(u, since=None):
            q = (select(PriceChange)
                 .join(RepricerListing, PriceChange.listing_id == RepricerListing.id)
                 .join(Store, RepricerListing.store_id == Store.id)
                 .where(Store.user_id == u.id))
            if since is not None:
                q = q.where(PriceChange.created_at >= since)
            return q

        # --- First reprice celebration (one-shot per user) ---
        for u in db.scalars(select(User).where(
                User.first_reprice_emailed_at.is_(None),
                User.email_unsubscribed.is_(False))).all():
            first = db.scalars(_user_changes_q(u).order_by(PriceChange.created_at).limit(1)).first()
            if not first:
                continue
            subject, html = T.first_reprice_email(first.old_price or 0, first.new_price or 0,
                                                  first.competitor_low)
            try:
                if send_customer_email(u.email, subject, html):
                    u.first_reprice_emailed_at = now
                    sent["first_reprice"] += 1
            except Exception as e:
                errors.append(f"first_reprice {u.email}: {e}")
        db.commit()

        # --- Weekly digest (users with activity in the last 7 days) ---
        week_ago = now - timedelta(days=7)
        for u in db.scalars(select(User).where(
                User.email_unsubscribed.is_(False),
                User.created_at <= week_ago)).all():
            if u.last_weekly_digest_at and (now - u.last_weekly_digest_at) < timedelta(days=7):
                continue
            changes = db.scalars(_user_changes_q(u, since=week_ago)).all()
            if not changes:
                continue
            listing_ids = {c.listing_id for c in changes}
            margin = sum((c.margin_protected or 0.0) for c in changes)
            subject, html = T.weekly_digest_email(len(changes), len(listing_ids), margin_protected=margin)
            try:
                if send_customer_email(u.email, subject, html):
                    u.last_weekly_digest_at = now
                    sent["weekly_digest"] += 1
            except Exception as e:
                errors.append(f"digest {u.email}: {e}")
        db.commit()

        # --- Dunning reminders (past_due users; webhook sent day-0 already) ---
        from ..utils.settings import settings as _settings
        for u in db.scalars(select(User).where(
                User.payment_status == "past_due",
                User.payment_failed_at.isnot(None),
                User.email_unsubscribed.is_(False))).all():
            age_days = (now - u.payment_failed_at).total_seconds() / 86400.0
            if age_days >= _settings.DUNNING_GRACE_DAYS and u.last_lifecycle_stage != "dunning_reduced":
                subject, html = T.access_reduced_email()
                stage = "dunning_reduced"
            elif age_days >= 3 and u.last_lifecycle_stage not in ("dunning_retry", "dunning_reduced"):
                subject, html = T.payment_retry_email()
                stage = "dunning_retry"
            else:
                continue
            try:
                if send_customer_email(u.email, subject, html):
                    u.last_lifecycle_stage = stage
                    u.last_lifecycle_email = now
                    sent["dunning"] = sent.get("dunning", 0) + 1
            except Exception as e:
                errors.append(f"dunning {u.email}: {e}")
        db.commit()

        # --- Win-back (30 days after trial expiry/churn, inactive, one-shot) ---
        month_ago = now - timedelta(days=30)
        # Include plan "trial" too: a user who never logged back in is never
        # normalized to "free", so plan=="free" alone could never win them back.
        for u in db.scalars(select(User).where(
                User.plan.in_(("free", billing.TRIAL_PLAN)),
                User.winback_emailed_at.is_(None),
                User.email_unsubscribed.is_(False))).all():
            churned_paid = u.stripe_customer_id is not None and u.stripe_subscription_id is None
            trial_long_over = u.trial_ends_at is not None and u.trial_ends_at <= month_ago
            if not (churned_paid or trial_long_over):
                continue
            if db.scalars(_user_changes_q(u, since=month_ago).limit(1)).first():
                continue  # still active — no win-back needed
            subject, html = T.winback_email()
            try:
                if send_customer_email(u.email, subject, html):
                    u.winback_emailed_at = now
                    sent["winback"] += 1
            except Exception as e:
                errors.append(f"winback {u.email}: {e}")
        db.commit()
    finally:
        db.close()
    logger.info("lifecycle emails run", **sent)
    return {"sent": sent, "errors": errors[:10]}
