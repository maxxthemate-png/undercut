"""The public, no-login demo engine — the surface cold paid traffic hits.

Covers parse_item_id parsing, the two demo endpoints (happy / bad-url / not-found
/ throttle / cache), with eBay mocked via the `fake_ebay` fixture in conftest.
"""
import asyncio

import pytest

import backend.services.ebay_store as es
from backend.services.ebay_store import EbayStoreClient


# ---- search_lowest keyword outlier suppression (real method, httpx mocked) ----
def _fake_browse(monkeypatch, router):
    """Replace EbayStoreClient._app_token + httpx.AsyncClient so search_lowest runs
    its real logic against canned Browse JSON. `router(params)->payload`."""
    async def _tok(self):
        return "tok"
    monkeypatch.setattr(es.EbayStoreClient, "_app_token", _tok)

    class _Resp:
        status_code = 200
        def __init__(self, p):
            self._p = p
        def json(self):
            return self._p

    class _Client:
        def __init__(self, *a, **k):
            pass
        async def __aenter__(self):
            return self
        async def __aexit__(self, *a):
            return False
        async def get(self, url, params=None, headers=None):
            return _Resp(router(params or {}))

    monkeypatch.setattr(es.httpx, "AsyncClient", _Client)


def _summaries(prices):
    return {"itemSummaries": [{"price": {"value": str(p)}, "title": f"x {p}",
                               "condition": "Used", "itemWebUrl": "u"} for p in prices]}


def test_search_lowest_constrains_to_dominant_category(monkeypatch):
    # Keyword pulls a $1.27 accessory among $300 consoles + a dominant category;
    # the category re-search returns consoles only → lowest is a console, not $1.27.
    def router(params):
        if params.get("category_ids"):
            return _summaries([299.0, 305.0, 310.0, 315.0])
        return {**_summaries([1.27, 299.0, 305.0, 310.0, 315.0]),
                "refinement": {"dominantCategoryId": "139971"}}
    _fake_browse(monkeypatch, router)
    res = asyncio.run(EbayStoreClient().search_lowest("nintendo switch oled console"))
    assert res["lowest"] == 299.0, res
    assert all(it["price"] >= 100 for it in res["items"]), res  # accessory not shown


def test_search_lowest_outlier_guard_without_category(monkeypatch):
    # No refinement → no re-search; the median*0.2 guard must still drop the $1.27.
    def router(params):
        return _summaries([1.27, 300.0, 305.0, 310.0])
    _fake_browse(monkeypatch, router)
    res = asyncio.run(EbayStoreClient().search_lowest("widget thing"))
    assert res["lowest"] == 300.0, res


def test_search_lowest_keeps_genuinely_cheap_commodity(monkeypatch):
    # A tight cluster of cheap items (no outlier) must NOT be over-filtered.
    def router(params):
        return _summaries([4.50, 4.75, 5.00, 5.25])
    _fake_browse(monkeypatch, router)
    res = asyncio.run(EbayStoreClient().search_lowest("phone screen protector"))
    assert res["lowest"] == 4.50, res


def test_competitor_low_with_category_is_single_constrained_call(monkeypatch):
    # The repricer passes the listing's category → one direct constrained call,
    # no dominant re-search, and the $1.27 accessory (only in the un-constrained
    # set) never reaches the result.
    seen = {"category_calls": 0, "base_calls": 0}
    def router(params):
        if params.get("category_ids"):
            seen["category_calls"] += 1
            return _summaries([299.0, 305.0, 310.0])
        seen["base_calls"] += 1
        return _summaries([1.27, 299.0, 305.0, 310.0])
    _fake_browse(monkeypatch, router)
    res = asyncio.run(EbayStoreClient().get_competitor_low("nintendo switch", category_id="139971"))
    assert res["lowest"] == 299.0, res
    assert seen["category_calls"] == 1 and seen["base_calls"] == 0, seen  # no perf-doubling


def test_competitor_low_keyword_suppresses_accessory(monkeypatch):
    # The tracker cron (keyword only) → dominant-category re-search kills the $0.99
    # accessory that used to post as "PS5 $0.99" on the public price-tracker pages.
    def router(params):
        if params.get("category_ids"):
            return _summaries([299.0, 305.0])
        return {**_summaries([0.99, 299.0, 305.0]), "refinement": {"dominantCategoryId": "139971"}}
    _fake_browse(monkeypatch, router)
    res = asyncio.run(EbayStoreClient().get_competitor_low("ps5 console"))
    assert res["lowest"] == 299.0, res


# ---- parse_item_id (pure static method, no network) -----------------------
@pytest.mark.parametrize("raw,expected", [
    ("https://www.ebay.com/itm/Some-Title/123456789012", "123456789012"),
    ("https://www.ebay.com/itm/123456789012", "123456789012"),
    ("https://www.ebay.com/itm/123456789012?_trkparms=abc", "123456789012"),
    ("https://www.ebay.com/itm/123456789012/", "123456789012"),
    ("https://www.ebay.com/p/x?item=123456789012", "123456789012"),
    ("123456789012", "123456789012"),
    ("", None),
    ("not an ebay link at all", None),
    ("https://example.com/", None),
])
def test_parse_item_id(raw, expected):
    assert EbayStoreClient.parse_item_id(raw) == expected


# ---- /api/tools/price-check (keyword fallback) ----------------------------
def test_price_check_happy(client, fake_ebay):
    r = client.get("/api/tools/price-check?q=widget")
    assert r.status_code == 200
    body = r.json()
    assert body["query"] == "widget"
    assert body["lowest"] == 19.99
    assert body["count"] == 3
    assert fake_ebay["search_lowest"] == 1


def test_price_check_caches_second_call(client, fake_ebay):
    client.get("/api/tools/price-check?q=widget")
    client.get("/api/tools/price-check?q=widget")
    # 2nd identical query served from the in-process cache → eBay hit only once.
    assert fake_ebay["search_lowest"] == 1


def test_price_check_rejects_too_short(client, fake_ebay):
    # q has min_length=3 → FastAPI validation 422, no eBay call.
    r = client.get("/api/tools/price-check?q=ab")
    assert r.status_code == 422
    assert fake_ebay["search_lowest"] == 0


# ---- /api/tools/listing-check (exact-item demo) ---------------------------
def test_listing_check_happy(client, fake_ebay):
    r = client.get("/api/tools/listing-check?url=https://www.ebay.com/itm/123456789012")
    assert r.status_code == 200
    body = r.json()
    assert body["item"]["title"] == "Widget"
    assert body["lowest"] == 19.99
    assert fake_ebay["lookup_item_comps"] == 1


def test_listing_check_bad_url(client, fake_ebay):
    r = client.get("/api/tools/listing-check?url=https://example.com/no-item-here")
    assert r.status_code == 400
    # never reached the eBay call — parse_item_id returned None first
    assert fake_ebay["lookup_item_comps"] == 0


def test_listing_check_item_not_found(client, monkeypatch):
    async def none_item(self, legacy_id, top=5):
        return {"item": None, "lowest": None, "count": 0, "items": [], "error": "item_not_found"}
    monkeypatch.setattr(EbayStoreClient, "lookup_item_comps", none_item)
    r = client.get("/api/tools/listing-check?url=https://www.ebay.com/itm/123456789012")
    assert r.status_code == 404


# ---- throttle (per-IP, RATE_LIMIT=8 / 60s) --------------------------------
def test_price_check_throttles_after_limit(client, fake_ebay):
    last = None
    for _ in range(9):
        last = client.get("/api/tools/price-check?q=throttle-probe")
    assert last.status_code == 429
