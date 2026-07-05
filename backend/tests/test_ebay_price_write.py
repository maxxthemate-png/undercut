"""eBay price-write parsing + import pagination + own-listing exclusion.

update_price's Ack parsing decides whether the DB records a price change: a
false success means the dashboard lies about live prices; a false failure means
the repricer silently stops working. Pagination: page-1-only import silently
dropped everything past 200 listings.
"""
import asyncio

import pytest

from backend.services.ebay_store import EbayStoreClient

OAUTH = "v^1.1#i^1#f^0#r^0#I^3#p^1#t^Ul41Xzk6abcd"


def _client(monkeypatch, canned) -> EbayStoreClient:
    """canned: str, or callable(body)->str for per-request responses."""
    async def fake_trading(self, call, body, retries=3):
        return canned(body) if callable(canned) else canned
    monkeypatch.setattr(EbayStoreClient, "_trading", fake_trading)
    return EbayStoreClient(user_token=OAUTH)


def _revise_xml(ack: str, err: str | None = None) -> str:
    e = f"<Errors><LongMessage>{err}</LongMessage></Errors>" if err else ""
    return ('<?xml version="1.0"?><ReviseInventoryStatusResponse '
            f'xmlns="urn:ebay:apis:eBLBaseComponents"><Ack>{ack}</Ack>{e}'
            '</ReviseInventoryStatusResponse>')


def test_update_price_success():
    pass  # placeholder keeps the pattern below symmetric


@pytest.mark.parametrize("ack", ["Success", "Warning"])
def test_update_price_ack_success_and_warning_are_success(monkeypatch, ack):
    c = _client(monkeypatch, _revise_xml(ack))
    res = asyncio.run(c.update_price("110000000001", 19.99))
    assert res == {"success": True}


def test_update_price_ack_failure_is_failure_with_error(monkeypatch):
    c = _client(monkeypatch, _revise_xml("Failure", "Item cannot be revised."))
    res = asyncio.run(c.update_price("110000000001", 19.99))
    assert res["success"] is False
    assert "cannot be revised" in res["error"]


def test_update_price_no_response_is_failure(monkeypatch):
    c = _client(monkeypatch, "")
    res = asyncio.run(c.update_price("110000000001", 19.99))
    assert res["success"] is False


def _selling_page(item_ids, total_pages) -> str:
    items = "".join(
        f"<Item><ItemID>{i}</ItemID><Title>W</Title>"
        f"<SellingStatus><CurrentPrice>9.99</CurrentPrice></SellingStatus>"
        f"<Quantity>1</Quantity></Item>" for i in item_ids)
    return ('<?xml version="1.0"?><GetMyeBaySellingResponse '
            'xmlns="urn:ebay:apis:eBLBaseComponents"><Ack>Success</Ack>'
            f'<ActiveList><ItemArray>{items}</ItemArray>'
            f'<PaginationResult><TotalNumberOfPages>{total_pages}</TotalNumberOfPages></PaginationResult>'
            '</ActiveList></GetMyeBaySellingResponse>')


def test_import_paginates_past_page_one(monkeypatch):
    def by_page(body: str) -> str:
        if "<PageNumber>1</PageNumber>" in body:
            return _selling_page(["1101", "1102"], total_pages=2)
        return _selling_page(["1103"], total_pages=2)
    items = asyncio.run(_client(monkeypatch, by_page).get_active_listings())
    assert [i["ebay_item_id"] for i in items] == ["1101", "1102", "1103"]


def test_import_single_page_stops_at_one(monkeypatch):
    calls = {"n": 0}
    def once(body: str) -> str:
        calls["n"] += 1
        return _selling_page(["1101"], total_pages=1)
    items = asyncio.run(_client(monkeypatch, once).get_active_listings())
    assert len(items) == 1 and calls["n"] == 1


# --- own-listing exclusion: the live repricer must never treat the seller's own
# listing as "the competitor" (self-undercut spiral to the floor) ---

class _FakeResp:
    status_code = 200
    def __init__(self, data): self._d = data
    def json(self): return self._d


def test_get_competitor_low_excludes_own_listing(monkeypatch):
    summaries = [
        {"legacyItemId": "MYITEM", "price": {"value": "10.00"}, "title": "mine"},
        {"legacyItemId": "OTHER", "price": {"value": "12.00"}, "title": "rival"},
    ]

    async def fake_token(self): return "tok"
    monkeypatch.setattr(EbayStoreClient, "_app_token", fake_token)

    class _FakeAsyncClient:
        def __init__(self, *a, **k): pass
        async def __aenter__(self): return self
        async def __aexit__(self, *a): return False
        async def get(self, *a, **k): return _FakeResp({"itemSummaries": summaries})

    import backend.services.ebay_store as es
    monkeypatch.setattr(es.httpx, "AsyncClient", _FakeAsyncClient)

    c = EbayStoreClient()
    with_excl = asyncio.run(c.get_competitor_low("widget", category_id="1", exclude_item_id="MYITEM"))
    assert with_excl["lowest"] == 12.00  # own $10 listing ignored
    without = asyncio.run(c.get_competitor_low("widget", category_id="1"))
    assert without["lowest"] == 10.00    # sanity: exclusion is what changed it
