"""
ListingArb — Contract Generator
Generates a simple 1-page listing agreement PDF.
Sent to seller when they agree to let us cross-post their item.
"""

from datetime import datetime, timedelta
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import os
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)


def generate_listing_agreement(
    seller_name: str,
    item_title: str,
    item_description: str,
    seller_asking_price: float,
    listing_id: str,
    output_path: str = None,
) -> str:
    """
    Generate a PDF listing agreement.
    Returns the path to the generated PDF.
    """
    if not output_path:
        output_path = f"/tmp/listing_agreement_{listing_id}.pdf"

    today = datetime.utcnow()
    expiry = today + timedelta(days=90)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=inch,
        leftMargin=inch,
        topMargin=inch,
        bottomMargin=inch,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "Title",
        parent=styles["Heading1"],
        fontSize=18,
        textColor=colors.HexColor("#1a3a5c"),
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        textColor=colors.gray,
        alignment=TA_CENTER,
        spaceAfter=20,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontSize=12,
        textColor=colors.HexColor("#1a3a5c"),
        spaceBefore=14,
        spaceAfter=4,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontSize=10,
        leading=16,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
    )
    field_style = ParagraphStyle(
        "Field",
        parent=styles["Normal"],
        fontSize=10,
        leading=16,
        spaceAfter=4,
        leftIndent=20,
    )

    story = []

    # Header
    story.append(Paragraph("MARKETPLACE LISTING AGREEMENT", title_style))
    story.append(Paragraph("Additional Platform Listing Authorization", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#e8601c")))
    story.append(Spacer(1, 0.2 * inch))

    # Parties
    story.append(Paragraph("PARTIES", section_style))
    story.append(Paragraph(
        f"<b>Listing Facilitator:</b> {settings.OPERATOR_LEGAL_NAME}, {settings.OPERATOR_ADDRESS}",
        field_style
    ))
    story.append(Paragraph(f"<b>Seller:</b> {seller_name}", field_style))
    story.append(Paragraph(
        f"<b>Agreement Date:</b> {today.strftime('%B %d, %Y')}",
        field_style
    ))
    story.append(Paragraph(
        f"<b>Expiration Date:</b> {expiry.strftime('%B %d, %Y')} (90 days)",
        field_style
    ))

    # Item
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("ITEM BEING LISTED", section_style))
    story.append(Paragraph(f"<b>Description:</b> {item_title}", field_style))
    story.append(Paragraph(
        f"<b>Additional details:</b> {item_description[:200] if item_description else 'As described by seller'}",
        field_style
    ))
    story.append(Paragraph(
        f"<b>Seller's Floor Price:</b> ${seller_asking_price:,.0f} (Seller receives this amount upon sale)",
        field_style
    ))

    # Terms
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("TERMS AND CONDITIONS", section_style))

    terms = [
        ("1. Authorization",
         f"Seller hereby authorizes {settings.OPERATOR_LEGAL_NAME} (\"Facilitator\") to list the above-described item on additional online marketplaces and classified platforms on Seller's behalf, for a period of 90 days from the Agreement Date."),
        ("2. Seller's Floor Price",
         f"Seller shall receive a minimum of ${seller_asking_price:,.0f} upon the sale of the item. This amount represents Seller's asking price and is guaranteed to Seller in full upon completion of a sale."),
        ("3. Facilitator Compensation",
         "Facilitator's sole compensation is any amount received from a buyer that exceeds Seller's Floor Price. Seller owes Facilitator nothing if the item does not sell, or if it sells at exactly the Floor Price."),
        ("4. No Upfront Cost",
         "Seller pays no fees, commissions, or costs of any kind to Facilitator unless and until a sale is completed above the Floor Price."),
        ("5. Non-Exclusivity",
         "This agreement is non-exclusive. Seller may continue to list and sell the item independently on any platform. If Seller sells the item independently, Seller will promptly notify Facilitator so listings can be removed."),
        ("6. Seller Representations",
         "Seller represents that they have clear ownership and legal right to sell the item, that all information provided about the item is accurate, and that the item will be available for sale throughout the agreement period."),
        ("7. Facilitator's Role",
         "Facilitator is acting solely as a listing and marketing service. Facilitator is not a licensed vehicle dealer, broker, or agent. The sale transaction is conducted directly between Seller and Buyer. Facilitator is not a party to the sale transaction."),
        ("8. Termination",
         "Either party may terminate this agreement at any time with written notice. Upon termination, Facilitator will remove all listings within 48 hours. No fees are owed upon termination."),
        ("9. Governing Law",
         "This agreement is governed by the laws of the state in which Seller resides."),
    ]

    for title, text in terms:
        story.append(Paragraph(f"<b>{title}.</b> {text}", body_style))

    story.append(Spacer(1, 0.3 * inch))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey))
    story.append(Spacer(1, 0.2 * inch))

    # Signature block
    story.append(Paragraph("SIGNATURES", section_style))
    story.append(Spacer(1, 0.1 * inch))

    sig_text = (
        "By signing below, both parties agree to the terms of this Listing Agreement.<br/><br/>"
        "<b>Seller Signature:</b> ______________________________ &nbsp;&nbsp;&nbsp; "
        "<b>Date:</b> _______________<br/><br/>"
        f"<b>Seller Printed Name:</b> {seller_name}<br/><br/><br/>"
        f"<b>Facilitator:</b> {settings.OPERATOR_LEGAL_NAME} &nbsp;&nbsp;&nbsp; "
        f"<b>Date:</b> {today.strftime('%m/%d/%Y')}"
    )
    story.append(Paragraph(sig_text, body_style))

    # Footer
    story.append(Spacer(1, 0.2 * inch))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey))
    footer_style = ParagraphStyle(
        "Footer", parent=styles["Normal"],
        fontSize=8, textColor=colors.grey, alignment=TA_CENTER
    )
    story.append(Paragraph(
        f"Agreement ID: {listing_id} | Generated: {today.strftime('%Y-%m-%d %H:%M UTC')} | "
        "This document is not legal advice. Consult an attorney for complex transactions.",
        footer_style
    ))

    doc.build(story)
    logger.info("Contract generated", path=output_path, listing_id=listing_id)
    return output_path
