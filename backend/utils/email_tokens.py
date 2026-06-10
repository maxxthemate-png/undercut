"""Signed unsubscribe tokens — HMAC of the email keyed by SECRET_KEY.

No expiry on purpose: a CAN-SPAM unsubscribe link must keep working in an old
email. No table needed — the token is deterministic and verifiable.
"""
import hashlib
import hmac
from urllib.parse import quote

from .settings import settings


def unsubscribe_token(email: str) -> str:
    return hmac.new(
        settings.SECRET_KEY.encode(), b"unsub:" + email.strip().lower().encode(), hashlib.sha256
    ).hexdigest()[:32]


def verify_unsubscribe(email: str, token: str) -> bool:
    return hmac.compare_digest(unsubscribe_token(email), (token or "").strip())


def unsubscribe_url(email: str) -> str | None:
    base = (getattr(settings, "PUBLIC_API_URL", None) or "").rstrip("/")
    if not base:
        return None
    return f"{base}/api/email/unsubscribe?e={quote(email.strip().lower())}&t={unsubscribe_token(email)}"
