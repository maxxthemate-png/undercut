"""Signup / login / me — passwordless (magic-link) auth, issues JWTs for the SaaS.

Signup is email-only: a brand-new email creates the account and logs in instantly
(max conversion). Any access to an EXISTING account requires clicking a signed link
emailed to that address (proves ownership — prevents takeover). The legacy
password /login + reset endpoints are kept for accounts that already have a password."""
import secrets

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User
from ..services import auth, billing
from ..utils.throttle import IPThrottle, client_ip

router = APIRouter(prefix="/api/auth", tags=["auth"])

_signup_throttle = IPThrottle(5, 60)
_login_throttle = IPThrottle(10, 60)
_reset_throttle = IPThrottle(3, 300)


class Creds(BaseModel):
    email: str
    password: str


class EmailIn(BaseModel):
    email: str


class TokenIn(BaseModel):
    token: str


def _send_login_link(u: User) -> None:
    """Best-effort magic-login email. Never raises, never reveals whether the
    account exists to the caller."""
    try:
        from ..utils.settings import settings
        from ..utils.email_templates import magic_login_email
        from ..utils.notifications import send_customer_email
        app = (settings.PUBLIC_APP_URL or "https://undercutpricer.com").rstrip("/")
        link = f"{app}/login?token={auth.make_login_token(u)}"
        subject, html = magic_login_email(link)
        send_customer_email(u.email, subject, html)
    except Exception:
        pass


@router.post("/signup")
def signup(body: EmailIn, request: Request, db: Session = Depends(get_db)):
    """Email-only. New email → create account + instant login. Existing email →
    email a sign-in link (never issue access without proof of ownership)."""
    if _signup_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many attempts — try again in a minute.")
    email = body.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Enter a valid email address.")
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        _send_login_link(existing)
        return {"check_email": True, "email": email}
    # New account, no password: a random unusable hash keeps the column + the
    # session pwv-binding valid. Access is via magic link from here on.
    u = User(email=email, password_hash=auth.hash_pw(secrets.token_urlsafe(32)))
    billing.start_trial(u)          # new sellers get a no-card 14-day Founding trial (Starter-level)
    try:
        db.add(u); db.commit()
    except IntegrityError:
        # Concurrent signup race — the unique constraint is the real guard.
        db.rollback()
        existing = db.scalar(select(User).where(User.email == email))
        if existing:
            _send_login_link(existing)
        return {"check_email": True, "email": email}
    db.refresh(u)
    try:                            # best-effort welcome email — never block signup
        from ..utils.email_templates import welcome_email
        from ..utils.notifications import send_customer_email
        subject, html = welcome_email()
        send_customer_email(u.email, subject, html)
    except Exception:
        pass
    return {"token": auth.make_token(u), "email": u.email, **billing.access_summary(u)}


@router.post("/request-login-link")
def request_login_link(body: EmailIn, request: Request, db: Session = Depends(get_db)):
    """Passwordless login. Always returns ok (no account enumeration). Emails a
    30-min signed magic-login link if the account exists."""
    if _login_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many attempts — try again in a minute.")
    u = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if u:
        _send_login_link(u)
    return {"ok": True}


@router.post("/login-with-token")
def login_with_token(body: TokenIn, db: Session = Depends(get_db)):
    """Exchange a magic-login link token for a session JWT."""
    u = auth.verify_login_token(body.token, db)
    if not u:
        raise HTTPException(status_code=400, detail="This sign-in link is invalid or expired.")
    if billing.normalize_access(u):
        db.commit()
    return {"token": auth.make_token(u), "email": u.email, **billing.access_summary(u)}


@router.post("/login")
def login(body: Creds, request: Request, db: Session = Depends(get_db)):
    """Legacy password login — kept for accounts that set a password via reset.
    The UI is passwordless (magic link); this endpoint is not surfaced there."""
    if _login_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many attempts — try again in a minute.")
    u = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if not u or not auth.verify_pw(body.password, u.password_hash):
        raise HTTPException(status_code=401, detail="invalid credentials")
    if billing.normalize_access(u):   # expire a finished trial -> free, on login
        db.commit()
    return {"token": auth.make_token(u), "email": u.email, **billing.access_summary(u)}


class ResetRequest(BaseModel):
    email: str


class ResetConfirm(BaseModel):
    token: str
    password: str


@router.post("/request-password-reset")
def request_password_reset(body: ResetRequest, request: Request, db: Session = Depends(get_db)):
    """Always returns ok (no account enumeration). Sends a 60-min signed reset
    link if the account exists. Transactional — sent even if unsubscribed."""
    if _reset_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many attempts — try again later.")
    u = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if u:
        try:  # best-effort — the response must not leak whether the email exists
            from ..utils.settings import settings
            from ..utils.email_templates import password_reset_email
            from ..utils.notifications import send_customer_email
            app = (settings.PUBLIC_APP_URL or "https://undercutpricer.com").rstrip("/")
            link = f"{app}/reset-password?token={auth.make_reset_token(u)}"
            subject, html = password_reset_email(link)
            send_customer_email(u.email, subject, html)
        except Exception:
            pass
    return {"ok": True}


@router.post("/reset-password")
def reset_password(body: ResetConfirm, db: Session = Depends(get_db)):
    u = auth.verify_reset_token(body.token, db)
    if not u:
        raise HTTPException(status_code=400, detail="This reset link is invalid or expired.")
    if len(body.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters.")
    u.password_hash = auth.hash_pw(body.password)
    db.commit()
    return {"token": auth.make_token(u), "email": u.email, **billing.access_summary(u)}


@router.get("/me")
def me(user: User = Depends(auth.current_user), db: Session = Depends(get_db)):
    if billing.normalize_access(user):   # self-heal an expired trial -> free
        db.commit()
    return {"email": user.email, "stripe_customer_id": user.stripe_customer_id,
            **billing.access_summary(user)}
