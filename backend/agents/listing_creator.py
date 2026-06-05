"""
ListingArb — Listing Creation Agent
Once a seller agrees, generates platform-optimized listing content.
Each platform gets a tailored title, description, and keyword set.
"""

import json
import anthropic
from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.llm import extract_json

logger = get_logger(__name__)

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)


PLATFORM_PROFILES = {
    "ebay_motors": {
        "name": "eBay Motors",
        "audience": "nationwide buyers, deal-hunters, enthusiasts",
        "tone": "detailed and spec-focused",
        "title_max_chars": 80,
        "description_max_chars": 4000,
        "seo_focus": "model year make condition keywords",
    },
    "rvtrader": {
        "name": "RVTrader",
        "audience": "serious RV buyers, families, retirees",
        "tone": "friendly and lifestyle-oriented",
        "title_max_chars": 100,
        "description_max_chars": 3000,
        "seo_focus": "slideouts amenities tow weight floorplan",
    },
    "boats_com": {
        "name": "Boats.com",
        "audience": "boat enthusiasts, fishermen, water sports buyers",
        "tone": "adventurous and feature-focused",
        "title_max_chars": 100,
        "description_max_chars": 3000,
        "seo_focus": "engine hours hull condition trailer included",
    },
    "craigslist": {
        "name": "Craigslist",
        "audience": "local buyers, price-sensitive, quick-close",
        "tone": "straightforward and concise",
        "title_max_chars": 70,
        "description_max_chars": 1500,
        "seo_focus": "price location condition cash OBO",
    },
    "autotrader": {
        "name": "AutoTrader",
        "audience": "serious car buyers comparing options",
        "tone": "professional and detailed",
        "title_max_chars": 80,
        "description_max_chars": 2000,
        "seo_focus": "mileage condition history features",
    },
    "hemmings": {
        "name": "Hemmings",
        "audience": "classic car collectors and enthusiasts",
        "tone": "enthusiast and provenance-focused",
        "title_max_chars": 100,
        "description_max_chars": 3000,
        "seo_focus": "original numbers matching restoration history",
    },
    "machinery_trader": {
        "name": "MachineryTrader",
        "audience": "contractors, construction companies, fleet buyers",
        "tone": "technical and spec-driven",
        "title_max_chars": 100,
        "description_max_chars": 2000,
        "seo_focus": "hours attachments hydraulics cab certification",
    },
    "facebook_groups": {
        "name": "Facebook Groups",
        "audience": "regional buyers, community members",
        "tone": "personal and conversational",
        "title_max_chars": 150,
        "description_max_chars": 1000,
        "seo_focus": "local pickup condition price",
    },
}


LISTING_SYSTEM = """You are an expert copywriter for high-ticket vehicle and equipment listings.
Your listings maximize buyer response rate by being accurate, compelling, and platform-appropriate.

Always respond with valid JSON only. No preamble."""


async def generate_listing_package(
    title: str,
    price: float,
    recommended_list_price: float,
    category: str,
    description: str,
    location: str,
    year: int = None,
    make: str = None,
    model: str = None,
    mileage: int = None,
    platforms: list[str] = None,
) -> dict:
    """
    Generate optimized listing content for all target platforms.
    Returns a dict keyed by platform slug.
    """
    if not platforms:
        platforms = list(PLATFORM_PROFILES.keys())

    # Build source info block
    source_info = f"""
Original listing info:
Title: {title}
Category: {category}
Location: {location}
Seller's asking price: ${price:,.0f}
Our list price: ${recommended_list_price:,.0f}
Year: {year or 'not specified'}
Make: {make or 'not specified'}
Model: {model or 'not specified'}
Mileage/Hours: {mileage or 'not specified'}
Description: {description[:1500] if description else 'None provided'}
"""

    # Generate for each platform
    package = {}
    for platform_slug in platforms:
        if platform_slug not in PLATFORM_PROFILES:
            continue

        profile = PLATFORM_PROFILES[platform_slug]
        listing_content = await _generate_for_platform(
            source_info=source_info,
            platform_profile=profile,
            list_price=recommended_list_price,
        )
        package[platform_slug] = listing_content

    logger.info("Listing package generated", platforms=list(package.keys()))
    return package


async def _generate_for_platform(
    source_info: str,
    platform_profile: dict,
    list_price: float,
) -> dict:
    """Generate listing content optimized for a specific platform."""
    prompt = f"""Create a listing for {platform_profile['name']}.

{source_info}

Platform context:
- Audience: {platform_profile['audience']}
- Tone: {platform_profile['tone']}
- Title max: {platform_profile['title_max_chars']} chars
- Description max: {platform_profile['description_max_chars']} chars
- SEO focus: {platform_profile['seo_focus']}
- List price: ${list_price:,.0f}

Respond with JSON:
{{
  "title": "<optimized title under {platform_profile['title_max_chars']} chars>",
  "description": "<full description, platform-appropriate tone>",
  "keywords": ["<5-10 SEO keywords>"],
  "price": {list_price},
  "highlights": ["<3-5 bullet points for quick scanning>"]
}}"""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1200,
        system=LISTING_SYSTEM,
        messages=[{"role": "user", "content": prompt}]
    )

    try:
        return extract_json(response.content[0].text)
    except json.JSONDecodeError:
        logger.error("Listing generation returned invalid JSON", platform=platform_profile["name"])
        return {
            "title": f"For Sale: {list_price:,.0f}",
            "description": "Contact for details.",
            "keywords": [],
            "price": list_price,
            "highlights": [],
        }
