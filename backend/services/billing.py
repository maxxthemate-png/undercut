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
    "starter": {"name": "Starter", "price": 29,  "listing_limit": 100,   "price_env": "STRIPE_PRICE_STARTER"},
    "pro":     {"name": "Pro",     "price": 79,  "listing_limit": 1000,  "price_env": "STRIPE_PRICE_PRO"},
    "scale":   {"name": "Scale",   "price": 199, "listing_limit": 10000, "price_env": "STRIPE_PRICE_SCALE"},
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


def _price_id(plan: str) -> str | None:
    p = PLANS.get(plan)
    return getattr(settings, p["price_env"], None) if p else None


def plan_from_price(price_id: str | None) -> str | None:
    for pid, p in PLANS.items():
        if price_id and getattr(settings, p["price_env"], None) == price_id:
            return pid
    return None


def create_checkout_session(user, plan: str, success_url: str, cancel_url: str):
    """Returns (checkout_url, customer_id). Creates a Stripe customer if needed."""
    price = _price_id(plan)
    if not price:
        raise ValueError(f"no Stripe price configured for plan '{plan}'")
    customer = user.stripe_customer_id
    if not customer:
        customer = stripe.Customer.create(email=user.email, metadata={"user_id": str(user.id)}).id
    session = stripe.checkout.Session.create(
        mode="subscription", customer=customer,
        line_items=[{"price": price, "quantity": 1}],
        success_url=success_url, cancel_url=cancel_url,
        metadata={"user_id": str(user.id), "plan": plan},
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
