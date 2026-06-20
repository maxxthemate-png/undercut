"""Constant-time comparison for API / admin / cron keys.

A plain `==` (or `in {set}`) on a secret leaks length + prefix-match timing.
`hmac.compare_digest` runs in constant time, closing that side-channel.
"""
import hmac


def key_ok(provided: str | None, *valid: str | None) -> bool:
    """True iff `provided` constant-time-equals one of the non-empty `valid` keys.
    Empty/None `provided` or no configured keys → always False (deny by default)."""
    p = (provided or "").strip()
    if not p:
        return False
    return any(bool(v) and hmac.compare_digest(p, v) for v in valid)
