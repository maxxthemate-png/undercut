"""Generates the listing-agreement PDF a seller signs before we cross-post.

Pure reportlab — needs no external API keys, so it works out of the box.
PDFs are written under backend/static/contracts/ and served by the API's
/static mount, so the returned URL is directly downloadable.
"""
import os
from datetime import datetime

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..models.models import Listing
from .listing_service import _session, _uuid

logger = get_logger(__name__)

# backend/static/contracts  (served at /static/contracts by api.main)
_BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTRACT_DIR = os.path.join(_BACKEND_DIR, "static", "contracts")
PUBLIC_BASE = os.environ.get("PUBLIC_BASE_URL", "http://localhost:8000")


def _agreement_clauses(operator: str, listing_title: str, asking: float) -> list[str]:
    return [
        f"This Listing Agreement is entered into as of {datetime.utcnow():%B %d, %Y} "
        f'between {operator} ("Lister") and the undersigned seller ("Seller").',
        f'<b>1. Item.</b> Seller authorizes Lister to advertise and market the following item: '
        f'"{listing_title}", currently offered by Seller at ${asking:,.0f} ("Asking Price").',
        "<b>2. Cross-Posting.</b> Lister will, at its own expense, list the item across additional "
        "marketplaces and platforms (e.g. eBay Motors, RVTrader, Boats.com, and relevant regional channels).",
        "<b>3. Performance-Only Fee.</b> Seller owes Lister nothing unless the item sells for more than the "
        "Asking Price. If it does, Seller receives the full Asking Price and Lister retains the difference "
        '("Lister Fee") as its sole compensation.',
        "<b>4. No Upfront Cost.</b> There are no listing fees, subscription fees, or charges of any kind to "
        "Seller. If the item does not sell above the Asking Price, Seller owes nothing.",
        "<b>5. Seller Retains Control.</b> Seller may continue to market the item independently and may "
        "withdraw it from this arrangement with written notice, provided no sale is then pending.",
        "<b>6. No Agency for Sale Terms.</b> Lister coordinates buyer interest and presents offers; final "
        "acceptance of any offer at or above the Asking Price remains at Seller's discretion.",
        "<b>7. Term.</b> This Agreement remains in effect for 90 days from signing unless renewed or "
        "terminated earlier under Section 5.",
    ]


async def generate_listing_agreement(listing_id: str) -> str:
    """Render the agreement PDF for a listing and return a downloadable URL."""
    os.makedirs(CONTRACT_DIR, exist_ok=True)

    title, asking, seller_name = "Marketplace Item", 0.0, "Seller"
    with _session() as db:
        listing = db.get(Listing, _uuid(listing_id))
        if listing:
            title = listing.title or title
            asking = float(listing.price or 0)
            if listing.seller and listing.seller.name:
                seller_name = listing.seller.name

    filename = f"agreement_{listing_id}.pdf"
    path = os.path.join(CONTRACT_DIR, filename)
    operator = settings.OPERATOR_LEGAL_NAME or "ListingArb LLC"

    styles = getSampleStyleSheet()
    body = ParagraphStyle("body", parent=styles["Normal"], fontSize=10.5, leading=15, spaceAfter=10)
    doc = SimpleDocTemplate(path, pagesize=LETTER,
                            topMargin=0.9 * inch, bottomMargin=0.9 * inch,
                            leftMargin=1 * inch, rightMargin=1 * inch,
                            title=f"Listing Agreement — {title}")
    story = [Paragraph("LISTING AGREEMENT", styles["Title"]), Spacer(1, 0.25 * inch)]
    for clause in _agreement_clauses(operator, title, asking):
        story.append(Paragraph(clause, body))
    story += [
        Spacer(1, 0.5 * inch),
        Paragraph("Agreed and accepted:", body),
        Spacer(1, 0.4 * inch),
        Paragraph(f"Seller: {seller_name}&nbsp;" + "_" * 30 + "&nbsp;&nbsp;Date: " + "_" * 14, body),
        Spacer(1, 0.3 * inch),
        Paragraph(f"Lister ({operator}): " + "_" * 28 + "&nbsp;&nbsp;Date: " + "_" * 14, body),
        Spacer(1, 0.4 * inch),
        Paragraph(f"Operator address: {settings.OPERATOR_ADDRESS}",
                  ParagraphStyle("small", parent=body, fontSize=8, textColor="#666666")),
    ]
    doc.build(story)

    url = f"{PUBLIC_BASE}/static/contracts/{filename}"
    logger.info("Listing agreement generated", listing_id=listing_id, path=path)
    return url
