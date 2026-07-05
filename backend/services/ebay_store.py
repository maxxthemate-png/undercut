"""eBay store client for the repricer.

- get_active_listings: pull the seller's live listings (Trading GetMyeBaySelling)
- get_competitor_low: lowest competing price for a query (Buy Browse API)
- update_price: push a new price (Trading ReviseInventoryStatus)

Honors settings.EBAY_SANDBOX for all endpoints.
"""
import asyncio
import base64
import re
import statistics
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape as _xml_escape

import httpx


def _x(value) -> str:
    """XML-escape any value before interpolating it into a Trading API request
    body (token / item id / sku come from seller-controlled data — never trust)."""
    return _xml_escape("" if value is None else str(value))

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


class EbayApiError(Exception):
    """Raised when a seller Trading call fails (no response, unparseable, or
    Ack=Failure) so the caller can ALERT instead of silently treating it as
    'this seller has no listings' — the failure mode that would hide a broken
    auth/keyset behind an empty import."""


# App (client-credentials) token cache: minting one per Browse call added a
# ~300ms OAuth round-trip per listing per run. eBay app tokens live ~2h.
_APP_TOKEN_CACHE: dict = {}


class EbayStoreClient:
    def __init__(self, user_token: str | None = None, use_operator_token: bool = False):
        # NEVER silently fall back to the operator's token for per-store clients —
        # a store with a missing/unreadable token would read AND write the
        # OPERATOR's eBay account (cross-tenant). Only the admin selftest opts in.
        self.user_token = user_token or (settings.EBAY_USER_TOKEN if use_operator_token else None)
        self.app_id = settings.EBAY_APP_ID
        self.cert_id = settings.EBAY_CERT_ID
        self.dev_id = settings.EBAY_DEV_ID
        self._env = "sbx" if settings.EBAY_SANDBOX else "prod"

    def _is_oauth_token(self) -> bool:
        """eBay OAuth user tokens have the form 'v^1.1#...'. Legacy Auth'n'Auth
        tokens do not. The two require DIFFERENT transport (see _headers)."""
        return bool(self.user_token) and str(self.user_token).startswith("v^")

    def _headers(self, call: str) -> dict:
        h = {
            "X-EBAY-API-SITEID": "0",
            "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
            "X-EBAY-API-CALL-NAME": call,
            "X-EBAY-API-APP-NAME": self.app_id,
            "X-EBAY-API-CERT-NAME": self.cert_id,
            "X-EBAY-API-DEV-NAME": self.dev_id,
            "Content-Type": "text/xml",
        }
        # An OAuth token MUST be sent in the IAF header — NOT in the
        # <eBayAuthToken> XML element (that slot is for legacy Auth'n'Auth tokens
        # only). The one-click connect flow yields OAuth tokens, so without this
        # header eBay rejects every seller Trading call (import + price write).
        if self._is_oauth_token():
            h["X-EBAY-API-IAF-TOKEN"] = self.user_token
        return h

    def _requester_credentials(self) -> str:
        """The <RequesterCredentials> block for a Trading body. Populated ONLY for
        a legacy Auth'n'Auth token; for an OAuth token it must be omitted (the
        token rides in the IAF header instead) or eBay rejects the request."""
        if self.user_token and not self._is_oauth_token():
            return (f"<RequesterCredentials><eBayAuthToken>"
                    f"{_x(self.user_token)}</eBayAuthToken></RequesterCredentials>")
        return ""

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

    async def get_active_listings(self, limit: int = 200, max_pages: int = 50) -> list[dict]:
        """All active listings, paginated — page 1 only would silently drop
        everything past 200 items (a Scale seller has up to 10,000)."""
        out: list[dict] = []
        for page in range(1, max_pages + 1):
            body = f"""<?xml version="1.0" encoding="utf-8"?>
<GetMyeBaySellingRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  {self._requester_credentials()}
  <ActiveList>
    <Include>true</Include>
    <Pagination><EntriesPerPage>{limit}</EntriesPerPage><PageNumber>{page}</PageNumber></Pagination>
  </ActiveList>
</GetMyeBaySellingRequest>"""
            txt = await self._trading("GetMyeBaySelling", body)
            if not txt:
                raise EbayApiError("eBay returned no response (network error or rejected credentials)")
            try:
                root = ET.fromstring(txt)
            except Exception as e:
                raise EbayApiError(f"unparseable eBay response: {e}")
            ack = root.find(".//e:Ack", NS)
            if ack is not None and ack.text == "Failure":
                errs = [m.text for m in root.findall(".//e:Errors/e:LongMessage", NS) if m.text]
                raise EbayApiError("; ".join(errs) or "eBay rejected the GetMyeBaySelling request")
            items = root.findall(".//e:ActiveList/e:ItemArray/e:Item", NS)
            for it in items:
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
            more = root.find(".//e:ActiveList/e:PaginationResult/e:TotalNumberOfPages", NS)
            total_pages = int(more.text) if more is not None and more.text else 1
            if page >= total_pages or not items:
                break
        return out

    async def update_price(self, item_id: str, new_price: float, sku: str | None = None) -> dict:
        sku_xml = f"<SKU>{_x(sku)}</SKU>" if sku else ""
        body = f"""<?xml version="1.0" encoding="utf-8"?>
<ReviseInventoryStatusRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  {self._requester_credentials()}
  <InventoryStatus><ItemID>{_x(item_id)}</ItemID>{sku_xml}<StartPrice>{new_price:.2f}</StartPrice></InventoryStatus>
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

    async def trading_selftest(self) -> dict:
        """App-credential smoke test of the Trading API via GeteBayOfficialTime
        (no seller token needed). Confirms whether the configured keyset can reach
        and is authorized for the Trading API, and whether we're pointed at prod or
        sandbox — the two things we cannot otherwise verify without a real seller.
        Read the error codes: a missing/invalid-token error means the keyset is
        recognized (Trading access OK, just no user token); an app/credential error
        means the keyset itself is not authorized for Trading."""
        body = ('<?xml version="1.0" encoding="utf-8"?>'
                '<GeteBayOfficialTimeRequest xmlns="urn:ebay:apis:eBLBaseComponents">'
                f'{self._requester_credentials()}'
                '</GeteBayOfficialTimeRequest>')
        txt = await self._trading("GeteBayOfficialTime", body)
        out = {
            "env": self._env,
            "endpoint": _TRADING[self._env],
            "app_id_set": bool(self.app_id),
            "cert_id_set": bool(self.cert_id),
            "dev_id_set": bool(self.dev_id),
            "ru_name_set": bool(settings.EBAY_RU_NAME and "..." not in (settings.EBAY_RU_NAME or "")),
            "reached_ebay": bool(txt),
        }
        if not txt:
            out["verdict"] = "NO XML RESPONSE — endpoint unreachable or credentials rejected before a parseable reply."
            return out
        try:
            root = ET.fromstring(txt)
            ack = root.find(".//e:Ack", NS)
            ts = root.find(".//e:Timestamp", NS)
            out["ack"] = ack.text if ack is not None else None
            out["timestamp"] = ts.text if ts is not None else None
            out["errors"] = [
                {"code": (e.find("e:ErrorCode", NS).text if e.find("e:ErrorCode", NS) is not None else None),
                 "msg": (e.find("e:LongMessage", NS).text if e.find("e:LongMessage", NS) is not None else None)}
                for e in root.findall(".//e:Errors", NS)
            ]
        except Exception as ex:
            out["parse_error"] = str(ex)
        return out

    async def _app_token(self) -> str | None:
        import time as _t
        cached = _APP_TOKEN_CACHE.get(self._env)
        if cached and _t.time() < cached["exp"]:
            return cached["token"]
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
            data = r.json()
            token = data.get("access_token")
            if token:  # cache until 60s before expiry
                _APP_TOKEN_CACHE[self._env] = {
                    "token": token, "exp": _t.time() + int(data.get("expires_in", 7200)) - 60}
            return token
        except Exception as e:
            logger.warning("app token failed", error=str(e))
            return None

    async def _credible_lowest(self, query: str, limit: int, headers: dict,
                               category_id: str | None = None,
                               exclude_item_id: str | None = None) -> list[dict]:
        """Shared competitor-low core. A bare KEYWORD search returns a mix of the
        real product and cheap accessories that share the words, so: if the caller
        knows the item's category, constrain to it directly (1 call); otherwise
        constrain to the dominant category eBay reports for the query (mirroring the
        exact-item path). Then drop extreme low-price outliers below 20% of the
        matched-set median — so a $1 screen protector can't pose as the 'lowest
        price' of a $300 console. Returns credible listings, cheapest first."""
        async def _search(params: dict) -> dict:
            async with httpx.AsyncClient(timeout=20) as c:
                r = await c.get(_BROWSE[self._env], params=params, headers=headers)
            return r.json() if r.status_code == 200 else {}

        base = {"q": query, "sort": "price", "limit": limit}
        if category_id:                          # caller knows the category → one call
            data = await _search({**base, "category_ids": str(category_id)})
            summaries = data.get("itemSummaries") or []
        else:
            data = await _search(base)
            summaries = data.get("itemSummaries") or []
            dom = (data.get("refinement") or {}).get("dominantCategoryId")
            if dom:                              # re-pull within the bulk category
                cat = await _search({**base, "category_ids": str(dom)})
                if cat.get("itemSummaries"):
                    summaries = cat["itemSummaries"]

        rows = []
        for s in summaries:
            v = (s.get("price") or {}).get("value")
            if not v:
                continue
            # Exclude the seller's OWN listing — without this, a seller who is
            # already the cheapest sees themselves as "the competitor" and
            # ratchets down a cent per run until they hit their floor.
            if exclude_item_id and str(s.get("legacyItemId") or "") == str(exclude_item_id):
                continue
            rows.append({"title": s.get("title"), "price": float(v),
                         "condition": s.get("condition"), "url": s.get("itemWebUrl")})
        if not rows:
            return []
        med = statistics.median([r["price"] for r in rows])
        floor = med * 0.2
        credible = [r for r in rows if r["price"] >= floor] or rows
        credible.sort(key=lambda r: r["price"])
        return credible

    async def search_lowest(self, query: str, limit: int = 30, top: int = 5) -> dict:
        """Public price-checker (keyword) variant: lowest + count + the cheapest few
        listings, with accessory-outlier suppression (see _credible_lowest)."""
        token = await self._app_token()
        if not token:
            return {"lowest": None, "count": 0, "items": []}
        headers = {"Authorization": f"Bearer {token}", "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"}
        try:
            credible = await self._credible_lowest(query, limit, headers)
            if not credible:
                return {"lowest": None, "count": 0, "items": []}
            return {"lowest": credible[0]["price"], "count": len(credible),
                    "items": credible[:top]}
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

    async def get_competitor_low(self, query: str, limit: int = 30,
                                 category_id: str | None = None,
                                 exclude_item_id: str | None = None) -> dict:
        """Lowest competing price + count for a query via the Buy Browse API.
        Used by the live repricer (pass the listing's category_id for a direct,
        accurate, single-call lookup) and the price-tracker cron (keyword only →
        falls back to the dominant-category re-search). Same accessory-outlier
        suppression as the demo, so a $1 part can't drag a real listing to its
        floor or post a garbage tracker price."""
        token = await self._app_token()
        if not token:
            return {"lowest": None, "count": 0}
        headers = {"Authorization": f"Bearer {token}", "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"}
        try:
            credible = await self._credible_lowest(query, limit, headers, category_id=category_id,
                                                   exclude_item_id=exclude_item_id)
            return {"lowest": credible[0]["price"] if credible else None, "count": len(credible)}
        except Exception as e:
            logger.warning("competitor lookup failed", error=str(e))
            return {"lowest": None, "count": 0}
