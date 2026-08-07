"""Token-refresh recovery + alert dedupe.

Regression tests for a bug found in production 2026-08-07: three connected stores
failed eBay import every 6 hours with error 931 ("Validation of the authentication
token in API request failed"), emailing the operator an identical alert each cycle,
forever. Root causes: a NULL token_expires_at meant the token was never treated as
expired, a failed refresh was silently ignored, and a store with no refresh token
was retried endlessly.
"""
import uuid
from datetime import datetime, timedelta
from unittest.mock import AsyncMock, patch

from backend.models.database import SessionLocal
from backend.models.repricer_models import Store, User
from backend.services import reprice_service


def _store(**kw) -> Store:
    db = SessionLocal()
    try:
        u = User(email=f"tk-{uuid.uuid4().hex[:8]}@example.com", password_hash="x")
        db.add(u); db.commit()
        s = Store(user_id=u.id, name="eBay Store", is_active=True,
                  oauth_access_token="enc-access", **kw)
        db.add(s); db.commit(); db.refresh(s)
        return s.id
    finally:
        db.close()


def test_missing_expiry_is_treated_as_expired_and_refreshed():
    """A NULL token_expires_at previously meant 'never expired', so a dead token
    was reused forever."""
    sid = _store(oauth_refresh_token="enc-refresh", token_expires_at=None)
    db = SessionLocal()
    try:
        s = db.get(Store, sid)
        with patch.object(reprice_service.ebay_oauth, "refresh",
                          AsyncMock(return_value={"access_token": "new", "expires_in": 7200})), \
             patch.object(reprice_service, "decrypt_token", lambda v: "plain"), \
             patch.object(reprice_service, "encrypt_token", lambda v: f"enc-{v}"):
            import asyncio
            asyncio.run(reprice_service._ensure_fresh_token(db, s))
        assert s.token_expires_at is not None and s.token_expires_at > datetime.utcnow()
        assert s.needs_reconnect is False
    finally:
        db.close()


def test_invalid_grant_marks_needs_reconnect_and_alerts_once():
    sid = _store(oauth_refresh_token="enc-refresh",
                 token_expires_at=datetime.utcnow() - timedelta(hours=1))
    db = SessionLocal()
    try:
        s = db.get(Store, sid)
        with patch.object(reprice_service.ebay_oauth, "refresh",
                          AsyncMock(return_value={"error": "invalid_grant",
                                                  "error_description": "refresh token expired"})), \
             patch.object(reprice_service, "decrypt_token", lambda v: "plain"), \
             patch.object(reprice_service, "_operator_alert") as alert:
            import asyncio
            asyncio.run(reprice_service._ensure_fresh_token(db, s))
            assert s.needs_reconnect is True
            assert alert.call_count == 1
            # Second cycle with the SAME failure must not re-alert.
            asyncio.run(reprice_service._ensure_fresh_token(db, s))
            assert alert.call_count == 1
    finally:
        db.close()


def test_no_refresh_token_marks_reconnect_instead_of_retrying_forever():
    sid = _store(oauth_refresh_token=None, token_expires_at=None)
    db = SessionLocal()
    try:
        s = db.get(Store, sid)
        with patch.object(reprice_service, "_operator_alert"):
            import asyncio
            asyncio.run(reprice_service._ensure_fresh_token(db, s))
        assert s.needs_reconnect is True
        assert "reconnect" in (s.last_import_error or "").lower()
    finally:
        db.close()


def test_resync_skips_stores_needing_reconnect():
    """The whole point: a dead store must drop out of the 6-hourly retry loop.

    Asserted on THIS store specifically (last_import_at stays None = never
    attempted) rather than on the run totals, because other tests share the
    in-memory DB and leave their own stores behind.
    """
    sid = _store(oauth_refresh_token="enc-refresh", token_expires_at=None)
    db = SessionLocal()
    try:
        s = db.get(Store, sid)
        s.needs_reconnect = True
        db.commit()
        assert s.last_import_at is None
        import asyncio
        asyncio.run(reprice_service.resync_stale_stores(db))
        db.refresh(s)
        assert s.last_import_at is None, "a needs_reconnect store must never be retried"
    finally:
        db.close()
