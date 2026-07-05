"""Signup / login / me / password reset — issues JWTs for the SaaS."""
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


@router.post("/signup")
def signup(body: Creds, request: Request, db: Session = Depends(get_db)):
    if _signup_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many attempts — try again in a minute.")
    email = body.email.strip().lower()
    if not email or "@" not in email or len(body.password) < 8:
        raise HTTPException(status_code=400, detail="valid email + password (8+ chars) required")
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=400, detail="email already registered")
    u = User(email=email, password_hash=auth.hash_pw(body.password))
    billing.start_trial(u)          # new sellers get a no-card 14-day Founding trial (Starter-level)
    try:
        db.add(u); db.commit()
    except IntegrityError:
        # Concurrent signup race: the SELECT above passed for both requests —
        # the unique constraint is the real guard; return the friendly 400.
        db.rollback()
        raise HTTPException(status_code=400, detail="email already registered")
    db.refresh(u)
    try:                            # best-effort welcome email — never block signup
        from ..utils.email_templates import welcome_email
        from ..utils.notifications import send_customer_email
        subject, html = welcome_email()
        send_customer_email(u.email, subject, html)
    except Exception:
        pass
    return {"token": auth.make_token(u), "email": u.email, **billing.access_summary(u)}


@router.post("/login")
def login(body: Creds, request: Request, db: Session = Depends(get_db)):
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
