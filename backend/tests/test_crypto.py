"""Token-encryption self-check (surfaced on /health).

'active' must mean the configured key genuinely encrypts AND decrypts — that's
what tells us, before a real seller connects, that encrypt_token won't 500 on
their token. These tests lock the status each (ENVIRONMENT, key) combination
produces, including the failure modes (missing/invalid key in production).
"""
from cryptography.fernet import Fernet

from backend.utils import crypto
from backend.utils.settings import settings


def test_selfcheck_active_with_valid_key_in_prod(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", Fernet.generate_key().decode())
    assert crypto.encryption_selfcheck() == "active"


def test_selfcheck_active_with_valid_key_outside_prod(monkeypatch):
    # A valid key works regardless of ENVIRONMENT — encryption is functional.
    monkeypatch.setattr(settings, "ENVIRONMENT", "development")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", Fernet.generate_key().decode())
    assert crypto.encryption_selfcheck() == "active"


def test_selfcheck_disabled_when_no_key_and_not_prod(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "development")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", "")
    assert crypto.encryption_selfcheck() == "disabled"


def test_selfcheck_error_on_missing_key_in_prod(monkeypatch):
    # This is the foot-gun: prod with no key — encrypt_token would raise.
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", "")
    assert crypto.encryption_selfcheck().startswith("error")


def test_selfcheck_error_on_invalid_key_in_prod(monkeypatch):
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", "not-a-valid-fernet-key")
    assert crypto.encryption_selfcheck().startswith("error")


def test_selfcheck_never_leaks_key_material(monkeypatch):
    key = Fernet.generate_key().decode()
    monkeypatch.setattr(settings, "ENVIRONMENT", "production")
    monkeypatch.setattr(settings, "TOKEN_ENC_KEY", key)
    assert key not in crypto.encryption_selfcheck()
