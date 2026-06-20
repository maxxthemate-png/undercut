"""Security hardening: constant-time key compare + prod token-encryption guard."""
import pytest

from backend.utils.keys import key_ok
from backend.utils import crypto


def test_key_ok_matches_only_correct_nonempty_key():
    assert key_ok("abc", "abc") is True
    assert key_ok("abc", None, "abc") is True       # falls back across multiple valids
    assert key_ok(" abc ", "abc") is True           # provided is stripped
    assert key_ok("wrong", "abc") is False
    assert key_ok("", "abc") is False               # empty provided → deny
    assert key_ok(None, "abc") is False
    assert key_ok("abc") is False                   # no configured keys → deny
    assert key_ok("abc", None, "") is False         # only empty valids → deny


def test_token_encryption_is_noop_in_dev(monkeypatch):
    monkeypatch.setattr(crypto.settings, "ENVIRONMENT", "development")
    monkeypatch.setattr(crypto.settings, "TOKEN_ENC_KEY", None)
    # dev fallback: pass through unchanged, never raise
    assert crypto.encrypt_token("tok-123") == "tok-123"
    assert crypto.decrypt_token("tok-123") == "tok-123"


def test_token_encryption_refuses_plaintext_in_production(monkeypatch):
    monkeypatch.setattr(crypto.settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(crypto.settings, "TOKEN_ENC_KEY", None)
    with pytest.raises(RuntimeError):
        crypto.encrypt_token("seller-oauth-token")


def test_token_encryption_round_trips_with_valid_key(monkeypatch):
    from cryptography.fernet import Fernet
    monkeypatch.setattr(crypto.settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(crypto.settings, "TOKEN_ENC_KEY", Fernet.generate_key().decode())
    enc = crypto.encrypt_token("seller-oauth-token")
    assert enc != "seller-oauth-token"               # actually encrypted
    assert crypto.decrypt_token(enc) == "seller-oauth-token"
