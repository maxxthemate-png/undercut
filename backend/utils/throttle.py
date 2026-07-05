"""In-process per-IP throttling for public endpoints.

Same approach proven in api/tools_routes.py: the api runs as a single web
instance, so an in-memory sliding window is sufficient and dependency-free.
"""
import time
from collections import deque

from fastapi import Request


def client_ip(request: Request) -> str:
    # Rightmost X-Forwarded-For hop: the one appended by OUR proxy (Render).
    # The leftmost entries are client-supplied and spoofable — trusting them
    # let a single attacker rotate fake IPs and bypass every throttle.
    fwd = request.headers.get("x-forwarded-for")
    return (fwd.split(",")[-1].strip() if fwd else None) or (
        request.client.host if request.client else "unknown"
    )


class IPThrottle:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        self._hits: dict[str, deque] = {}

    def over_limit(self, ip: str) -> bool:
        """Record a hit; True if this IP has exceeded the limit in the window."""
        now = time.time()
        dq = self._hits.setdefault(ip, deque())
        while dq and now - dq[0] > self.window:
            dq.popleft()
        if len(dq) >= self.limit:
            return True
        dq.append(now)
        if len(self._hits) > 10_000:  # bound memory: drop idle IPs' empty windows
            for k in [k for k, v in self._hits.items() if not v][:5_000]:
                self._hits.pop(k, None)
        return False
