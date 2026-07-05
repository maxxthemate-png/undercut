"""Stripe webhook plan-sync: the revenue-critical event dispatch.

Locks in: checkout grants the paid plan; cancellation downgrades; a stale/
retried 'subscription.updated' with a dead status must NOT re-grant access
(Stripe does not guarantee event ordering); an existing subscriber can't open
a second checkout (double-billing).
"""
import uuid

import pytest

from backend.models.database import SessionLocal
from backend.models.repricer_models import User
from backend.services import billing
from backend.utils.settings import settings


def _signup(client, email):
    r = client.post("/api/auth/signup", json={"email": email, "password": "hunter2boat"})
    assert r.status_code == 200, r.text
    return r.json()["token"]


def _user(email) -> User:
    db = SessionLocal()
    try:
        return db.query(User).filter(User.email == email).one()
    finally:
        db.close()


def _set(email, **fields):
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.email == email).one()
        for k, v in fields.items():
            setattr(u, k, v)
        db.commit()
    finally:
        db.close()


def _post_event(client, monkeypatch, event):
    monkeypatch.setattr(billing, "construct_event", lambda payload, sig: event)
    r = client.post("/api/billing/webhook", content=b"{}",
                    headers={"stripe-signature": "t=1,v1=test"})
    assert r.status_code == 200, r.text
    return r


def test_checkout_completed_grants_plan(client, monkeypatch):
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    uid = str(_user(email).id)
    _post_event(client, monkeypatch, {
        "type": "checkout.session.completed",
        "data": {"object": {"metadata": {"user_id": uid, "plan": "pro"},
                            "customer": "cus_test1", "subscription": "sub_test1"}}})
    u = _user(email)
    assert u.plan == "pro"
    assert u.listing_limit == billing.limit_for_plan("pro")
    assert u.stripe_customer_id == "cus_test1"


def test_subscription_deleted_downgrades_to_free(client, monkeypatch):
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    _set(email, plan="pro", listing_limit=1000,
         stripe_customer_id="cus_test2", stripe_subscription_id="sub_test2")
    _post_event(client, monkeypatch, {
        "type": "customer.subscription.deleted",
        "data": {"object": {"customer": "cus_test2"}}})
    u = _user(email)
    assert u.plan == "free"
    assert u.listing_limit == billing.FREE_LIMIT
    assert u.stripe_subscription_id is None


def test_stale_canceled_update_does_not_regrant(client, monkeypatch):
    """The out-of-order-retry hole: 'updated' with status=canceled arriving
    AFTER 'deleted' used to re-grant the paid plan forever."""
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    _set(email, plan="free", listing_limit=billing.FREE_LIMIT, stripe_customer_id="cus_test3")
    monkeypatch.setattr(settings, "STRIPE_PRICE_PRO", "price_pro_x")
    _post_event(client, monkeypatch, {
        "type": "customer.subscription.updated",
        "data": {"object": {"customer": "cus_test3", "id": "sub_test3", "status": "canceled",
                            "items": {"data": [{"price": {"id": "price_pro_x"}}]}}}})
    assert _user(email).plan == "free"  # NOT re-granted


def test_active_update_does_grant(client, monkeypatch):
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    _set(email, stripe_customer_id="cus_test4")
    monkeypatch.setattr(settings, "STRIPE_PRICE_PRO", "price_pro_x")
    _post_event(client, monkeypatch, {
        "type": "customer.subscription.updated",
        "data": {"object": {"customer": "cus_test4", "id": "sub_test4", "status": "active",
                            "items": {"data": [{"price": {"id": "price_pro_x"}}]}}}})
    assert _user(email).plan == "pro"


def test_malformed_items_does_not_500(client, monkeypatch):
    """Shape drift in items[] must not 500 (Stripe retries a 500 forever)."""
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    _set(email, stripe_customer_id="cus_test5")
    _post_event(client, monkeypatch, {
        "type": "customer.subscription.updated",
        "data": {"object": {"customer": "cus_test5", "id": "sub_test5", "status": "active",
                            "items": {"data": [{}]}}}})  # no "price" key


def test_existing_subscriber_cannot_double_checkout(client, monkeypatch):
    email = f"wh-{uuid.uuid4().hex[:8]}@example.com"
    token = _signup(client, email)
    _set(email, stripe_subscription_id="sub_live")
    monkeypatch.setattr(settings, "STRIPE_SECRET_KEY", "sk_test_x")
    r = client.post("/api/billing/checkout", json={"plan": "pro"},
                    headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 400
    assert "already have an active subscription" in r.json()["detail"]
