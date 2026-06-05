"""
ListingArb — DM Generator Agent
Creates personalized, high-response-rate outreach messages for each seller.

The pitch: zero-risk, performance-only. We list on more platforms.
If it sells above their price, we keep the difference. They pay nothing.
"""

import anthropic
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)


DM_SYSTEM_PROMPT = """You write short, casual, high-converting Facebook Marketplace DMs for a marketplace listing service.

The pitch in plain English:
- We'll cross-post the seller's item to 10-15 additional platforms (RVTrader, eBay Motors, Boats.com, etc.)
- If it sells above their asking price, we keep the difference as our fee
- If it doesn't sell above their price, they owe us nothing
- They do zero extra work — we handle all listings and inquiries

Rules for the DM:
1. Sound like a real person, NOT a robot or mass-mailer
2. Reference something specific about their listing (item, price, location)
3. Keep it under 120 words
4. No exclamation points — they scream spam
5. Make the zero-risk angle clear but don't oversell it
6. End with a simple, low-friction question ("Would that interest you?" or "Worth a quick chat?")
7. Never mention competitor platforms by name in the opener — save that for follow-up
8. No emojis

Write ONLY the DM text. Nothing else."""


DM_USER_TEMPLATE = """Write a DM for this listing:

Item: {title}
Asking Price: ${price:,.0f}
Location: {location}
Category: {category}
Key detail from description: {key_detail}

The tone should be {tone}."""


# Different tones for A/B testing
DM_TONES = [
    "casual and friendly, like a neighbor",
    "brief and businesslike",
    "curious and low-pressure",
]


async def generate_dm(
    title: str,
    price: float,
    location: str,
    category: str,
    description: str = "",
    tone_index: int = 0,
) -> str:
    """
    Generate a personalized DM for a seller.
    Returns the DM text ready to send.
    """
    # Extract a key detail from the description to make the DM feel personal
    key_detail = _extract_key_detail(description, title, category)
    tone = DM_TONES[tone_index % len(DM_TONES)]

    prompt = DM_USER_TEMPLATE.format(
        title=title,
        price=price,
        location=location,
        category=category,
        key_detail=key_detail,
        tone=tone,
    )

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=250,
        system=DM_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}]
    )

    dm_text = response.content[0].text.strip()
    logger.info("DM generated", title=title[:50], word_count=len(dm_text.split()))
    return dm_text


def _extract_key_detail(description: str, title: str, category: str) -> str:
    """Pull a specific detail from the listing to personalize the DM."""
    if not description:
        return f"the {category.lower()}"

    desc_lower = description.lower()

    # Category-specific detail extraction
    if category == "RV":
        for keyword in ["slide", "miles", "generator", "solar", "tow"]:
            if keyword in desc_lower:
                return f"the {keyword} feature"
    elif category == "boat":
        for keyword in ["motor", "trailer", "hours", "live well", "trolling"]:
            if keyword in desc_lower:
                return f"the {keyword}"
    elif category == "classic car":
        for keyword in ["original", "restored", "engine", "numbers matching"]:
            if keyword in desc_lower:
                return keyword
    elif category == "heavy equipment":
        for keyword in ["hours", "attachments", "hydraulic", "cab"]:
            if keyword in desc_lower:
                return f"the {keyword}"

    # Fallback: use first 30 chars of description
    return description[:30].strip() if description else f"your {category.lower()}"


async def generate_followup_dm(
    original_dm: str,
    seller_question: str,
    title: str,
    price: float,
) -> str:
    """
    Generate a response to a seller's question about our service.
    Handles common objections and questions automatically.
    """
    system = """You handle follow-up messages for a marketplace listing service.
Our service: we cross-post items to 10-15 platforms. No upfront cost. We earn the difference if sold above asking.

Common questions and how to answer:
- "Which platforms?" → RVTrader, eBay Motors, Boats.com, Craigslist, AutoTrader, and regional Facebook groups + niche forums
- "How do you get paid?" → Only if/when it sells above your asking price. You get your full price.
- "Is this legit?" → We send a simple listing agreement for you to sign. Takes 2 min.
- "How long does it take?" → Listings go live within 24-48 hours of agreement.
- "Do I need to do anything?" → No. We handle all listings, photos, and buyer inquiries.

Keep replies under 80 words. Be direct and honest."""

    prompt = f"""Seller asked: "{seller_question}"

Context:
- Item: {title}
- Price: ${price:,.0f}
- Original DM we sent: "{original_dm[:200]}"

Write a natural, helpful reply."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=200,
        system=system,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text.strip()
