"""
ListingArb — Celery Tasks + Scheduler
All background jobs: scraping, scoring, DM sending, reply monitoring.

The pipeline runs automatically on schedule.
Human is only looped in when AUTONOMY_LEVEL constraints require it
or when an action needs coordination (seller agreed, buyer found).
"""

import asyncio
from datetime import datetime, timedelta
from celery import Celery
from celery.schedules import crontab
import structlog

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.notifications import send_sms_alert, send_email_alert

logger = get_logger(__name__)

# Initialize Celery
celery_app = Celery(
    "listingarb",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="America/Chicago",
    enable_utc=True,
    task_track_started=True,
    worker_max_tasks_per_child=100,  # Prevent memory leaks from Playwright
)

# ─── Scheduled Tasks ──────────────────────────────────────────────────────────

celery_app.conf.beat_schedule = {
    # Scrape marketplace every 45 minutes
    "scrape-marketplace": {
        "task": "tasks.worker.run_marketplace_scan",
        "schedule": crontab(minute="*/45"),
    },
    # Check for seller replies every 20 minutes
    "check-replies": {
        "task": "tasks.worker.check_seller_replies",
        "schedule": crontab(minute="*/20"),
    },
    # Send queued DMs (runs every 30 min — respects daily cap)
    "send-queued-dms": {
        "task": "tasks.worker.send_queued_dms",
        "schedule": crontab(minute="*/30"),
    },
    # Cross-post agreed listings to premium platforms (the revenue step)
    "process-platform-postings": {
        "task": "tasks.worker.process_platform_postings",
        "schedule": crontab(minute="*/15"),
    },
    "reprice-all": {
        "task": "tasks.worker.reprice_all_task",
        "schedule": crontab(minute="*/15"),
    },
    # Daily stats report at 8am
    "daily-report": {
        "task": "tasks.worker.send_daily_report",
        "schedule": crontab(hour=8, minute=0),
    },
    # Clean up expired listings weekly
    "cleanup-expired": {
        "task": "tasks.worker.cleanup_expired_listings",
        "schedule": crontab(minute=0, day_of_week=0, hour=2),  # Sunday 2:00am (once, not every minute)
    },
}


# ─── System Pause Check ────────────────────────────────────────────────────────

def _check_system_paused() -> bool:
    """Returns True if system is paused — all tasks should exit early."""
    from ..models.database import get_db_sync
    from ..models.models import SystemState
    try:
        db = next(get_db_sync())
        state = db.query(SystemState).filter_by(id=1).first()
        return state.is_paused if state else False
    except Exception:
        return False  # Default to not paused on DB error


# ─── Task: Marketplace Scan ───────────────────────────────────────────────────

@celery_app.task(bind=True, max_retries=2, name="tasks.worker.run_marketplace_scan")
def run_marketplace_scan(self):
    """
    Scrape Facebook Marketplace for new listings.
    Scores them and queues high-score listings for outreach.
    """
    if _check_system_paused():
        logger.info("System paused — skipping scan")
        return {"status": "paused"}

    try:
        asyncio.run(_async_marketplace_scan())
        return {"status": "complete"}
    except Exception as exc:
        logger.error("Marketplace scan failed", error=str(exc))
        raise self.retry(exc=exc, countdown=300)


async def _async_marketplace_scan():
    from ..scrapers.facebook import FBMarketplaceScraper
    from ..agents.deal_scorer import batch_score_listings
    from ..services.listing_service import ingest_listings

    locations = settings.TARGET_LOCATIONS.split(";")
    categories = settings.TARGET_CATEGORIES.split(",")

    async with FBMarketplaceScraper() as scraper:
        raw_listings = await scraper.run_full_scan(locations, categories)

    if not raw_listings:
        logger.info("No new listings found in scan")
        return

    logger.info("Scoring listings", count=len(raw_listings))
    scored = await batch_score_listings(raw_listings)

    # Only ingest listings above score threshold
    threshold = 45
    qualified = [l for l in scored if l.get("deal_score", 0) >= threshold]
    logger.info("Qualified listings", count=len(qualified), threshold=threshold)

    await ingest_listings(qualified)


# ─── Task: Send Queued DMs ────────────────────────────────────────────────────

@celery_app.task(bind=True, max_retries=1, name="tasks.worker.send_queued_dms")
def send_queued_dms(self):
    """
    Send DMs to sellers of queued listings.
    Respects AUTONOMY_LEVEL — at level 1, only drafts (no send).
    """
    if _check_system_paused():
        return {"status": "paused"}

    autonomy_level = int(settings.AUTONOMY_LEVEL)
    if autonomy_level < 2:
        logger.info("Autonomy level 1 — DMs require manual approval")
        _notify_pending_dms()
        return {"status": "manual_approval_needed"}

    try:
        result = asyncio.run(_async_send_queued_dms())
        return result
    except Exception as exc:
        logger.error("DM send task failed", error=str(exc))
        raise self.retry(exc=exc, countdown=600)


async def _async_send_queued_dms():
    from ..services.listing_service import get_queued_for_outreach, mark_dm_sent
    from ..agents.dm_generator import generate_dm
    from ..automation.dm_sender import FBDMSender

    queued = await get_queued_for_outreach(limit=10)
    if not queued:
        return {"status": "no_queued_listings"}

    sent_count = 0
    async with FBDMSender(settings.FB_EMAIL, settings.FB_PASSWORD) as sender:
        for listing in queued:
            dm_text = await generate_dm(
                title=listing.title,
                price=listing.price,
                location=f"{listing.location_city}, {listing.location_state}",
                category=listing.category,
                description=listing.description or "",
            )

            result = await sender.send_dm(
                listing_url=listing.source_url,
                message_text=dm_text,
                dry_run=False,
            )

            if result["success"]:
                await mark_dm_sent(
                    listing_id=str(listing.id),
                    dm_text=dm_text,
                    sent_at=result["sent_at"],
                )
                sent_count += 1

            # Space out sends to avoid detection
            import asyncio as _asyncio
            await _asyncio.sleep(30)

    logger.info("DMs sent", count=sent_count)
    return {"status": "complete", "sent": sent_count}


def _notify_pending_dms():
    """Alert operator that DMs need manual approval (Level 1 mode)."""
    from ..services.listing_service import get_queued_for_outreach_sync
    count = get_queued_for_outreach_sync(count_only=True)
    if count > 0:
        send_sms_alert(
            f"ListingArb: {count} listings ready for DM outreach. "
            f"Review at http://localhost:3000/dashboard/outreach"
        )


# ─── Task: Cross-Post to Premium Platforms (the revenue step) ─────────────────

@celery_app.task(bind=True, max_retries=1, name="tasks.worker.process_platform_postings")
def process_platform_postings(self):
    """Post PENDING platform_listings to premium marketplaces (eBay Motors).
    This is where the arbitrage spread is actually captured."""
    if _check_system_paused():
        return {"status": "paused"}
    try:
        return asyncio.run(_async_process_platform_postings())
    except Exception as exc:
        logger.error("Platform posting failed", error=str(exc))
        raise self.retry(exc=exc, countdown=300)


async def _async_process_platform_postings():
    from ..services.listing_service import (
        get_pending_platform_listings, mark_platform_listing_result,
    )
    from ..automation.ebay_poster import EbayMotorsPoster
    from ..agents.listing_creator import generate_listing_package

    pending = await get_pending_platform_listings(limit=20)
    if not pending:
        return {"status": "no_pending"}

    poster = EbayMotorsPoster()
    posted = errored = 0
    for pl in pending:
        listing = pl.listing
        if not listing:
            await mark_platform_listing_result(str(pl.id), {"success": False, "error": "source listing missing"})
            errored += 1
            continue

        if pl.platform.lower().startswith("ebay"):
            list_price = pl.listed_price or listing.estimated_market_value or listing.price
            # AI-optimize the copy first — better listings sell higher = bigger spread
            title, description = listing.title, (listing.description or listing.title)
            try:
                pkg = await generate_listing_package(
                    title=listing.title,
                    price=listing.price,
                    recommended_list_price=list_price,
                    category=listing.category or "classic car",
                    description=listing.description or "",
                    location=f"{listing.location_city or ''}, {listing.location_state or ''}",
                    year=listing.year, make=listing.make, model=listing.model,
                    mileage=listing.mileage, platforms=["ebay_motors"],
                )
                content = pkg.get("ebay_motors", {})
                title = content.get("title") or title
                description = content.get("description") or description
            except Exception as e:
                logger.warning("Copy generation failed; using raw listing text", error=str(e))

            specifics = {}
            if listing.year: specifics["Year"] = str(listing.year)
            if listing.make: specifics["Make"] = listing.make
            if listing.model: specifics["Model"] = listing.model
            result = await poster.post_listing(
                title=title, description=description, price=list_price,
                category=listing.category or "classic car",
                location_city=listing.location_city or "",
                location_state=listing.location_state or "",
                photo_urls=listing.photos or [],
                item_specifics=specifics,
            )
            await mark_platform_listing_result(str(pl.id), result)
            posted += 1 if result.get("success") else 0
            errored += 0 if result.get("success") else 1
        else:
            await mark_platform_listing_result(str(pl.id), {
                "success": False,
                "error": f"No automated poster for '{pl.platform}' yet — generate copy and post manually.",
            })
            errored += 1

    logger.info("Platform postings processed", posted=posted, errored=errored)
    return {"status": "complete", "posted": posted, "errored": errored}


# ─── Task: Check Seller Replies ───────────────────────────────────────────────

@celery_app.task(bind=True, name="tasks.worker.check_seller_replies")
def check_seller_replies(self):
    """
    Check Messenger threads for seller replies.
    Classify responses and trigger appropriate actions.
    """
    if _check_system_paused():
        return {"status": "paused"}

    try:
        result = asyncio.run(_async_check_replies())
        return result
    except Exception as exc:
        logger.error("Reply check failed", error=str(exc))
        return {"status": "error", "error": str(exc)}


async def _async_check_replies():
    from ..services.listing_service import get_listings_awaiting_reply, record_seller_response
    from ..agents.response_classifier import classify_response, map_to_seller_response_type
    from ..agents.dm_generator import generate_followup_dm
    from ..automation.dm_sender import FBDMSender

    awaiting = await get_listings_awaiting_reply()
    if not awaiting:
        return {"status": "no_threads_to_check"}

    thread_urls = [l.seller.dm_thread_url for l in awaiting if l.seller and l.seller.dm_thread_url]

    async with FBDMSender(settings.FB_EMAIL, settings.FB_PASSWORD) as sender:
        replies = await sender.check_for_replies(thread_urls)

    interested_count = 0
    for reply_data in replies:
        if not reply_data.get("has_reply"):
            continue

        # Find matching listing
        matching = next(
            (l for l in awaiting if l.seller and l.seller.dm_thread_url == reply_data["thread_url"]),
            None
        )
        if not matching:
            continue

        # Classify the reply
        classification = await classify_response(
            seller_message=reply_data["reply_text"],
            listing_title=matching.title,
        )

        response_type = map_to_seller_response_type(classification["classification"])

        await record_seller_response(
            listing_id=str(matching.id),
            response_text=reply_data["reply_text"],
            response_type=response_type,
            classification_data=classification,
        )

        # Handle based on classification
        action = classification.get("suggested_action")

        if action == "escalate_human":
            # Seller is interested — notify operator immediately
            interested_count += 1
            send_sms_alert(
                f"🔥 ListingArb: Seller INTERESTED!\n"
                f"Item: {matching.title[:50]}\n"
                f"Price: ${matching.price:,.0f}\n"
                f"Upside: ~${matching.estimated_upside:,.0f}\n"
                f"Reply: \"{reply_data['reply_text'][:80]}\"\n"
                f"Dashboard: http://localhost:3000/dashboard/deal/{matching.id}"
            )
        elif action == "auto_reply" and int(settings.AUTONOMY_LEVEL) >= 2:
            # Auto-respond to their question
            auto_reply = await generate_followup_dm(
                original_dm="",
                seller_question=reply_data["reply_text"],
                title=matching.title,
                price=matching.price,
            )
            # Would send via sender here — omitted for brevity

    logger.info("Reply check complete", threads_checked=len(replies), interested=interested_count)
    return {"status": "complete", "interested": interested_count}


# ─── Task: Daily Report ───────────────────────────────────────────────────────

@celery_app.task(name="tasks.worker.send_daily_report")
def send_daily_report():
    """Send daily summary SMS/email to operator."""
    from ..services.analytics_service import get_daily_stats
    stats = asyncio.run(get_daily_stats())

    report = (
        f"ListingArb Daily Report\n"
        f"New listings: {stats['new_listings']}\n"
        f"DMs sent: {stats['dms_sent']}\n"
        f"Replies: {stats['replies']}\n"
        f"Interested sellers: {stats['interested']}\n"
        f"Active listings (cross-posted): {stats['active_platform_listings']}\n"
        f"Deals closed (all time): {stats['total_deals']}\n"
        f"Revenue (all time): ${stats['total_revenue']:,.0f}"
    )

    send_sms_alert(report)
    logger.info("Daily report sent")


# ─── Task: Cleanup ────────────────────────────────────────────────────────────

@celery_app.task(name="tasks.worker.cleanup_expired_listings")
def cleanup_expired_listings():
    """Mark old listings as expired and remove from active tracking."""
    from ..services.listing_service import expire_old_listings
    count = asyncio.run(expire_old_listings(older_than_days=90))
    logger.info("Expired listings cleaned up", count=count)


# ─── Task: Reprice (the repricer product) ─────────────────────────────────────

@celery_app.task(bind=True, max_retries=1, name="tasks.worker.reprice_all_task")
def reprice_all_task(self):
    """Reprice every enabled listing across all connected stores."""
    if _check_system_paused():
        return {"status": "paused"}
    try:
        from ..services.reprice_service import reprice_all
        return asyncio.run(reprice_all())
    except Exception as exc:
        logger.error("reprice run failed", error=str(exc))
        raise self.retry(exc=exc, countdown=300)
