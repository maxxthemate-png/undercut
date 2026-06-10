"""Public, unauthenticated endpoints powering free lead-magnet tools.

In-process cache + per-IP throttle (the api runs as a single web instance) so
the free price checker can't burn the eBay Browse quota or get scripted.
"""
import time
from collections import deque

from fastapi import APIRouter, HTTPException, Query, Request

from ..services.ebay_store import EbayStoreClient
from ..utils.logging import get_logger

logger = get_logger(__name__)

public_router = APIRouter(prefix="/api/tools", tags=["tools"])

_CACHE: dict[str, tuple[float, dict]] = {}   # query -> (fetched_at, payload)
_HITS: dict[str, deque] = {}                 # ip -> recent request timestamps
CACHE_TTL = 900          # 15 min — competitor lows don't move faster than we reprice
RATE_LIMIT, RATE_WINDOW = 8, 60
_CACHE_MAX = 500


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    return (fwd.split(",")[0].strip() if fwd else None) or (
        request.client.host if request.client else "unknown"
    )


def _throttled(ip: str) -> bool:
    now = time.time()
    dq = _HITS.setdefault(ip, deque())
    while dq and now - dq[0] > RATE_WINDOW:
        dq.popleft()
    if len(dq) >= RATE_LIMIT:
        return True
    dq.append(now)
    return False


@public_router.get("/price-check")
async def price_check(request: Request, q: str = Query(min_length=3, max_length=80)):
    """Lowest live eBay price + cheapest listings for a product query."""
    if _throttled(_client_ip(request)):
        raise HTTPException(429, "Too many checks — try again in a minute.")

    key = " ".join(q.lower().split())
    hit = _CACHE.get(key)
    if hit and time.time() - hit[0] < CACHE_TTL:
        return hit[1]

    result = await EbayStoreClient().search_lowest(key)
    if result["lowest"] is None and not result["count"]:
        # Don't cache transient failures/empties for the full TTL
        return {"query": key, **result}

    payload = {"query": key, **result}
    if len(_CACHE) >= _CACHE_MAX:
        _CACHE.pop(next(iter(_CACHE)))
    _CACHE[key] = (time.time(), payload)
    return payload
