"""Test scaffold for the public demo engine + admin guard.

Provides a FastAPI TestClient against the real app, plus a `fake_ebay` fixture
that monkeypatches the eBay network calls with canned data so tests never hit
the live Browse API. The in-process cache + throttle are reset between tests.

Run:
    backend/venv/bin/python -m pytest backend/tests -q
"""
import os
import sys

# Make `backend` importable as a package root when run from anywhere.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# settings (pydantic-settings) read these at import time; the admin guard reads
# the admin key per request. Set harmless dummies BEFORE the app is imported.
os.environ.setdefault("ANTHROPIC_API_KEY", "test")
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("ADMIN_KEY", "test-admin-key")
os.environ.setdefault("UNDERCUT_API_KEY", "test-admin-key")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from backend.api.main import app  # noqa: E402
from backend.api import tools_routes  # noqa: E402
from backend.services.ebay_store import EbayStoreClient  # noqa: E402

# --- test database: in-memory sqlite, swapped in for the app's Postgres engine.
# settings loads the project .env with override=True, so the env var set above
# can be clobbered by a real local DATABASE_URL — rebind the engine explicitly.
from sqlalchemy import create_engine  # noqa: E402
from sqlalchemy.orm import sessionmaker  # noqa: E402
from sqlalchemy.pool import StaticPool  # noqa: E402
from backend.models import database as _dbmod  # noqa: E402
from backend.models.base import Base  # noqa: E402

_test_engine = create_engine("sqlite://", connect_args={"check_same_thread": False},
                             poolclass=StaticPool, future=True)
Base.metadata.create_all(_test_engine)
_TestSession = sessionmaker(bind=_test_engine, autocommit=False, autoflush=False,
                            expire_on_commit=False)


def _test_get_db():
    db = _TestSession()
    try:
        yield db
    finally:
        db.close()


_dbmod.engine = _test_engine
_dbmod.SessionLocal = _TestSession
app.dependency_overrides[_dbmod.get_db] = _test_get_db

ADMIN_KEY = "test-admin-key"
ADMIN_HEADERS = {"X-Admin-Key": ADMIN_KEY}


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture(autouse=True)
def _reset_tools_state():
    """Clear the per-process caches + per-IP throttles so tests don't bleed into
    each other (module-level dicts in tools_routes + the auth-route throttles —
    every TestClient request shares one 'IP', so signups exhaust 5/min fast)."""
    from backend.api import auth_routes as _auth_routes

    def _clear():
        tools_routes._CACHE.clear()
        tools_routes._HITS.clear()
        _auth_routes._signup_throttle._hits.clear()
        _auth_routes._login_throttle._hits.clear()
        _auth_routes._reset_throttle._hits.clear()

    _clear()
    yield
    _clear()


@pytest.fixture
def fake_ebay(monkeypatch):
    """Replace the two eBay network methods with canned data + a call counter,
    so the demo endpoints are exercised without touching the live Browse API."""
    calls = {"search_lowest": 0, "lookup_item_comps": 0}

    async def fake_search_lowest(self, query, limit=30, top=5):
        calls["search_lowest"] += 1
        return {
            "lowest": 19.99,
            "count": 3,
            "items": [{"title": "Widget", "price": 19.99, "condition": "New",
                       "url": "https://www.ebay.com/itm/100000000001"}],
        }

    async def fake_lookup_item_comps(self, legacy_id, top=5):
        calls["lookup_item_comps"] += 1
        return {
            "item": {"title": "Widget", "price": 24.99, "condition": "New",
                     "url": f"https://www.ebay.com/itm/{legacy_id}"},
            "lowest": 19.99,
            "count": 2,
            "items": [{"title": "Widget", "price": 19.99, "condition": "New",
                       "url": "https://www.ebay.com/itm/100000000009"}],
        }

    monkeypatch.setattr(EbayStoreClient, "search_lowest", fake_search_lowest)
    monkeypatch.setattr(EbayStoreClient, "lookup_item_comps", fake_lookup_item_comps)
    return calls
