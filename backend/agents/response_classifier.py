"""
ListingArb — Response Classifier Agent
Classifies seller replies to determine next action.
Routes interested sellers to human escalation.
Auto-responds to common questions.
"""

import json
import anthropic
from ..utils.settings import settings
from ..utils.logging import get_logger
from ..utils.llm import extract_json
from ..models.models import SellerResponseType

logger = get_logger(__name__)

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)


CLASSIFIER_SYSTEM = """Classify a seller's reply to a marketplace listing outreach DM.

Respond with JSON only:
{
  "classification": "<INTERESTED | NOT_INTERESTED | QUESTION | NEGOTIATING | SPAM>",
  "confidence": <0.0-1.0>,
  "sentiment": "<positive | neutral | negative>",
  "key_intent": "<one sentence describing what the seller wants>",
  "suggested_action": "<escalate_human | auto_reply | close | wait>"
}

Classification guide:
- INTERESTED: seller wants to proceed, says yes, asks how to start
- NOT_INTERESTED: explicit no, stop messaging, already sold
- QUESTION: asking about our service, platforms, fees, process
- NEGOTIATING: wants to discuss terms, fee, asking price
- SPAM: unrelated message, auto-reply from seller, gibberish"""


async def classify_response(
    seller_message: str,
    our_original_dm: str = "",
    listing_title: str = "",
) -> dict:
    """
    Classify a seller's reply and determine next action.
    Returns classification dict.
    """
    context = ""
    if our_original_dm:
        context = f"\nContext - Our DM: \"{our_original_dm[:150]}\"\nItem: {listing_title}"

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=200,
        system=CLASSIFIER_SYSTEM,
        messages=[{
            "role": "user",
            "content": f"Seller replied: \"{seller_message}\"{context}"
        }]
    )

    try:
        result = extract_json(response.content[0].text)
        logger.info(
            "Response classified",
            classification=result.get("classification"),
            confidence=result.get("confidence"),
        )
        return result
    except json.JSONDecodeError:
        logger.error("Classifier returned invalid JSON")
        return {
            "classification": "QUESTION",
            "confidence": 0.5,
            "sentiment": "neutral",
            "key_intent": "Unable to classify — manual review needed",
            "suggested_action": "escalate_human",
        }


def map_to_seller_response_type(classification: str) -> SellerResponseType:
    mapping = {
        "INTERESTED": SellerResponseType.INTERESTED,
        "NOT_INTERESTED": SellerResponseType.NOT_INTERESTED,
        "QUESTION": SellerResponseType.QUESTION,
        "NEGOTIATING": SellerResponseType.NEGOTIATING,
        "SPAM": SellerResponseType.NO_RESPONSE,
    }
    return mapping.get(classification, SellerResponseType.NO_RESPONSE)
