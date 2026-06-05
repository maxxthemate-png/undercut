"""Signup / login / me — issues JWTs for the SaaS."""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User
from ..services import auth

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
    u = User(email=email, password_hash=auth.hash_pw(body.password), plan="free", listing_limit=25)
    db.add(u); db.commit(); db.refresh(u)
    return {"token": auth.make_token(u.id), "email": u.email, "plan": u.plan}


@router.post("/login")
def login(body: Creds, db: Session = Depends(get_db)):
    u = db.scalar(select(User).where(User.email == body.email.strip().lower()))
    if not u or not auth.verify_pw(body.password, u.password_hash):
        raise HTTPException(status_code=401, detail="invalid credentials")
    return {"token": auth.make_token(u.id), "email": u.email, "plan": u.plan}


@router.get("/me")
def me(user: User = Depends(auth.current_user)):
    return {"email": user.email, "plan": user.plan, "listing_limit": user.listing_limit,
            "stripe_customer_id": user.stripe_customer_id}
