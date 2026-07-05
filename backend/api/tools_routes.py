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
    # Rightmost XFF hop = appended by our proxy; leftmost is client-spoofable.
    fwd = request.headers.get("x-forwarded-for")
    return (fwd.split(",")[-1].strip() if fwd else None) or (
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


@public_router.get("/price-history")
def price_history(request: Request, slug: str = Query(min_length=2, max_length=80)):
    """Daily snapshots for a tracked product — powers the public price-tracker charts."""
    if _throttled(_client_ip(request)):
        raise HTTPException(429, "Too many requests — try again in a minute.")
    from ..utils.tracked_products import TRACKED_PRODUCTS
    if slug not in TRACKED_PRODUCTS:
        raise HTTPException(404, "unknown product")
    from datetime import datetime, timedelta
    from sqlalchemy import select
    from ..models.database import SessionLocal
    from ..models.repricer_models import ProductPriceSnapshot
    db = SessionLocal()
    try:
        rows = db.scalars(
            select(ProductPriceSnapshot)
            .where(ProductPriceSnapshot.slug == slug,
                   ProductPriceSnapshot.captured_at >= datetime.utcnow() - timedelta(days=35))
            .order_by(ProductPriceSnapshot.captured_at)).all()
        return {"slug": slug, "history": [
            {"date": r.captured_at.strftime("%m/%d") if r.captured_at else None,
             "lowest": r.lowest, "count": r.listing_count} for r in rows]}
    finally:
        db.close()


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


@public_router.get("/listing-check")
async def listing_check(request: Request, url: str = Query(min_length=5, max_length=400)):
    """Exact-item demo: resolve ONE eBay listing (URL or id) and find the lowest
    comparable competitor in its own category. Accurate, unlike keyword matching."""
    if _throttled(_client_ip(request)):
        raise HTTPException(429, "Too many checks — try again in a minute.")

    item_id = EbayStoreClient.parse_item_id(url)
    if not item_id:
        raise HTTPException(400, "Couldn't read an eBay item from that — paste a full listing URL (the one with /itm/...).")

    key = f"listing:{item_id}"
    hit = _CACHE.get(key)
    if hit and time.time() - hit[0] < CACHE_TTL:
        return hit[1]

    result = await EbayStoreClient().lookup_item_comps(item_id)
    if not result.get("item"):
        # Don't cache failures; surface a clear message
        raise HTTPException(404, "Couldn't find that eBay item — check the link is a live listing.")

    payload = {"item_id": item_id, **result}
    if len(_CACHE) >= _CACHE_MAX:
        _CACHE.pop(next(iter(_CACHE)))
    _CACHE[key] = (time.time(), payload)
    return payload
