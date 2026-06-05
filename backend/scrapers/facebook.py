"""
ListingArb — Facebook Marketplace Scraper
Uses Playwright to search FB Marketplace for high-ticket items.

IMPORTANT: This runs with a dedicated FB account — NOT your personal one.
Stay within rate limits. The system respects FB_DAILY_DM_LIMIT from .env.
"""

import asyncio
import json
import re
from datetime import datetime
from typing import Optional
from playwright.async_api import async_playwright, Page, Browser
import structlog

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.rate_limiter import RateLimiter

logger = get_logger(__name__)


CATEGORY_SEARCH_TERMS = {
    "RV": ["rv motorhome", "camper rv", "travel trailer", "fifth wheel rv"],
    "boat": ["boat for sale", "pontoon boat", "fishing boat", "sailboat"],
    "trailer": ["utility trailer", "cargo trailer", "flatbed trailer", "horse trailer"],
    "classic car": ["classic car", "vintage car", "muscle car", "antique car"],
    "heavy equipment": ["excavator", "skid steer", "bulldozer", "forklift", "dump truck"],
}


class FBMarketplaceScraper:
    """
    Scrapes Facebook Marketplace search results for high-ticket listings.
    Returns structured listing data for ingestion.
    """

    def __init__(self):
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.is_logged_in = False
        self.rate_limiter = RateLimiter(max_requests=30, window_seconds=3600)

    async def __aenter__(self):
        await self.start()
        return self

    async def __aexit__(self, *args):
        await self.stop()

    async def start(self):
        """Launch browser with optional proxy."""
        playwright = await async_playwright().start()
        launch_args = {
            "headless": True,
            "args": [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-blink-features=AutomationControlled",
            ]
        }
        if settings.PROXY_ENABLED and settings.PROXY_URL:
            launch_args["proxy"] = {"server": settings.PROXY_URL}

        self.browser = await playwright.chromium.launch(**launch_args)
        context = await self.browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 800},
        )
        self.page = await context.new_page()
        logger.info("Browser started")

    async def stop(self):
        if self.browser:
            await self.browser.close()
            logger.info("Browser stopped")

    async def login(self, email: str, password: str) -> bool:
        """Log into Facebook. Returns True if successful."""
        try:
            await self.page.goto("https://www.facebook.com/login", wait_until="networkidle")
            await asyncio.sleep(2)

            await self.page.fill("#email", email)
            await asyncio.sleep(0.5)
            await self.page.fill("#pass", password)
            await asyncio.sleep(0.5)
            await self.page.click("[name='login']")
            await self.page.wait_for_load_state("networkidle")
            await asyncio.sleep(3)

            # Check if login succeeded — look for the home feed
            if "facebook.com" in self.page.url and "login" not in self.page.url:
                self.is_logged_in = True
                logger.info("FB login successful")
                return True
            else:
                logger.error("FB login failed", url=self.page.url)
                return False
        except Exception as e:
            logger.error("FB login exception", error=str(e))
            return False

    async def search_marketplace(
        self,
        location: str,
        search_term: str,
        min_price: int = 10000,
        max_price: int = 500000,
        radius_miles: int = 100,
    ) -> list[dict]:
        """
        Search FB Marketplace and return raw listing data.
        location: "Milwaukee, WI" format
        """
        if not self.is_logged_in:
            raise RuntimeError("Must login before scraping")

        await self.rate_limiter.wait()

        # Build marketplace URL
        # FB Marketplace search URL structure
        city_slug = location.replace(", ", "-").replace(" ", "-").lower()
        url = (
            f"https://www.facebook.com/marketplace/{city_slug}/search"
            f"?query={search_term.replace(' ', '%20')}"
            f"&minPrice={min_price}"
            f"&maxPrice={max_price}"
            f"&radiusInKm={int(radius_miles * 1.609)}"
            f"&sortBy=creation_time_descend"
        )

        logger.info("Searching marketplace", url=url, term=search_term)
        await self.page.goto(url, wait_until="domcontentloaded")
        await asyncio.sleep(3)

        # Scroll to load more results
        for _ in range(3):
            await self.page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await asyncio.sleep(2)

        listings = await self._extract_listings_from_page()
        logger.info("Found listings", count=len(listings), term=search_term)
        return listings

    async def _extract_listings_from_page(self) -> list[dict]:
        """Extract listing data from the current search results page."""
        listings = []
        try:
            # FB renders listings as articles or divs with marketplace data
            # We target the listing cards in the grid
            items = await self.page.query_selector_all(
                '[aria-label="Marketplace listings"] > div > div'
            )
            if not items:
                # Fallback selector
                items = await self.page.query_selector_all(
                    'a[href*="/marketplace/item/"]'
                )

            for item in items[:40]:  # Cap per search to avoid rate limits
                try:
                    listing = await self._parse_listing_card(item)
                    if listing and listing.get("price", 0) >= settings.MIN_LISTING_PRICE:
                        listings.append(listing)
                except Exception as e:
                    logger.debug("Failed to parse listing card", error=str(e))
                    continue

        except Exception as e:
            logger.error("Failed to extract listings", error=str(e))

        return listings

    async def _parse_listing_card(self, element) -> Optional[dict]:
        """Extract data from a single listing card element."""
        try:
            # Get the listing link
            link_el = await element.query_selector('a[href*="/marketplace/item/"]')
            if not link_el:
                return None

            href = await link_el.get_attribute("href")
            if not href:
                return None

            # Extract listing ID from URL
            match = re.search(r"/marketplace/item/(\d+)", href)
            if not match:
                return None
            listing_id = match.group(1)

            # Get text content
            text_content = await element.inner_text()
            lines = [l.strip() for l in text_content.split("\n") if l.strip()]

            # Parse price (look for $X,XXX or $XX,XXX)
            price = None
            for line in lines:
                price_match = re.search(r"\$[\d,]+", line)
                if price_match:
                    price_str = price_match.group(0).replace("$", "").replace(",", "")
                    try:
                        price = float(price_str)
                        break
                    except ValueError:
                        continue

            if not price:
                return None

            # Get title (usually the first non-price line)
            title = lines[0] if lines else "Unknown"

            # Get location (usually near the end)
            location = ""
            for line in lines[-3:]:
                if any(c.isupper() for c in line) and len(line) < 50:
                    location = line

            # Get photo URL
            img_el = await element.query_selector("img")
            photo_url = await img_el.get_attribute("src") if img_el else None

            full_url = f"https://www.facebook.com{href}" if href.startswith("/") else href

            return {
                "external_id": f"fb_{listing_id}",
                "source_platform": "facebook",
                "source_url": full_url,
                "title": title,
                "price": price,
                "location": location,
                "photos": [photo_url] if photo_url else [],
                "discovered_at": datetime.utcnow().isoformat(),
            }
        except Exception as e:
            logger.debug("Card parse error", error=str(e))
            return None

    async def get_listing_details(self, listing_url: str) -> dict:
        """
        Visit a listing page and extract full details:
        description, all photos, seller profile URL.
        """
        await self.rate_limiter.wait()
        await self.page.goto(listing_url, wait_until="domcontentloaded")
        await asyncio.sleep(3)

        details = {}
        try:
            # Description
            desc_el = await self.page.query_selector('[data-testid="marketplace-pdp-description"]')
            if not desc_el:
                # Try alternate selector
                desc_el = await self.page.query_selector('div[class*="description"]')
            if desc_el:
                details["description"] = await desc_el.inner_text()

            # All photos
            photo_els = await self.page.query_selector_all('img[src*="fbcdn"]')
            photos = []
            for img in photo_els[:10]:
                src = await img.get_attribute("src")
                if src and "p320x320" not in src:  # Exclude thumbnails
                    photos.append(src)
            details["photos"] = list(set(photos))

            # Seller profile link
            seller_link = await self.page.query_selector(
                'a[href*="/profile/"], a[href*="/marketplace/profile/"]'
            )
            if seller_link:
                details["seller_profile_url"] = await seller_link.get_attribute("href")

            # Seller name
            seller_name_el = await self.page.query_selector(
                '[data-testid="marketplace-pdp-seller-name"]'
            )
            if seller_name_el:
                details["seller_name"] = await seller_name_el.inner_text()

        except Exception as e:
            logger.error("Failed to get listing details", url=listing_url, error=str(e))

        return details

    async def run_full_scan(self, locations: list[str], categories: list[str]) -> list[dict]:
        """
        Run a complete scan across all locations and categories.
        Called by the Celery scheduler every 30-60 minutes.
        """
        await self.login(settings.FB_EMAIL, settings.FB_PASSWORD)
        if not self.is_logged_in:
            raise RuntimeError("Could not log into Facebook")

        all_listings = []
        for location in locations:
            for category in categories:
                if category not in CATEGORY_SEARCH_TERMS:
                    continue
                for search_term in CATEGORY_SEARCH_TERMS[category]:
                    try:
                        listings = await self.search_marketplace(
                            location=location,
                            search_term=search_term,
                            min_price=settings.MIN_LISTING_PRICE,
                        )
                        # Tag with category
                        for l in listings:
                            l["category"] = category
                        all_listings.extend(listings)
                        # Respect rate limits between searches
                        await asyncio.sleep(10)
                    except Exception as e:
                        logger.error(
                            "Search failed",
                            location=location,
                            term=search_term,
                            error=str(e)
                        )

        # Deduplicate by external_id
        seen = set()
        unique = []
        for l in all_listings:
            if l["external_id"] not in seen:
                seen.add(l["external_id"])
                unique.append(l)

        logger.info("Scan complete", total_unique=len(unique))
        return unique
