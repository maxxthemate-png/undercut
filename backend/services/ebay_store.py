"""eBay store client for the repricer.

- get_active_listings: pull the seller's live listings (Trading GetMyeBaySelling)
- get_competitor_low: lowest competing price for a query (Buy Browse API)
- update_price: push a new price (Trading ReviseInventoryStatus)

Honors settings.EBAY_SANDBOX for all endpoints.
"""
import asyncio
import base64
import re
import xml.etree.ElementTree as ET

import httpx

from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)
NS = {"e": "urn:ebay:apis:eBLBaseComponents"}

_TRADING = {"prod": "https://api.ebay.com/ws/api.dll",
            "sbx": "https://api.sandbox.ebay.com/ws/api.dll"}
_OAUTH = {"prod": "https://api.ebay.com/identity/v1/oauth2/token",
          "sbx": "https://api.sandbox.ebay.com/identity/v1/oauth2/token"}
_BROWSE = {"prod": "https://api.ebay.com/buy/browse/v1/item_summary/search",
           "sbx": "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search"}
_BROWSE_ITEM = {"prod": "https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id",
                "sbx": "https://api.sandbox.ebay.com/buy/browse/v1/item/get_item_by_legacy_id"}


class EbayStoreClient:
    def __init__(self, user_token: str | None = None):
        self.user_token = user_token or settings.EBAY_USER_TOKEN
        self.app_id = settings.EBAY_APP_ID
        self.cert_id = settings.EBAY_CERT_ID
        self.dev_id = settings.EBAY_DEV_ID
        self._env = "sbx" if settings.EBAY_SANDBOX else "prod"

    def _headers(self, call: str) -> dict:
        return {
            "X-EBAY-API-SITEID": "0",
            "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
            "X-EBAY-API-CALL-NAME": call,
            "X-EBAY-API-APP-NAME": self.app_id,
            "X-EBAY-API-CERT-NAME": self.cert_id,
            "X-EBAY-API-DEV-NAME": self.dev_id,
            "Content-Type": "text/xml",
        }

    async def _trading(self, call: str, body: str, retries: int = 3) -> str:
        """POST to Trading API; retry transient non-XML edge errors."""
        for attempt in range(retries):
            try:
                async with httpx.AsyncClient(timeout=30) as c:
                    r = await c.post(_TRADING[self._env], content=body, headers=self._headers(call))
                if r.text.lstrip().startswith("<?xml"):
                    return r.text
            except Exception as e:
                logger.warning("trading call error", call=call, error=str(e))
            await asyncio.sleep(1.5 * (attempt + 1))
        logger.error("trading call failed", call=call)
        return ""

    async def get_active_listings(self, limit: int = 200) -> list[dict]:
        body = f"""<?xml version="1.0" encoding="utf-8"?>
<GetMyeBaySellingRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>{self.user_token}</eBayAuthToken></RequesterCredentials>
  <ActiveList>
    <Include>true</Include>
    <Pagination><EntriesPerPage>{limit}</EntriesPerPage><PageNumber>1</PageNumber></Pagination>
  </ActiveList>
</GetMyeBaySellingRequest>"""
        txt = await self._trading("GetMyeBaySelling", body)
        out: list[dict] = []
        if not txt:
            return out
        try:
            root = ET.fromstring(txt)
        except Exception:
            return out
        for it in root.findall(".//e:ActiveList/e:ItemArray/e:Item", NS):
            def g(path):
                el = it.find(path, NS)
                return el.text if el is not None else None
            price = (g(".//e:SellingStatus/e:CurrentPrice") or g(".//e:BuyItNowPrice")
                     or g(".//e:StartPrice"))
            out.append({
                "ebay_item_id": g("e:ItemID"),
                "title": g("e:Title"),
                "sku": g("e:SKU"),
                "category_id": g(".//e:PrimaryCategory/e:CategoryID"),
                "price": float(price) if price else None,
                "quantity": int(g(".//e:Quantity") or 0),
            })
        return out

    async def update_price(self, item_id: str, new_price: float, sku: str | None = None) -> dict:
        sku_xml = f"<SKU>{sku}</SKU>" if sku else ""
        body = f"""<?xml version="1.0" encoding="utf-8"?>
<ReviseInventoryStatusRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>{self.user_token}</eBayAuthToken></RequesterCredentials>
  <InventoryStatus><ItemID>{item_id}</ItemID>{sku_xml}<StartPrice>{new_price:.2f}</StartPrice></InventoryStatus>
</ReviseInventoryStatusRequest>"""
        txt = await self._trading("ReviseInventoryStatus", body)
        if not txt:
            return {"success": False, "error": "no response"}
        try:
            root = ET.fromstring(txt)
            ack = root.find(".//e:Ack", NS)
            if ack is not None and ack.text in ("Success", "Warning"):
                return {"success": True}
            errs = [e.text for e in root.findall(".//e:Errors/e:LongMessage", NS) if e.text]
            return {"success": False, "error": "; ".join(errs) or "unknown"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    async def _app_token(self) -> str | None:
        cred = base64.b64encode(f"{self.app_id}:{self.cert_id}".encode()).decode()
        try:
            async with httpx.AsyncClient(timeout=20) as c:
                r = await c.post(
                    _OAUTH[self._env],
                    headers={"Authorization": f"Basic {cred}",
                             "Content-Type": "application/x-www-form-urlencoded"},
                    data={"grant_type": "client_credentials",
                          "scope": "https://api.ebay.com/oauth/api_scope"},
                )
            return r.json().get("access_token")
        except Exception as e:
            logger.warning("app token failed", error=str(e))
            return None

    async def search_lowest(self, query: str, limit: int = 30, top: int = 5) -> dict:
        """Public price-checker variant of get_competitor_low: lowest + count +
        the cheapest few live listings (title/price/condition/link)."""
        token = await self._app_token()
        if not token:
            return {"lowest": None, "count": 0, "items": []}
        try:
            async with httpx.AsyncClient(timeout=20) as c:
                r = await c.get(
                    _BROWSE[self._env],
                    params={"q": query, "sort": "price", "limit": limit},
                    headers={"Authorization": f"Bearer {token}",
                             "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"},
                )
            data = r.json()
            items, prices = [], []
            for s in data.get("itemSummaries", []) or []:
                v = (s.get("price") or {}).get("value")
                if not v:
                    continue
                prices.append(float(v))
                if len(items) < top:
                    items.append({
                        "title": s.get("title"),
                        "price": float(v),
                        "condition": s.get("condition"),
                        "url": s.get("itemWebUrl"),
                    })
            return {"lowest": min(prices) if prices else None,
                    "count": len(prices), "items": items}
        except Exception as e:
            logger.warning("price check lookup failed", query=query, error=str(e))
            return {"lowest": None, "count": 0, "items": []}

    @staticmethod
    def parse_item_id(url_or_id: str) -> str | None:
        """Extract a numeric eBay (legacy) item id from a listing URL or raw id."""
        s = (url_or_id or "").strip()
        if not s:
            return None
        m = re.search(r"/itm/(?:[^/?#]*/)?(\d{9,15})(?:\D|$)", s)  # /itm/Title/12345 (anchored so a longer digit run isn't truncated mid-id)
        if m:
            return m.group(1)
        m = re.search(r"[?&](?:item|epid|itm)=(\d{9,15})", s)    # ?item=12345
        if m:
            return m.group(1)
        if re.fullmatch(r"\d{9,15}", s):                          # bare id
            return s
        m = re.search(r"(\d{11,15})", s)                          # last resort: long digit run
        return m.group(1) if m else None

    async def lookup_item_comps(self, legacy_id: str, top: int = 5) -> dict:
        """Resolve ONE eBay item by legacy id, then find the lowest comparable
        competitor WITHIN that item's category (so we compare apples to apples,
        not a $850 set against $1 parts that share a keyword). Powers the demo."""
        token = await self._app_token()
        if not token:
            return {"item": None, "lowest": None, "count": 0, "items": []}
        headers = {"Authorization": f"Bearer {token}", "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"}
        try:
            async with httpx.AsyncClient(timeout=20) as c:
                ir = await c.get(_BROWSE_ITEM[self._env],
                                 params={"legacy_item_id": legacy_id}, headers=headers)
            if ir.status_code != 200:
                return {"item": None, "lowest": None, "count": 0, "items": [], "error": "item_not_found"}
            idata = ir.json()
            iprice = (idata.get("price") or {}).get("value")
            item = {
                "title": idata.get("title"),
                "price": float(iprice) if iprice else None,
                "condition": idata.get("condition"),
                "url": idata.get("itemWebUrl"),
            }
            cat = idata.get("categoryId")
            if not cat and idata.get("categoryIdPath"):
                cat = idata["categoryIdPath"].split("|")[-1]
            self_id = str(idata.get("legacyItemId") or legacy_id)
            q = " ".join((idata.get("title") or "").split()[:8])

            async def _search(use_cat: bool) -> dict:
                params = {"q": q, "sort": "price", "limit": 40}
                if use_cat and cat:
                    params["category_ids"] = str(cat)
                async with httpx.AsyncClient(timeout=20) as c:
                    sr = await c.get(_BROWSE[self._env], params=params, headers=headers)
                return sr.json() if sr.status_code == 200 else {}

            sdata = await _search(use_cat=True)
            summaries = sdata.get("itemSummaries") or []
            if not summaries:                       # category too narrow / rejected → retry open
                sdata = await _search(use_cat=False)
                summaries = sdata.get("itemSummaries") or []

            items, prices = [], []
            for s in summaries:
                v = (s.get("price") or {}).get("value")
                if not v:
                    continue
                if str(s.get("legacyItemId") or "") == self_id:   # skip the seller's own listing
                    continue
                prices.append(float(v))
                if len(items) < top:
                    items.append({"title": s.get("title"), "price": float(v),
                                  "condition": s.get("condition"), "url": s.get("itemWebUrl")})
            return {"item": item, "lowest": min(prices) if prices else None,
                    "count": len(prices), "items": items}
        except Exception as e:
            logger.warning("item lookup failed", legacy_id=legacy_id, error=str(e))
            return {"item": None, "lowest": None, "count": 0, "items": [], "error": "lookup_failed"}

    async def get_competitor_low(self, query: str, limit: int = 30) -> dict:
        """Lowest competing price + count for a query via the Buy Browse API."""
        token = await self._app_token()
        if not token:
            return {"lowest": None, "count": 0}
        try:
            async with httpx.AsyncClient(timeout=20) as c:
                r = await c.get(
                    _BROWSE[self._env],
                    params={"q": query, "sort": "price", "limit": limit},
                    headers={"Authorization": f"Bearer {token}",
                             "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"},
                )
            data = r.json()
            prices = []
            for s in data.get("itemSummaries", []) or []:
                v = (s.get("price") or {}).get("value")
                if v:
                    prices.append(float(v))
            return {"lowest": min(prices) if prices else None, "count": len(prices)}
        except Exception as e:
            logger.warning("competitor lookup failed", error=str(e))
            return {"lowest": None, "count": 0}
