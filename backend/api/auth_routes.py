"""Signup / login / me — issues JWTs for the SaaS."""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User
from ..services import auth, billing

router = APIRouter(prefix="/api/auth", tags=["auth"])


class Creds(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(body: Creds, db: Session = Depends(get_db)):
    email = body.email.strip().lower()
    if not email or "@" not in email or len(body.password) < 8:
        raise HTTPException(status_code=400, detail="valid email + password (8+ chars) required")
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=400, detail="email already registered")
    u = User(email=email, password_hash=auth.hash_pw(body.password))
    billing.start_trial(u)          # new sellers get a no-card 14-day Founding trial (Starter-level)
    db.add(u); db.commit(); db.refresh(u)
    return {"token": auth.make_token(u.id), "email": u.email, **billing.access_summary(u)}


@router.post("/login")
def login(body: Creds, db: Session = Depends(get_db)):
    u = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if not u or not auth.verify_pw(body.password, u.password_hash):
        raise HTTPException(status_code=401, detail="invalid credentials")
    if billing.normalize_access(u):   # expire a finished trial -> free, on login
        db.commit()
    return {"token": auth.make_token(u.id), "email": u.email, **billing.access_summary(u)}


@router.get("/me")
def me(user: User = Depends(auth.current_user), db: Session = Depends(get_db)):
    if billing.normalize_access(user):   # self-heal an expired trial -> free
        db.commit()
    return {"email": user.email, "stripe_customer_id": user.stripe_customer_id,
            **billing.access_summary(user)}
