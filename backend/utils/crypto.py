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


def _fernet():
    key = settings.TOKEN_ENC_KEY
    if not key:
        return None
    try:
        return Fernet(key.encode() if isinstance(key, str) else key)
    except Exception:
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
