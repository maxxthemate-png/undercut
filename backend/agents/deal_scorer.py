"""
ListingArb — Deal Scorer Agent
Uses Claude to evaluate each new listing and assign a deal score 0-100.
High scores = high estimated upside = prioritize for outreach.
"""

import json
from typing import Optional
import anthropic
import structlog

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.llm import extract_json

logger = get_logger(__name__)

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

SCORER_SYSTEM_PROMPT = """You are an expert resale arbitrage analyst specializing in high-ticket items: RVs, boats, trailers, classic cars, and heavy equipment.

Your job: evaluate a marketplace listing and estimate how much upside we can capture by cross-posting it to premium platforms (eBay Motors, RVTrader, Boats.com, etc.) where buyers pay more than on Facebook Marketplace.

Scoring rubric:
- 80-100: Exceptional deal — significant underpricing vs market, clean title likely, high demand category
- 60-79: Good deal — moderate upside, worth pursuing
- 40-59: Marginal — pursue only if pipeline is slow
- 0-39: Skip — overpriced, too obscure, or red flags

Key factors to evaluate:
1. Price vs estimated market value (most important)
2. Category demand on premium platforms
3. Year/condition signals in description/title
4. Photo quality signals (if described)
5. Location (affects buyer pool)
6. Red flags: salvage title mentions, major damage, "as-is" for unknown reasons

Always respond with valid JSON only. No preamble, no explanation outside the JSON."""


SCORER_USER_TEMPLATE = """Evaluate this listing for resale arbitrage potential:

Title: {title}
Price: ${price:,.0f}
Category: {category}
Location: {location}
Description: {description}

Respond with this exact JSON structure:
{{
  "score": <0-100>,
  "estimated_market_value": <dollar amount as number>,
  "estimated_upside": <dollar amount we'd likely earn as fee>,
  "confidence": <"high" | "medium" | "low">,
  "top_platforms": [<2-3 platform names where this would sell best>],
  "reasoning": "<2-3 sentences explaining the score>",
  "red_flags": [<list any concerns, empty array if none>],
  "recommended_list_price": <dollar amount to list at on premium platforms>
}}"""


async def score_listing(
    title: str,
    price: float,
    category: str,
    location: str,
    description: str = "",
) -> dict:
    """
    Score a listing for deal potential.
    Returns a dict with score, estimated_upside, reasoning, etc.
    """
    try:
        prompt = SCORER_USER_TEMPLATE.format(
            title=title,
            price=price,
            category=category,
            location=location,
            description=description[:1000] if description else "Not provided",
        )

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=800,
            system=SCORER_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        )

        raw = response.content[0].text.strip()

        # Parse JSON response
        score_data = extract_json(raw)

        logger.info(
            "Listing scored",
            title=title[:50],
            score=score_data.get("score"),
            estimated_upside=score_data.get("estimated_upside"),
        )

        return score_data

    except json.JSONDecodeError as e:
        logger.error("Score response was not valid JSON", error=str(e), raw=raw[:200])
        return _default_score()
    except Exception as e:
        logger.error("Scoring failed", error=str(e))
        return _default_score()


def _default_score() -> dict:
    return {
        "score": 0,
        "estimated_market_value": 0,
        "estimated_upside": 0,
        "confidence": "low",
        "top_platforms": [],
        "reasoning": "Scoring failed — manual review required",
        "red_flags": ["Scoring error"],
        "recommended_list_price": 0,
    }


async def batch_score_listings(listings: list[dict]) -> list[dict]:
    """
    Score a batch of listings. Adds score data to each listing dict.
    """
    results = []
    for listing in listings:
        score_data = await score_listing(
            title=listing.get("title", ""),
            price=listing.get("price", 0),
            category=listing.get("category", "unknown"),
            location=listing.get("location", ""),
            description=listing.get("description", ""),
        )
        listing["score_data"] = score_data
        listing["deal_score"] = score_data.get("score", 0)
        listing["estimated_market_value"] = score_data.get("estimated_market_value", 0)
        listing["estimated_upside"] = score_data.get("estimated_upside", 0)
        listing["score_reasoning"] = score_data.get("reasoning", "")
        results.append(listing)

    return results
