"""Referral program — give a month, get a month.

Every user has a short share code (?ref=CODE on /signup). When someone they
referred converts to ANY paid plan, both sides get one free Starter-month
($29) as Stripe customer-balance credit, applied automatically to their next
invoice(s). Credit is granted exactly once per referred user
(users.referral_credited_at is the idempotency stamp — required because Stripe
retries webhooks and subscription events can arrive more than once).
"""
import secrets
from datetime import datetime

import stripe
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..models.repricer_models import User
from ..utils.logging import get_logger

logger = get_logger(__name__)

CREDIT_CENTS = 2900  # one Starter month, both sides

# unambiguous alphabet (no 0/O/1/I/L) — codes get read aloud and retyped
_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"


def _new_code() -> str:
    return "".join(secrets.choice(_ALPHABET) for _ in range(8))


def ensure_code(user: User, db: Session) -> str:
    """Return the user's referral code, generating one on first ask."""
    if user.referral_code:
        return user.referral_code
    for _ in range(5):  # collision retry (unique index is the real guard)
        code = _new_code()
        if not db.scalar(select(User).where(User.referral_code == code)):
            user.referral_code = code
            db.commit()
            return code
    raise RuntimeError("could not allocate a referral code")


def attribute_signup(new_user: User, ref_code: str | None, db: Session) -> None:
    """Record who referred a brand-new signup. Silent no-op on bad/self codes —
    a broken ref link must never block a signup."""
    if not ref_code:
        return
    referrer = db.scalar(select(User).where(User.referral_code == ref_code.strip().upper()))
    if referrer and referrer.id != new_user.id:
        new_user.referred_by_user_id = referrer.id


def stats(user: User, db: Session) -> dict:
    signups = db.scalar(select(func.count()).select_from(User)
                        .where(User.referred_by_user_id == user.id)) or 0
    converted = db.scalar(select(func.count()).select_from(User)
                          .where(User.referred_by_user_id == user.id,
                                 User.referral_credited_at.isnot(None))) or 0
    return {"signups": signups, "converted": converted,
            "credit_earned": converted * CREDIT_CENTS // 100}


def _credit_customer(customer_id: str, memo: str) -> None:
    # Negative amount = credit toward future invoices.
    stripe.Customer.create_balance_transaction(
        customer_id, amount=-CREDIT_CENTS, currency="usd", description=memo)


def grant_conversion_credit(referred: User, db: Session) -> bool:
    """Called when `referred` lands on a paid plan. Credits both sides once.
    Best-effort per side: the referred user's credit must not be lost because
    the referrer has a broken Stripe state, and vice versa. Returns True if
    credit was granted this call."""
    if not referred.referred_by_user_id or referred.referral_credited_at:
        return False
    referrer = db.get(User, referred.referred_by_user_id)
    if not referrer:
        return False

    # Stamp FIRST so a webhook retry can't double-credit; roll back on total failure.
    referred.referral_credited_at = datetime.utcnow()
    db.commit()

    granted = False
    if referred.stripe_customer_id:
        try:
            _credit_customer(referred.stripe_customer_id, "Referral credit — welcome aboard")
            granted = True
        except Exception as e:
            logger.error("referral credit (referred side) failed",
                         user=str(referred.id), error=str(e))
    try:
        cust = referrer.stripe_customer_id
        if not cust:  # referrer may never have opened checkout — park credit on a new customer
            cust = stripe.Customer.create(email=referrer.email,
                                          metadata={"user_id": str(referrer.id)}).id
            referrer.stripe_customer_id = cust
            db.commit()
        _credit_customer(cust, f"Referral credit — {referred.email.split('@')[0]}*** upgraded")
        granted = True
    except Exception as e:
        logger.error("referral credit (referrer side) failed",
                     user=str(referrer.id), error=str(e))

    if granted:
        logger.info("referral credit granted",
                    referred=str(referred.id), referrer=str(referrer.id))
        try:  # best-effort notify the referrer — never fail the webhook
            from ..utils.email_templates import referral_credit_email
            from ..utils.notifications import send_customer_email
            if not referrer.email_unsubscribed:
                subject, html = referral_credit_email()
                send_customer_email(referrer.email, subject, html)
        except Exception:
            pass
    else:
        # Neither side could be credited — un-stamp so a later retry can succeed.
        referred.referral_credited_at = None
        db.commit()
    return granted
