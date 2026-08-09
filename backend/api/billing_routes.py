"""Billing endpoints: plans (public), checkout, portal (auth), webhook (public)."""
import uuid
from datetime import datetime as _dt


def _utcnow():
    return _dt.utcnow()

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User
from ..services.auth import current_user
from ..services import billing, referrals
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/api/billing", tags=["billing"])
public_router = APIRouter(prefix="/api/billing", tags=["billing-public"])


def _app_url() -> str:
    return getattr(settings, "PUBLIC_APP_URL", None) or "https://undercutpricer.com"


def _uuid(v):
    try:
        return uuid.UUID(str(v))
    except (ValueError, TypeError):
        return None


class CheckoutIn(BaseModel):
    plan: str
    interval: str = "month"   # "month" (default) | "year"


@router.post("/checkout-pass")
def checkout_pass(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """One-time Season Pass checkout (no subscription)."""
    app = _app_url()
    try:
        url, customer = billing.create_pass_checkout(
            user, success_url=f"{app}/dashboard?pass=1&session_id={{CHECKOUT_SESSION_ID}}", cancel_url=f"{app}/pricing")
    except Exception as e:
        logger.error("season pass checkout failed", user=str(user.id), error=str(e))
        raise HTTPException(status_code=502, detail="Could not start checkout — please try again.")
    if customer and not user.stripe_customer_id:
        user.stripe_customer_id = customer
        db.commit()
    return {"url": url}


@router.get("/referral")
def referral(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """The user's referral link + live stats for the dashboard card."""
    code = referrals.ensure_code(user, db)
    return {"code": code,
            "link": f"{_app_url()}/signup?ref={code}",
            "credit_per_conversion": referrals.CREDIT_CENTS // 100,
            **referrals.stats(user, db)}


@public_router.get("/plans")
def plans():
    return {"plans": billing.public_plans(),
            "publishable_key": getattr(settings, "STRIPE_PUBLISHABLE_KEY", None)}


@router.post("/checkout")
def checkout(body: CheckoutIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    if not settings.STRIPE_SECRET_KEY:
        raise HTTPException(status_code=503, detail="billing not configured")
    if user.stripe_subscription_id:
        # Already subscribed — a second checkout would double-bill; changes go
        # through the Stripe portal instead.
        raise HTTPException(status_code=400,
                            detail="You already have an active subscription — use Manage billing to change plans.")
    base = _app_url()
    try:
        url, customer = billing.create_checkout_session(
            user, body.plan, f"{base}/dashboard?upgraded=1&session_id={{CHECKOUT_SESSION_ID}}", f"{base}/dashboard",
            interval=("year" if body.interval == "year" else "month"))
    except Exception as e:
        logger.error("checkout session failed", user=str(user.id), error=str(e))
        raise HTTPException(status_code=400, detail="Could not start checkout — please try again or contact support.")
    if customer and not user.stripe_customer_id:
        user.stripe_customer_id = customer
        db.commit()
    return {"url": url}


@router.post("/portal")
def portal(user: User = Depends(current_user)):
    if not user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="no billing account yet")
    return {"url": billing.create_portal_session(user.stripe_customer_id, f"{_app_url()}/dashboard")}


@public_router.post("/webhook")
async def webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    try:
        event = billing.construct_event(payload, sig)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"invalid signature: {e}")

    etype = event["type"]
    obj = event["data"]["object"]
    user = plan = customer = sub_id = None

    if etype == "checkout.session.completed":
        meta = obj.get("metadata") or {}
        user = db.get(User, _uuid(meta.get("user_id"))) if meta.get("user_id") else None
        # Season Pass is a one-time payment, not a subscription: grant it here and
        # return, so the subscription-plan sync below never runs for it.
        if meta.get("kind") == "season_pass":
            if user and obj.get("payment_status") == "paid":
                billing.grant_pass(user)
                if obj.get("customer"):
                    user.stripe_customer_id = obj["customer"]
                db.commit()
                logger.info("season pass granted", user=str(user.id),
                            until=str(user.pass_expires_at))
                try:
                    referrals.grant_conversion_credit(user, db)
                except Exception as e:
                    logger.error("referral credit hook failed (pass)",
                                 user=str(user.id), error=str(e))
            return {"received": True}
        plan = meta.get("plan")
        customer, sub_id = obj.get("customer"), obj.get("subscription")
    elif etype in ("customer.subscription.created", "customer.subscription.updated"):
        customer, sub_id = obj.get("customer"), obj.get("id")
        user = db.scalar(select(User).where(User.stripe_customer_id == customer))
        items = (obj.get("items") or {}).get("data") or []
        price_id = ((items[0] or {}).get("price") or {}).get("id") if items else None
        status = obj.get("status")
        # Grant/sync the paid plan ONLY for statuses that mean access: Stripe does
        # not guarantee event ordering, so a retried 'updated' arriving after
        # 'deleted' must not re-grant a canceled subscriber.
        plan = billing.plan_from_price(price_id) if status in ("active", "trialing", "past_due") else None
        if user:  # keep dunning state in sync with the subscription status
            if status in ("past_due", "unpaid") and user.payment_status != "past_due":
                user.payment_status = "past_due"
                user.payment_failed_at = user.payment_failed_at or _utcnow()
                db.commit()
            elif status == "active" and user.payment_status != "ok":
                user.payment_status = "ok"; user.payment_failed_at = None
                db.commit()
    elif etype == "customer.subscription.deleted":
        user = db.scalar(select(User).where(User.stripe_customer_id == obj.get("customer")))
        if user:
            user.plan = "free"; user.listing_limit = billing.FREE_LIMIT
            user.stripe_subscription_id = None
            user.payment_status = "ok"; user.payment_failed_at = None  # nothing to dun on free
            db.commit()
        return {"received": True}
    elif etype == "invoice.payment_failed":
        user = db.scalar(select(User).where(User.stripe_customer_id == obj.get("customer")))
        if user and user.plan in billing.PLANS:   # only dun paid plans
            first_failure = user.payment_status != "past_due"
            user.payment_status = "past_due"
            if first_failure:
                user.payment_failed_at = _utcnow()
            db.commit()
            if first_failure:
                try:  # best-effort — never 500 the webhook (Stripe would retry forever)
                    from ..utils.email_templates import payment_failed_email
                    from ..utils.notifications import send_customer_email, send_email_alert
                    subject, html = payment_failed_email()
                    if not user.email_unsubscribed:
                        send_customer_email(user.email, subject, html)
                    send_email_alert("Payment failed",
                                     f"{user.email} (plan={user.plan}) — dunning started.")
                except Exception:
                    pass
            logger.info("dunning started", user=str(user.id))
        return {"received": True}
    elif etype in ("invoice.paid", "invoice.payment_succeeded"):
        user = db.scalar(select(User).where(User.stripe_customer_id == obj.get("customer")))
        if user and user.payment_status != "ok":
            user.payment_status = "ok"; user.payment_failed_at = None
            if user.last_lifecycle_stage in ("dunning_retry", "dunning_reduced"):
                user.last_lifecycle_stage = None   # allow a future failure to re-dun
            db.commit()
            logger.info("dunning recovered", user=str(user.id))
        return {"received": True}

    if user and plan:
        user.plan = plan
        user.listing_limit = billing.limit_for_plan(plan)
        if customer:
            user.stripe_customer_id = customer
        if sub_id:
            user.stripe_subscription_id = sub_id
        db.commit()
        logger.info("plan synced via webhook", user=str(user.id), plan=plan, event_type=etype)
        if plan in billing.PLANS:
            try:  # referral give-a-month/get-a-month — idempotent, never 500s the webhook
                referrals.grant_conversion_credit(user, db)
            except Exception as e:
                logger.error("referral credit hook failed", user=str(user.id), error=str(e))
    return {"received": True}
