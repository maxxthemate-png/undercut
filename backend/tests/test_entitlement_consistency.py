"""Entitlement consistency (AUDIT-2026-08-08 finding #3).

Before this fix, only the reprice cron read `billing.effective_access` — the
`/api/auth/me` + `/api/repricer/listings` payload (`access_summary`) and the two
listing-import cap sites (OAuth callback + manual import + auto-resync) all read
the raw stored `user.plan` / `user.listing_limit` columns instead. A Season Pass
buyer's `pass_expires_at`/`pass_plan` never touch those raw columns (grant_pass()
only ever sets the pass fields), so a $145 purchase showed as "free, 25 listings"
everywhere in the product except the background repricer.

This file locks in: access_summary reports the EFFECTIVE plan/limit (not the raw
columns) and a pass_active flag the frontend uses to suppress upgrade nags; and
the listing-import cap actually grants the pass's higher limit instead of the
free tier's.
"""
import uuid

from backend.models.database import SessionLocal
from backend.models.repricer_models import User
from backend.services import billing


class U:
    """Minimal user stand-in for pure-logic tests — same convention as
    test_season_pass.py's stand-in."""
    def __init__(self, **kw):
        self.plan = "free"
        self.listing_limit = billing.FREE_LIMIT
        self.trial_ends_at = None
        self.payment_status = "ok"
        self.payment_failed_at = None
        self.pass_expires_at = None
        self.pass_plan = None
        self.__dict__.update(kw)


# ---- pure: access_summary must mirror effective_access, not the raw columns ----

def test_access_summary_reflects_pass_not_raw_free_plan():
    u = U()  # raw stored plan is "free" / 25 listings
    billing.grant_pass(u)
    summary = billing.access_summary(u)
    assert summary["plan"] == "starter"
    assert summary["listing_limit"] == billing.limit_for_plan("starter")
    assert summary["pass_active"] is True
    # the raw columns themselves are untouched by grant_pass — the bug was
    # reading them directly instead of going through effective_access
    assert u.plan == "free"
    assert u.listing_limit == billing.FREE_LIMIT


def test_access_summary_no_pass_uses_stored_plan():
    u = U(plan="pro", listing_limit=billing.limit_for_plan("pro"))
    summary = billing.access_summary(u)
    assert summary["plan"] == "pro"
    assert summary["listing_limit"] == billing.limit_for_plan("pro")
    assert summary["pass_active"] is False


def test_access_summary_expired_pass_falls_back_to_free():
    from datetime import datetime, timedelta
    u = U(pass_expires_at=datetime.utcnow() - timedelta(days=1), pass_plan="starter")
    summary = billing.access_summary(u)
    assert summary["plan"] == "free"
    assert summary["listing_limit"] == billing.FREE_LIMIT
    assert summary["pass_active"] is False


def test_access_summary_pass_never_shrinks_a_better_paid_plan():
    u = U(plan="scale", listing_limit=billing.limit_for_plan("scale"))
    billing.grant_pass(u)
    summary = billing.access_summary(u)
    assert summary["plan"] == "scale"
    assert summary["listing_limit"] == billing.limit_for_plan("scale")
    assert summary["pass_active"] is True  # still true — they have a live pass, just outclassed


# ---- integration: /api/auth/me must reflect the pass, end to end ----

def _signup(client, email):
    r = client.post("/api/auth/signup", json={"email": email})
    assert r.status_code == 200, r.text
    return r.json()["token"]


def test_me_endpoint_shows_pass_access_not_free(client):
    email = f"pass-{uuid.uuid4().hex[:8]}@example.com"
    token = _signup(client, email)
    headers = {"Authorization": f"Bearer {token}"}

    # confirm the pre-pass baseline really is free-tier, so the assertion below
    # is proving something (not just matching whatever the account started as)
    before = client.get("/api/auth/me", headers=headers).json()
    assert before["plan"] in ("trial", "free")
    assert before["pass_active"] is False

    db = SessionLocal()
    try:
        u = db.query(User).filter(User.email == email).one()
        billing.grant_pass(u)
        db.commit()
    finally:
        db.close()

    after = client.get("/api/auth/me", headers=headers).json()
    assert after["plan"] == "starter"
    assert after["listing_limit"] == billing.limit_for_plan("starter")
    assert after["pass_active"] is True


# ---- integration: the import cap must grant the pass's limit, not the free tier's ----

def test_import_cap_grants_pass_limit_not_free_limit(client, monkeypatch):
    from backend.services.ebay_store import EbayStoreClient

    email = f"import-{uuid.uuid4().hex[:8]}@example.com"
    token = _signup(client, email)
    headers = {"Authorization": f"Bearer {token}"}

    db = SessionLocal()
    try:
        u = db.query(User).filter(User.email == email).one()
        # Force the raw stored plan down to free (25) — a pass buyer's account
        # commonly still has free-tier raw columns, since grant_pass() never
        # touches them. If the import cap read the raw column, this test would
        # cap at 25; effective_access must lift it to the pass's 100.
        u.plan = "free"
        u.listing_limit = billing.FREE_LIMIT
        billing.grant_pass(u)
        db.commit()
    finally:
        db.close()

    n_items = 30  # > free's 25-listing cap, comfortably under the pass's 100

    async def fake_get_active_listings(self, limit=200, max_pages=50):
        return [
            {"ebay_item_id": f"11000000{i:04d}", "title": f"Widget {i}", "sku": None,
             "category_id": None, "price": 9.99, "quantity": 1}
            for i in range(n_items)
        ]

    monkeypatch.setattr(EbayStoreClient, "get_active_listings", fake_get_active_listings)

    store_res = client.post("/api/repricer/stores",
                             json={"name": "eBay Store", "user_token": "fake-token"},
                             headers=headers)
    assert store_res.status_code == 200, store_res.text
    store_id = store_res.json()["id"]

    imp = client.post(f"/api/repricer/stores/{store_id}/import", headers=headers)
    assert imp.status_code == 200, imp.text
    body = imp.json()
    # all 30 imported — proof the effective (pass) limit of 100 was applied, not
    # the raw free-tier limit of 25 (which would have skipped 5)
    assert body["imported"] == n_items, body
    assert body["skipped_over_plan_limit"] == 0, body
