"""Stripe billing — subscription plans for Undercut.

Plans map to a Stripe price (set via env) and a listing limit. The webhook
keeps each User's plan + listing_limit in sync with their Stripe subscription.
"""
import json
import math
from datetime import datetime, timedelta

import stripe

from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)
stripe.api_key = settings.STRIPE_SECRET_KEY or ""

FREE_LIMIT = 25

# plan id -> display/price/limit + the settings attr that holds its Stripe price id
PLANS = {
    "starter": {"name": "Starter", "price": 29,  "listing_limit": 100,   "price_env": "STRIPE_PRICE_STARTER", "annual_price_env": "STRIPE_PRICE_STARTER_ANNUAL"},
    "pro":     {"name": "Pro",     "price": 79,  "listing_limit": 1000,  "price_env": "STRIPE_PRICE_PRO", "annual_price_env": "STRIPE_PRICE_PRO_ANNUAL"},
    "scale":   {"name": "Scale",   "price": 199, "listing_limit": 10000, "price_env": "STRIPE_PRICE_SCALE", "annual_price_env": "STRIPE_PRICE_SCALE_ANNUAL"},
}


def public_plans() -> list[dict]:
    out = [{"id": "free", "name": "Free", "price": 0, "listing_limit": FREE_LIMIT}]
    for pid, p in PLANS.items():
        out.append({"id": pid, "name": p["name"], "price": p["price"], "listing_limit": p["listing_limit"]})
    return out


def limit_for_plan(plan: str) -> int:
    return PLANS.get(plan, {}).get("listing_limit", FREE_LIMIT)


# ---- Founding trial: new signups get Starter-level access free for TRIAL_DAYS, no card ----
TRIAL_PLAN = "trial"
TRIAL_DAYS = 14
TRIAL_LIMIT = PLANS["starter"]["listing_limit"]   # 100 — trial grants Starter-level access


def start_trial(user) -> None:
    """Put a brand-new user on a no-card Founding trial (Starter-level access)."""
    user.plan = TRIAL_PLAN
    user.listing_limit = TRIAL_LIMIT
    user.trial_ends_at = datetime.utcnow() + timedelta(days=TRIAL_DAYS)


def is_trialing(user) -> bool:
    return (getattr(user, "plan", None) == TRIAL_PLAN
            and getattr(user, "trial_ends_at", None) is not None
            and user.trial_ends_at > datetime.utcnow())


def trial_days_left(user) -> int:
    if not getattr(user, "trial_ends_at", None):
        return 0
    secs = (user.trial_ends_at - datetime.utcnow()).total_seconds()
    return max(0, math.ceil(secs / 86400)) if secs > 0 else 0


def normalize_access(user) -> bool:
    """Lazily expire a finished trial down to the free tier. Returns True if the user
    changed (so the caller should commit). Paid plans are never altered here."""
    if getattr(user, "plan", None) == TRIAL_PLAN and not is_trialing(user):
        user.plan = "free"
        user.listing_limit = FREE_LIMIT
        return True
    return False


# Minimum minutes between SCHEDULED reprice runs per plan (manual runs are never
# throttled). Designed for the 15-min cron: scale/pro run every cycle; starter/
# free/trial hourly — matching the marketing promises. Cadence-agnostic: if the
# cron later moves to */5, scale=5-min and pro=15-min automatically.
PLAN_REPRICE_INTERVAL_MIN = {"scale": 0, "pro": 12, "starter": 55, "free": 55, TRIAL_PLAN: 55}


# Plans that include the Claude AI aggressiveness optimizer. This is SOLD as a
# Pro-and-above feature (pricing page, PricingTable, llms.txt) but was never
# enforced in the engine, so Free/Starter/trial silently got it too — the paid
# tier's headline differentiator given away, and an advertising claim the code
# contradicted. Trial grants Starter-level access, so it does NOT include AI.
AI_PLANS = ("pro", "scale")


def plan_has_ai(plan: str) -> bool:
    return plan in AI_PLANS


def freq_should_skip(plan: str, last_run_at, now) -> bool:
    """Pure decision: should a SCHEDULED reprice run skip this store on plan grounds?

    Skips when the plan has a minimum interval (>0) and the store was repriced
    more recently than that interval. scale (interval 0) never skips. A store
    that has never run (last_run_at is None) never skips. Pure + side-effect free
    so it is unit-testable; reprice_all gates it behind REPRICER_TIER_FREQUENCY.
    """
    interval = PLAN_REPRICE_INTERVAL_MIN.get(plan, 55)
    if not interval or not last_run_at:
        return False
    return (now - last_run_at) < timedelta(minutes=interval)


def plan_budget_take(remaining: int, group_len: int) -> tuple[int, int]:
    """Pure decision: of `group_len` listings, how many to (take, skip) given the
    user's `remaining` per-run listing budget. take is capped at the budget;
    everything beyond it is skipped. The caller subtracts take from remaining.
    Behind REPRICER_ENFORCE_PLAN_LIMITS. Pure so it is unit-testable.
    """
    if remaining <= 0:
        return 0, group_len
    if group_len > remaining:
        return remaining, group_len - remaining
    return group_len, 0


def effective_access(user) -> tuple[str, int]:
    """(effective_plan, effective_listing_limit) for ENFORCEMENT — read-only.
    - expired trial                  -> free limits
    - past_due beyond the grace days -> free limits (plan column untouched)
    - otherwise                      -> the user's stored plan/limit"""
    plan = getattr(user, "plan", None) or "free"
    if plan == TRIAL_PLAN and not is_trialing(user):
        return "free", FREE_LIMIT
    if getattr(user, "payment_status", "ok") == "past_due":
        failed_at = getattr(user, "payment_failed_at", None)
        if failed_at and datetime.utcnow() - failed_at > timedelta(days=settings.DUNNING_GRACE_DAYS):
            return "free", FREE_LIMIT
    return plan, (getattr(user, "listing_limit", None) or FREE_LIMIT)


def access_summary(user) -> dict:
    """Account access snapshot for the frontend (plan + trial countdown)."""
    trialing = is_trialing(user)
    return {
        "plan": user.plan,
        "listing_limit": user.listing_limit,
        "is_trialing": trialing,
        "trial_ends_at": user.trial_ends_at.isoformat() if getattr(user, "trial_ends_at", None) else None,
        "trial_days_left": trial_days_left(user) if trialing else 0,
    }


def _price_id(plan: str, interval: str = "month") -> str | None:
    p = PLANS.get(plan)
    if not p:
        return None
    env = p["annual_price_env"] if interval == "year" else p["price_env"]
    return getattr(settings, env, None)


def plan_from_price(price_id: str | None) -> str | None:
    if not price_id:
        return None
    for pid, p in PLANS.items():
        if (getattr(settings, p["price_env"], None) == price_id
                or getattr(settings, p["annual_price_env"], None) == price_id):
            return pid
    return None


def create_checkout_session(user, plan: str, success_url: str, cancel_url: str, interval: str = "month"):
    """Returns (checkout_url, customer_id). Creates a Stripe customer if needed.
    interval='month' (default, unchanged behavior) or 'year' for annual plans."""
    price = _price_id(plan, interval)
    if not price:
        raise ValueError(f"no Stripe price configured for plan '{plan}' ({interval})")
    customer = user.stripe_customer_id
    if not customer:
        customer = stripe.Customer.create(email=user.email, metadata={"user_id": str(user.id)}).id
    session = stripe.checkout.Session.create(
        mode="subscription", customer=customer,
        line_items=[{"price": price, "quantity": 1}],
        success_url=success_url, cancel_url=cancel_url,
        metadata={"user_id": str(user.id), "plan": plan, "interval": interval},
    )
    return session.url, customer


def create_portal_session(customer_id: str, return_url: str) -> str:
    return stripe.billing_portal.Session.create(customer=customer_id, return_url=return_url).url


def construct_event(payload: bytes, sig_header: str):
    # Verify the Stripe signature for authenticity, but return a plain dict:
    # some stripe-python versions return objects without dict-style .get(), which
    # the webhook handler relies on. json.loads on the already-verified payload is safe.
    stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
    return json.loads(payload)
