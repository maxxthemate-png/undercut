"""Stripe billing — subscription plans for Undercut.

Plans map to a Stripe price (set via env) and a listing limit. The webhook
keeps each User's plan + listing_limit in sync with their Stripe subscription.
"""
import json

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
    try:
        stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
    except Exception as e:
        logger.error("sig verify FAILED", err=str(e)[:160],
                     secret=(settings.STRIPE_WEBHOOK_SECRET or "")[:14],
                     siglen=len(sig_header or ""), plen=len(payload or b""))
        raise
    return json.loads(payload)
