"""The public, no-login demo engine — the surface cold paid traffic hits.

Covers parse_item_id parsing, the two demo endpoints (happy / bad-url / not-found
/ throttle / cache), with eBay mocked via the `fake_ebay` fixture in conftest.
"""
import pytest

from backend.services.ebay_store import EbayStoreClient


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
