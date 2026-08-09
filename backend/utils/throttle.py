"""In-process per-IP throttling for public endpoints.

Same approach proven in api/tools_routes.py: the api runs as a single web
instance, so an in-memory sliding window is sufficient and dependency-free.
"""
import time
from collections import deque

from fastapi import Request


def client_ip(request: Request) -> str:
    # Rightmost X-Forwarded-For hop: the one appended by OUR proxy (Render).
    # The leftmost entries are client-supplied and spoofable: trusting them
    # let a single attacker rotate fake IPs and bypass every throttle.
    fwd = request.headers.get("x-forwarded-for")
    return (fwd.split(",")[-1].strip() if fwd else None) or (
        request.client.host if request.client else "unknown"
    )


class IPThrottle:
    def __init__(self, limit: int, window_seconds: int, max_entries: int = 10_000):
        self.limit = limit
        self.window = window_seconds
        self.max_entries = max_entries
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
        if len(self._hits) > self.max_entries:
            self._evict(now)
        return False

    def _evict(self, now: float) -> None:
        """Bound memory once the table passes max_entries.

        The prune loop in over_limit only touches the ONE ip being checked, so
        every other ip keeps its timestamps forever. An earlier version dropped
        only entries whose deque was already empty, which is never true at that
        moment (the current ip just appended `now`, and no other entry is ever
        pruned), so nothing was ever evicted and the table grew without bound.

        This pass sweeps the whole table instead: any entry whose newest hit is
        older than the window can no longer affect a decision, so it is dropped.
        If that is not enough (a genuine flood of currently-active ips) fall back
        to dropping the least-recently-seen entries down to half of max_entries,
        which also keeps the sweep amortized: at least max_entries/2 new ips must
        arrive before the next full scan.
        """
        cutoff = now - self.window
        for k in [k for k, v in self._hits.items() if not v or v[-1] <= cutoff]:
            self._hits.pop(k, None)
        target = max(self.max_entries // 2, 1)
        if len(self._hits) > target:
            oldest_first = sorted(self._hits, key=lambda k: self._hits[k][-1])
            for k in oldest_first[: len(self._hits) - target]:
                self._hits.pop(k, None)
