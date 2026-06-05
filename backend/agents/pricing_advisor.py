"""AI pricing advisor — recommends the optimal price within the seller's rails.

Undercutting wins the sale but races to the bottom. This layer lets Claude
decide how aggressively to price given competition + demand signals; the
repricing engine still clamps the result to [floor, ceiling], so AI can
optimize but never sell below the seller's minimum.
"""
import anthropic

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.llm import extract_json

logger = get_logger(__name__)
client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

SYSTEM = """You are a pricing strategist for an eBay repricing tool ("Undercut").
Recommend the optimal LISTING PRICE to maximize the seller's profit AND sell-through.

Principles:
- Undercutting the lowest competitor usually wins the sale / Buy Box.
- But do NOT race to the bottom: when demand is strong (high views/watchers/sales)
  or competitors are few, hold price higher to protect margin.
- The price MUST stay within [floor, ceiling]. Never recommend below the floor.

Respond with JSON only."""


async def recommend_price(
    *, title: str, current_price: float, competitor_low: float | None,
    competitor_count: int = 0, floor: float, ceiling: float | None = None,
    views: int | None = None, watchers: int | None = None, sales_30d: int | None = None,
) -> dict:
    """Returns {recommended_price, confidence, reasoning} or {} on failure."""
    prompt = f"""Item: {title}
Current price: ${current_price:.2f}
Lowest competitor: {('$%.2f' % competitor_low) if competitor_low is not None else 'unknown'}
Number of competitors: {competitor_count}
Floor (minimum, never go below): ${floor:.2f}
Ceiling (maximum): {('$%.2f' % ceiling) if ceiling else 'none'}
Demand signals — views: {views}, watchers: {watchers}, sales last 30d: {sales_30d}

Respond JSON:
{{"recommended_price": <number within [floor, ceiling]>,
  "confidence": "<low|medium|high>",
  "reasoning": "<1-2 sentences>"}}"""
    try:
        resp = client.messages.create(
            model="claude-sonnet-4-20250514", max_tokens=300,
            system=SYSTEM, messages=[{"role": "user", "content": prompt}],
        )
        data = extract_json(resp.content[0].text)
        logger.info("AI price recommended", title=title[:40],
                    price=data.get("recommended_price"))
        return data
    except Exception as e:
        logger.error("AI pricing failed", error=str(e))
        return {}
