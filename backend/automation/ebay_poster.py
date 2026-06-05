"""
ListingArb — eBay Motors Platform Poster
Uses eBay Trading API to post vehicle/equipment listings.

Robust posting: resolves a leaf category via GetSuggestedCategories, then
adaptively fills any item specifics eBay reports as missing and retries AddItem.
"""

import asyncio
import re
import xml.etree.ElementTree as ET
import httpx
from datetime import datetime
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)

# Production vs Sandbox endpoint — chosen at call time via settings.EBAY_SANDBOX
EBAY_TRADING_API_URL = "https://api.ebay.com/ws/api.dll"
EBAY_TRADING_API_URL_SANDBOX = "https://api.sandbox.ebay.com/ws/api.dll"

NS = {"ebay": "urn:ebay:apis:eBLBaseComponents"}

# Fallback parent categories per type
EBAY_CATEGORIES = {
    "RV": "50054", "boat": "26429", "trailer": "17056",
    "classic car": "6001", "heavy equipment": "97994",
}
# Query used to resolve a real LEAF category per type via GetSuggestedCategories
CATEGORY_QUERY = {
    "RV": "rv camper motorhome", "boat": "boat", "trailer": "utility trailer",
    "classic car": "classic car", "heavy equipment": "heavy equipment excavator",
}


class EbayMotorsPoster:
    """Posts listings to eBay using the official Trading API (sandbox or production)."""

    def __init__(self):
        self.app_id = settings.EBAY_APP_ID
        self.cert_id = settings.EBAY_CERT_ID
        self.dev_id = settings.EBAY_DEV_ID
        self.user_token = settings.EBAY_USER_TOKEN

    @property
    def api_url(self) -> str:
        return EBAY_TRADING_API_URL_SANDBOX if settings.EBAY_SANDBOX else EBAY_TRADING_API_URL

    def _host(self) -> str:
        return "www.sandbox.ebay.com" if settings.EBAY_SANDBOX else "www.ebay.com"

    def _get_headers(self, call_name: str) -> dict:
        return {
            "X-EBAY-API-SITEID": "0",
            "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
            "X-EBAY-API-CALL-NAME": call_name,
            "X-EBAY-API-APP-NAME": self.app_id,
            "X-EBAY-API-CERT-NAME": self.cert_id,
            "X-EBAY-API-DEV-NAME": self.dev_id,
            "Content-Type": "text/xml",
        }

    async def _call(self, call_name: str, body: str, retries: int = 4) -> str:
        """POST to the Trading API. eBay's edge (esp. sandbox) intermittently returns
        an HTML 'Service Unavailable' page instead of XML; retry those with backoff so a
        transient blip doesn't cascade into a non-leaf-category fallback / failed post."""
        last = ""
        for attempt in range(retries):
            try:
                async with httpx.AsyncClient(timeout=30) as client:
                    resp = await client.post(self.api_url, content=body,
                                             headers=self._get_headers(call_name))
                text = resp.text
            except Exception as e:  # network blip — also transient
                last = f"<network error: {e}>"
                text = ""
            if text.lstrip().startswith("<?xml"):
                return text
            last = text or last
            if attempt < retries - 1:
                logger.warning("eBay transient non-XML response; retrying",
                               call=call_name, attempt=attempt + 1)
                await asyncio.sleep(2 * (attempt + 1))
        logger.error("eBay call failed after retries (edge unavailable)", call=call_name)
        return last

    async def resolve_leaf_category(self, query: str, fallback: str) -> str:
        """Resolve a LEAF category id for a search query via GetSuggestedCategories."""
        body = f"""<?xml version="1.0" encoding="utf-8"?>
<GetSuggestedCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>{self.user_token}</eBayAuthToken></RequesterCredentials>
  <Query>{self._escape_xml(query)}</Query>
</GetSuggestedCategoriesRequest>"""
        try:
            root = ET.fromstring(await self._call("GetSuggestedCategories", body))
            cat = root.find(".//ebay:SuggestedCategory/ebay:Category/ebay:CategoryID", NS)
            if cat is not None and cat.text:
                logger.info("resolved leaf category", query=query, category_id=cat.text)
                return cat.text
        except Exception as e:
            logger.warning("category resolution failed", query=query, error=str(e))
        return fallback

    @staticmethod
    def _derive_specific(name: str, title: str) -> str:
        """Best-effort value for a required item specific eBay demands."""
        n = name.lower().replace(" ", " ").strip()
        if n in ("brand", "make", "manufacturer"):
            m = re.search(r"\b(Ford|Chevrolet|Chevy|Dodge|Toyota|Honda|Jeep|Forest River|Jayco|Winnebago|"
                          r"Keystone|Yamaha|Mercury|Sea Ray|Bayliner|Tracker|Caterpillar|John Deere|Bobcat)\b",
                          title, re.I)
            return m.group(1) if m else "Unbranded"
        if n == "year":
            m = re.search(r"\b(19|20)\d{2}\b", title)
            return m.group(0) if m else "Does Not Apply"
        if n in ("model", "model year"):
            toks = [t for t in title.split() if not t.isdigit()]
            return toks[1] if len(toks) > 1 else (toks[0] if toks else "Does Not Apply")
        if n in ("color", "exterior color"):
            return "Unknown"
        return "Does Not Apply"

    async def post_listing(
        self, title: str, description: str, price: float, category: str,
        location_city: str, location_state: str, photo_urls: list[str],
        listing_duration_days: int = 30, item_specifics: dict | None = None,
    ) -> dict:
        """Post to eBay, adaptively resolving the category and required item specifics."""
        category_id = await self.resolve_leaf_category(
            CATEGORY_QUERY.get(category, title), EBAY_CATEGORIES.get(category, "6001"))
        specifics = dict(item_specifics or {})
        last = "unknown error"

        for _ in range(6):
            xml_body = self._build_add_item_xml(
                title=title, description=description, price=price, category_id=category_id,
                location_city=location_city, location_state=location_state,
                photo_urls=(photo_urls or [])[:12], duration_days=listing_duration_days,
                item_specifics=specifics,
            )
            try:
                root = ET.fromstring(await self._call("AddItem", xml_body))
            except Exception as e:
                logger.error("eBay API exception", error=str(e))
                return {"success": False, "error": str(e)}

            ack = root.find(".//ebay:Ack", NS)
            if ack is not None and ack.text in ("Success", "Warning"):
                iid_el = root.find(".//ebay:ItemID", NS)
                iid = iid_el.text if iid_el is not None else ""
                if iid:
                    logger.info("eBay listing posted", item_id=iid, price=price)
                    return {"success": True, "listing_id": iid,
                            "listing_url": f"https://{self._host()}/itm/{iid}",
                            "platform": "ebay_motors", "posted_at": datetime.utcnow().isoformat()}

            # Collect hard (Error-severity) messages
            hard = []
            for node in root.findall(".//ebay:Errors", NS):
                sev = node.find("ebay:SeverityCode", NS)
                msg = node.find("ebay:LongMessage", NS)
                if msg is not None and msg.text and (sev is None or sev.text == "Error"):
                    hard.append(msg.text)
            last = "; ".join(hard) or last
            if not hard:
                return {"success": False, "error": last}

            # Adaptive recovery
            if any("not a leaf category" in m.lower() for m in hard):
                new_cat = await self.resolve_leaf_category(title, category_id)
                if new_cat == category_id:
                    return {"success": False, "error": last}
                category_id = new_cat
                continue

            missing = []
            for m in hard:
                mm = re.search(r"item specific (.+?)\s+is missing", m.replace(" ", " "), re.I)
                if mm:
                    missing.append(mm.group(1).strip())
            if missing:
                for name in missing:
                    specifics.setdefault(name, self._derive_specific(name, title))
                continue

            return {"success": False, "error": last}  # unrecoverable

        return {"success": False, "error": last}

    def _build_add_item_xml(
        self, title: str, description: str, price: float, category_id: str,
        location_city: str, location_state: str, photo_urls: list[str],
        duration_days: int, item_specifics: dict | None = None,
    ) -> str:
        """Build the XML payload for eBay AddItem API call."""
        photos_xml = "\n".join(f"<PictureURL>{url}</PictureURL>" for url in photo_urls)
        duration_map = {7: "Days_7", 10: "Days_10", 30: "Days_30"}
        duration_str = duration_map.get(duration_days, "Days_30")

        spec_xml = ""
        if item_specifics:
            _items = "".join(
                f"<NameValueList><Name>{self._escape_xml(str(_n))}</Name><Value>{self._escape_xml(str(_v))}</Value></NameValueList>"
                for _n, _v in item_specifics.items())
            spec_xml = f"<ItemSpecifics>{_items}</ItemSpecifics>"

        return f"""<?xml version="1.0" encoding="utf-8"?>
<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials>
    <eBayAuthToken>{self.user_token}</eBayAuthToken>
  </RequesterCredentials>
  <Item>
    <Title>{self._escape_xml(title[:80])}</Title>
    <Description><![CDATA[{description}]]></Description>
    <PrimaryCategory>
      <CategoryID>{category_id}</CategoryID>
    </PrimaryCategory>
    {spec_xml}
    <StartPrice>{price:.2f}</StartPrice>
    <ListingDuration>{duration_str}</ListingDuration>
    <ListingType>FixedPriceItem</ListingType>
    <Quantity>1</Quantity>
    <Country>US</Country>
    <Currency>USD</Currency>
    <PostalCode>{settings.EBAY_ITEM_ZIP}</PostalCode>
    <Location>{location_city}, {location_state}</Location>
    <DispatchTimeMax>3</DispatchTimeMax>
    <ShippingDetails>
      <ShippingType>Flat</ShippingType>
      <ShippingServiceOptions>
        <ShippingServicePriority>1</ShippingServicePriority>
        <ShippingService>ShippingMethodStandard</ShippingService>
        <ShippingServiceCost>0.0</ShippingServiceCost>
        <FreeShipping>true</FreeShipping>
      </ShippingServiceOptions>
    </ShippingDetails>
    <ReturnPolicy>
      <ReturnsAcceptedOption>ReturnsNotAccepted</ReturnsAcceptedOption>
    </ReturnPolicy>
    <PictureDetails>
      {photos_xml}
    </PictureDetails>
    <ConditionID>3000</ConditionID>
    <PaymentMethods>CashOnPickup</PaymentMethods>
  </Item>
</AddItemRequest>"""

    @staticmethod
    def _escape_xml(text: str) -> str:
        return (str(text).replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace('"', "&quot;"))
