"""Email/password auth with JWT for the multi-tenant SaaS."""
import uuid as _uuid
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from ..utils.settings import settings
from ..models.database import get_db
from ..models.repricer_models import User

_pwd = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
_ALGO = "HS256"
_TOKEN_DAYS = 30


def hash_pw(p: str) -> str:
    return _pwd.hash(p)


def verify_pw(p: str, h: str) -> bool:
    try:
        return _pwd.verify(p, h)
    except Exception:
        return False


def make_token(user_id) -> str:
    return jwt.encode(
        {"sub": str(user_id), "exp": datetime.utcnow() + timedelta(days=_TOKEN_DAYS)},
        settings.SECRET_KEY, algorithm=_ALGO,
    )


_OAUTH_STATE_MIN = 15


def make_oauth_state(user_id) -> str:
    """Signed, short-lived state for the eBay OAuth flow — prevents a forged/CSRF
    callback from attaching an eBay store (and seller token) to another account."""
    return jwt.encode(
        {"sub": str(user_id), "purpose": "ebay_oauth",
         "exp": datetime.utcnow() + timedelta(minutes=_OAUTH_STATE_MIN)},
        settings.SECRET_KEY, algorithm=_ALGO,
    )


def verify_oauth_state(state: str | None):
    """Return the user_id from a valid, unexpired OAuth state, else None."""
    if not state:
        return None
    try:
        payload = jwt.decode(state, settings.SECRET_KEY, algorithms=[_ALGO])
    except JWTError:
        return None
    if payload.get("purpose") != "ebay_oauth":
        return None
    return payload.get("sub")


def current_user(authorization: str | None = Header(default=None),
                 db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="missing bearer token")
    try:
        payload = jwt.decode(authorization.split(" ", 1)[1], settings.SECRET_KEY, algorithms=[_ALGO])
        uid = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="invalid or expired token")
    try:
        user = db.get(User, _uuid.UUID(str(uid)))
    except (ValueError, TypeError):
        user = None
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="user not found")
    return user
