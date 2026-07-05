"""Auth lifecycle: reset-token single-use, session invalidation on password
change (pwv claim), and throttle IP extraction (XFF spoof resistance)."""
import uuid
from types import SimpleNamespace

from backend.models.database import SessionLocal
from backend.models.repricer_models import User
from backend.services import auth
from backend.utils.throttle import client_ip


def _signup(client, email, password="hunter2boat"):
    r = client.post("/api/auth/signup", json={"email": email, "password": password})
    assert r.status_code == 200, r.text
    return r.json()["token"]


def _user(email) -> User:
    db = SessionLocal()
    try:
        return db.query(User).filter(User.email == email).one()
    finally:
        db.close()


def test_reset_token_roundtrip_and_single_use(client):
    email = f"rt-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    reset = auth.make_reset_token(_user(email))

    r = client.post("/api/auth/reset-password", json={"token": reset, "password": "newpass123"})
    assert r.status_code == 200

    # new password works, old doesn't
    assert client.post("/api/auth/login", json={"email": email, "password": "newpass123"}).status_code == 200
    assert client.post("/api/auth/login", json={"email": email, "password": "hunter2boat"}).status_code == 401

    # the SAME reset token is spent — replay must fail
    r2 = client.post("/api/auth/reset-password", json={"token": reset, "password": "attacker99"})
    assert r2.status_code == 400


def test_password_change_kills_old_sessions(client):
    """Session JWTs carry a pwv hash-tail claim: resetting the password must
    invalidate every outstanding (possibly stolen) 30-day session token."""
    email = f"pv-{uuid.uuid4().hex[:8]}@example.com"
    old_session = _signup(client, email)
    assert client.get("/api/auth/me", headers={"Authorization": f"Bearer {old_session}"}).status_code == 200

    reset = auth.make_reset_token(_user(email))
    r = client.post("/api/auth/reset-password", json={"token": reset, "password": "newpass123"})
    assert r.status_code == 200
    new_session = r.json()["token"]

    assert client.get("/api/auth/me", headers={"Authorization": f"Bearer {old_session}"}).status_code == 401
    assert client.get("/api/auth/me", headers={"Authorization": f"Bearer {new_session}"}).status_code == 200


def test_oauth_state_rejected_as_reset_token(client):
    email = f"px-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    state = auth.make_oauth_state(_user(email).id)  # wrong purpose
    r = client.post("/api/auth/reset-password", json={"token": state, "password": "newpass123"})
    assert r.status_code == 400


def test_client_ip_uses_rightmost_xff_hop():
    """Leftmost XFF entries are attacker-supplied; the rightmost is appended by
    OUR proxy. Trusting the left let one attacker rotate unlimited fake IPs."""
    req = SimpleNamespace(headers={"x-forwarded-for": "6.6.6.6, 203.0.113.9"},
                          client=SimpleNamespace(host="10.0.0.1"))
    assert client_ip(req) == "203.0.113.9"
    req_none = SimpleNamespace(headers={}, client=SimpleNamespace(host="10.0.0.1"))
    assert client_ip(req_none) == "10.0.0.1"
