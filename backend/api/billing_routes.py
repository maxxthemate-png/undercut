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
from ..services import billing
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/api/billing", tags=["billing"])
public_router = APIRouter(prefix="/api/billing", tags=["billing-public"])


def _app_url() -> str:
    return getattr(settings, "PUBLIC_APP_URL", None) or "http://localhost:3000"


def _uuid(v):
    try:
        return uuid.UUID(str(v))
    except (ValueError, TypeError):
        return None


class CheckoutIn(BaseModel):
    plan: str
    interval: str = "month"   # "month" (default) | "year"


@public_router.get("/plans")
def plans():
    return {"plans": billing.public_plans(),
            "publishable_key": getattr(settings, "STRIPE_PUBLISHABLE_KEY", None)}


@router.post("/checkout")
def checkout(body: CheckoutIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    if not settings.STRIPE_SECRET_KEY:
        raise HTTPException(status_code=503, detail="billing not configured")
    base = _app_url()
    try:
        url, customer = billing.create_checkout_session(
            user, body.plan, f"{base}/?upgraded=1", f"{base}/billing",
            interval=("year" if body.interval == "year" else "month"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if customer and not user.stripe_customer_id:
        user.stripe_customer_id = customer
        db.commit()
    return {"url": url}


@router.post("/portal")
def portal(user: User = Depends(current_user)):
    if not user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="no billing account yet")
    return {"url": billing.create_portal_session(user.stripe_customer_id, f"{_app_url()}/billing")}


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
        plan = meta.get("plan")
        customer, sub_id = obj.get("customer"), obj.get("subscription")
    elif etype in ("customer.subscription.created", "customer.subscription.updated"):
        customer, sub_id = obj.get("customer"), obj.get("id")
        user = db.scalar(select(User).where(User.stripe_customer_id == customer))
        items = (obj.get("items") or {}).get("data") or []
        plan = billing.plan_from_price(items[0]["price"]["id"] if items else None)
        if user:  # keep dunning state in sync with the subscription status
            status = obj.get("status")
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
    return {"received": True}
