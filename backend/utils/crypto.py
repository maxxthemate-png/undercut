"""Symmetric encryption for secrets stored at rest — seller eBay OAuth tokens.

Fernet (AES-128-CBC + HMAC) keyed by settings.TOKEN_ENC_KEY. Designed as a safe,
zero-migration drop-in:
  - null-safe: empty/None pass through unchanged
  - key-optional: if no key is configured, values pass through (dev fallback)
  - legacy-tolerant: a value that isn't valid ciphertext (e.g. an existing
    plaintext token) is returned unchanged on decrypt, so old rows keep working
    while new writes are encrypted.
"""
from cryptography.fernet import Fernet

from .settings import settings


def _is_prod() -> bool:
    return (settings.ENVIRONMENT or "").lower() == "production"


def _fernet():
    key = settings.TOKEN_ENC_KEY
    if not key:
        # In production, refuse to silently store seller OAuth (sell.inventory WRITE)
        # tokens in plaintext. Dormant in dev/test (ENVIRONMENT != production).
        if _is_prod():
            raise RuntimeError(
                "TOKEN_ENC_KEY is unset in production — refusing to handle seller "
                "OAuth tokens without encryption. Set a valid Fernet key at the "
                "Render service level (python -c \"from cryptography.fernet import "
                "Fernet; print(Fernet.generate_key().decode())\")."
            )
        return None
    try:
        return Fernet(key.encode() if isinstance(key, str) else key)
    except Exception:
        if _is_prod():
            raise RuntimeError("TOKEN_ENC_KEY is set but is not a valid Fernet key.")
        return None


def encrypt_token(value):
    """Encrypt a token for storage. No-op if value is empty or no key is configured."""
    if not value:
        return value
    f = _fernet()
    if not f:
        return value
    return f.encrypt(value.encode()).decode()


def decrypt_token(value):
    """Decrypt a stored token. Returns the value unchanged if it isn't valid
    ciphertext (legacy plaintext) or no key is configured."""
    if not value:
        return value
    f = _fernet()
    if not f:
        return value
    try:
        return f.decrypt(value.encode()).decode()
    except Exception:
        return value
