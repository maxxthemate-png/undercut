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


# --- passwordless (magic-link) flow ---

def test_signup_email_only_logs_in_instantly(client):
    email = f"pw-{uuid.uuid4().hex[:8]}@example.com"
    r = client.post("/api/auth/signup", json={"email": email})  # no password field
    assert r.status_code == 200, r.text
    d = r.json()
    assert d.get("token")               # brand-new account → instant session
    # and the session works
    assert client.get("/api/auth/me", headers={"Authorization": f"Bearer {d['token']}"}).status_code == 200


def test_signup_existing_email_does_not_hand_out_access(client):
    """Signing up with an email that already exists must NOT return a token
    (that would be account takeover) — it emails a sign-in link instead."""
    email = f"dup-{uuid.uuid4().hex[:8]}@example.com"
    first = client.post("/api/auth/signup", json={"email": email})
    assert first.json().get("token")
    second = client.post("/api/auth/signup", json={"email": email})
    assert second.status_code == 200, second.text
    d = second.json()
    assert d.get("token") is None
    assert d.get("check_email") is True


def test_request_login_link_never_enumerates(client):
    # unknown email still returns ok (no account enumeration)
    r = client.post("/api/auth/request-login-link", json={"email": f"nobody-{uuid.uuid4().hex[:6]}@example.com"})
    assert r.status_code == 200 and r.json().get("ok") is True


def test_login_with_token_roundtrip(client):
    email = f"ml-{uuid.uuid4().hex[:8]}@example.com"
    _signup(client, email)
    token = auth.make_login_token(_user(email))
    r = client.post("/api/auth/login-with-token", json={"token": token})
    assert r.status_code == 200, r.text
    assert r.json().get("token")        # exchanged for a real session
    # a reset token must NOT be accepted as a login token (purpose check)
    wrong = auth.make_reset_token(_user(email))
    assert client.post("/api/auth/login-with-token", json={"token": wrong}).status_code == 400
