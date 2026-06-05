"""
ListingArb — DM Sender Automation
Uses Playwright to send DMs via Facebook Marketplace messenger.
Includes rate limiting, error handling, and audit logging.

RATE LIMIT: Max 15-20 DMs/day per FB account. This is enforced here.
Exceeding this risks account flagging. Do NOT change the limit without testing.
"""

import asyncio
from datetime import datetime, timedelta
from typing import Optional
from playwright.async_api import async_playwright, Page

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.rate_limiter import DailyRateLimiter

logger = get_logger(__name__)


class FBDMSender:
    """
    Sends DMs to Facebook Marketplace sellers.
    One instance per FB account. Tracks daily send count.
    """

    def __init__(self, fb_email: str, fb_password: str, account_label: str = "primary"):
        self.fb_email = fb_email
        self.fb_password = fb_password
        self.account_label = account_label
        self.daily_limiter = DailyRateLimiter(max_per_day=settings.FB_DAILY_DM_LIMIT)
        self.page: Optional[Page] = None
        self.browser = None
        self.is_ready = False

    async def __aenter__(self):
        await self.setup()
        return self

    async def __aexit__(self, *args):
        await self.teardown()

    async def setup(self):
        """Initialize browser and log in."""
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
        )
        context = await self.browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            )
        )
        self.page = await context.new_page()
        self.is_ready = await self._login()

    async def teardown(self):
        if self.browser:
            await self.browser.close()

    async def _login(self) -> bool:
        try:
            await self.page.goto("https://www.facebook.com/login", wait_until="networkidle")
            await asyncio.sleep(2)
            await self.page.fill("#email", self.fb_email)
            await asyncio.sleep(0.8)
            await self.page.fill("#pass", self.fb_password)
            await asyncio.sleep(0.5)
            await self.page.click("[name='login']")
            await self.page.wait_for_load_state("networkidle")
            await asyncio.sleep(3)
            success = "login" not in self.page.url
            if success:
                logger.info("FB account logged in", account=self.account_label)
            else:
                logger.error("FB login failed", account=self.account_label)
            return success
        except Exception as e:
            logger.error("FB login exception", account=self.account_label, error=str(e))
            return False

    async def send_dm(
        self,
        listing_url: str,
        message_text: str,
        dry_run: bool = False,
    ) -> dict:
        """
        Send a DM to the seller of a Facebook Marketplace listing.

        Returns:
            {
                "success": bool,
                "sent_at": datetime | None,
                "error": str | None,
                "dry_run": bool,
            }
        """
        if not self.is_ready:
            return {"success": False, "error": "Not logged in", "dry_run": dry_run}

        # Check daily rate limit
        if not await self.daily_limiter.can_send():
            remaining_reset = await self.daily_limiter.seconds_until_reset()
            logger.warning(
                "Daily DM limit reached",
                account=self.account_label,
                resets_in_hours=remaining_reset / 3600
            )
            return {
                "success": False,
                "error": f"Daily limit reached. Resets in {remaining_reset/3600:.1f}h",
                "dry_run": dry_run,
            }

        if dry_run:
            logger.info("DRY RUN — would send DM", url=listing_url[:60], chars=len(message_text))
            return {"success": True, "sent_at": datetime.utcnow(), "dry_run": True}

        try:
            # Navigate to the listing
            await self.page.goto(listing_url, wait_until="domcontentloaded")
            await asyncio.sleep(3)

            # Click "Message" button on the listing
            message_btn = await self.page.query_selector(
                '[aria-label="Message"], button:has-text("Message")'
            )
            if not message_btn:
                # Try alternate selectors
                message_btn = await self.page.query_selector(
                    'div[role="button"]:has-text("Message")'
                )

            if not message_btn:
                return {"success": False, "error": "Could not find Message button", "dry_run": False}

            await message_btn.click()
            await asyncio.sleep(2)

            # Find the message input in the chat dialog
            chat_input = await self.page.query_selector(
                '[aria-label="Message"], div[contenteditable="true"][role="textbox"]'
            )
            if not chat_input:
                return {"success": False, "error": "Chat input not found", "dry_run": False}

            # Type the message with human-like delay
            await chat_input.click()
            await asyncio.sleep(0.5)

            # Type character by character with slight randomness
            for chunk in _chunk_text(message_text, size=15):
                await chat_input.type(chunk, delay=30)
                await asyncio.sleep(0.1)

            await asyncio.sleep(1)

            # Send with Enter
            await chat_input.press("Enter")
            await asyncio.sleep(2)

            # Record the send
            await self.daily_limiter.record_send()
            sent_at = datetime.utcnow()

            logger.info(
                "DM sent successfully",
                account=self.account_label,
                url=listing_url[:60],
                daily_count=await self.daily_limiter.today_count(),
            )

            return {"success": True, "sent_at": sent_at, "error": None, "dry_run": False}

        except Exception as e:
            logger.error("DM send failed", url=listing_url[:60], error=str(e))
            return {"success": False, "error": str(e), "dry_run": False}

    async def check_for_replies(self, thread_urls: list[str]) -> list[dict]:
        """
        Check a list of Messenger thread URLs for new replies.
        Returns list of {thread_url, has_reply, reply_text, reply_at}
        """
        replies = []
        for url in thread_urls:
            try:
                reply_data = await self._check_thread(url)
                replies.append(reply_data)
                await asyncio.sleep(2)  # Be gentle
            except Exception as e:
                logger.error("Failed to check thread", url=url, error=str(e))

        return replies

    async def _check_thread(self, thread_url: str) -> dict:
        """Check a single Messenger thread for the latest message."""
        await self.page.goto(thread_url, wait_until="domcontentloaded")
        await asyncio.sleep(3)

        messages = await self.page.query_selector_all(
            'div[class*="message"] span[dir="auto"]'
        )

        if not messages:
            return {"thread_url": thread_url, "has_reply": False, "reply_text": None}

        # Get the last message
        last_msg = messages[-1]
        text = await last_msg.inner_text()

        return {
            "thread_url": thread_url,
            "has_reply": bool(text),
            "reply_text": text,
            "checked_at": datetime.utcnow().isoformat(),
        }


def _chunk_text(text: str, size: int = 15) -> list[str]:
    """Split text into chunks for more natural typing simulation."""
    return [text[i:i+size] for i in range(0, len(text), size)]
