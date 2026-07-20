"""Referral program: code allocation, signup attribution, and the one-shot
conversion credit (idempotent under Stripe webhook retries)."""
import uuid
from unittest.mock import patch

from backend.models.database import SessionLocal
from backend.models.repricer_models import User
from backend.services import referrals


def _signup(client, email, ref=None):
    body = {"email": email}
    if ref:
        body["ref"] = ref
    r = client.post("/api/auth/signup", json=body)
    assert r.status_code == 200, r.text
    return r.json()["token"]


def _user(email) -> User:
    db = SessionLocal()
    try:
        return db.query(User).filter(User.email == email).one()
    finally:
        db.close()


def test_referral_endpoint_allocates_stable_code(client):
    email = f"rc-{uuid.uuid4().hex[:8]}@example.com"
    tok = _signup(client, email)
    h = {"Authorization": f"Bearer {tok}"}
    r1 = client.get("/api/billing/referral", headers=h)
    assert r1.status_code == 200, r1.text
    d1 = r1.json()
    assert d1["code"] and f"/signup?ref={d1['code']}" in d1["link"]
    # second call returns the SAME code (no churn)
    assert client.get("/api/billing/referral", headers=h).json()["code"] == d1["code"]


def test_signup_with_ref_attributes_referrer(client):
    ref_email = f"ra-{uuid.uuid4().hex[:8]}@example.com"
    tok = _signup(client, ref_email)
    code = client.get("/api/billing/referral",
                      headers={"Authorization": f"Bearer {tok}"}).json()["code"]

    new_email = f"rb-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, new_email, ref=code)
    assert _user(new_email).referred_by_user_id == _user(ref_email).id

    # bad code must not block signup, just skip attribution
    other = f"rx-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, other, ref="NOSUCHCODE")
    assert _user(other).referred_by_user_id is None


def test_conversion_credit_is_one_shot(client):
    ref_email = f"rr-{uuid.uuid4().hex[:8]}@example.com"
    tok = _signup(client, ref_email)
    code = client.get("/api/billing/referral",
                      headers={"Authorization": f"Bearer {tok}"}).json()["code"]
    conv_email = f"rp-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, conv_email, ref=code)

    db = SessionLocal()
    try:
        converted = db.query(User).filter(User.email == conv_email).one()
        converted.stripe_customer_id = "cus_test_converted"
        db.commit()
        with patch.object(referrals.stripe.Customer, "create_balance_transaction") as bal, \
             patch.object(referrals.stripe.Customer, "create") as create:
            create.return_value = type("C", (), {"id": "cus_test_referrer"})()
            assert referrals.grant_conversion_credit(converted, db) is True
            assert bal.call_count == 2          # both sides credited
            # webhook retry: stamped, so nothing happens
            assert referrals.grant_conversion_credit(converted, db) is False
            assert bal.call_count == 2
        referrer = db.query(User).filter(User.email == ref_email).one()
        assert referrer.stripe_customer_id == "cus_test_referrer"
    finally:
        db.close()


def test_total_stripe_failure_unstamps_for_retry(client):
    ref_email = f"rf-{uuid.uuid4().hex[:8]}@example.com"
    tok = _signup(client, ref_email)
    code = client.get("/api/billing/referral",
                      headers={"Authorization": f"Bearer {tok}"}).json()["code"]
    conv_email = f"rg-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, conv_email, ref=code)

    db = SessionLocal()
    try:
        converted = db.query(User).filter(User.email == conv_email).one()
        converted.stripe_customer_id = "cus_test_x"
        db.commit()
        with patch.object(referrals.stripe.Customer, "create_balance_transaction",
                          side_effect=Exception("stripe down")), \
             patch.object(referrals.stripe.Customer, "create",
                          side_effect=Exception("stripe down")):
            assert referrals.grant_conversion_credit(converted, db) is False
        db.refresh(converted)
        assert converted.referral_credited_at is None   # retry-able later
    finally:
        db.close()
