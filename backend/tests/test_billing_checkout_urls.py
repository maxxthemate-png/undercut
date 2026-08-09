"""Regression: both checkout endpoints must return a success_url carrying the
Stripe session_id placeholder, so the dashboard can dedup-track the purchase
conversion exactly once. AUDIT-2026-08-08 finding #2: the Season Pass endpoint
(checkout-pass) was shipped with a bare `?pass=1` success_url that never
carried session_id, so pass buyers never triggered the success banner,
fetchAll() refresh, or the Ads purchase conversion event.
"""
import uuid

from backend.services import billing
from backend.utils.settings import settings


def _signup(client, email):
    r = client.post("/api/auth/signup", json={"email": email, "password": "hunter2boat"})
    assert r.status_code == 200, r.text
    return r.json()["token"]


def test_checkout_pass_success_url_carries_session_id(client, monkeypatch):
    captured = {}

    def fake_create_pass_checkout(user, success_url, cancel_url):
        captured["success_url"] = success_url
        captured["cancel_url"] = cancel_url
        return "https://checkout.stripe.com/fake", "cus_fake"

    monkeypatch.setattr(billing, "create_pass_checkout", fake_create_pass_checkout)

    email = f"pass-{uuid.uuid4().hex[:8]}@example.com"
    token = _signup(client, email)
    r = client.post("/api/billing/checkout-pass", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200, r.text

    assert "pass=1" in captured["success_url"]
    assert "{CHECKOUT_SESSION_ID}" in captured["success_url"]


def test_checkout_success_url_carries_session_id(client, monkeypatch):
    """The regular-upgrade flow this pattern was copied from — locked in so a
    future edit can't silently drop session_id from either endpoint again."""
    captured = {}

    def fake_create_checkout_session(user, plan, success_url, cancel_url, interval="month"):
        captured["success_url"] = success_url
        return "https://checkout.stripe.com/fake", "cus_fake"

    monkeypatch.setattr(billing, "create_checkout_session", fake_create_checkout_session)
    monkeypatch.setattr(settings, "STRIPE_SECRET_KEY", "sk_test_x")

    email = f"upg-{uuid.uuid4().hex[:8]}@example.com"
    token = _signup(client, email)
    r = client.post("/api/billing/checkout", json={"plan": "pro"},
                    headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200, r.text

    assert "upgraded=1" in captured["success_url"]
    assert "{CHECKOUT_SESSION_ID}" in captured["success_url"]
