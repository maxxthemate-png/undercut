"""
ListingArb — Notification Service
Sends SMS (Twilio) and email (SendGrid) alerts to operator.
Only fires when human action is needed — not for routine automation.
"""

from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)


def send_sms_alert(message: str) -> bool:
    """Send SMS to operator phone via Twilio."""
    if not all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN,
                settings.TWILIO_FROM_NUMBER, settings.OPERATOR_PHONE]):
        logger.warning("Twilio not configured — SMS skipped", message=message[:100])
        return False

    try:
        from twilio.rest import Client
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=message[:1600],  # SMS limit
            from_=settings.TWILIO_FROM_NUMBER,
            to=settings.OPERATOR_PHONE,
        )
        logger.info("SMS sent", chars=len(message))
        return True
    except Exception as e:
        logger.error("SMS send failed", error=str(e))
        return False


def send_email_alert(subject: str, body: str, html_body: str = None) -> bool:
    """Send email to operator via SendGrid."""
    if not all([settings.SENDGRID_API_KEY, settings.OPERATOR_EMAIL]):
        logger.warning("SendGrid not configured — email skipped")
        return False

    try:
        import sendgrid
        from sendgrid.helpers.mail import Mail

        message = Mail(
            from_email=settings.FROM_EMAIL,
            to_emails=settings.OPERATOR_EMAIL,
            subject=f"[ListingArb] {subject}",
            plain_text_content=body,
            html_content=html_body or f"<pre>{body}</pre>",
        )
        sg = sendgrid.SendGridAPIClient(settings.SENDGRID_API_KEY)
        sg.send(message)
        logger.info("Email sent", subject=subject)
        return True
    except Exception as e:
        logger.error("Email send failed", error=str(e))
        return False


def notify_seller_interested(listing_title: str, listing_id: str, price: float, upside: float):
    """High-priority alert — seller is interested."""
    send_sms_alert(
        f"LISTINGARB ALERT: Seller interested!\n"
        f"Item: {listing_title[:50]}\n"
        f"Ask: ${price:,.0f} | Est. upside: ${upside:,.0f}\n"
        f"Action needed: http://localhost:3000/deal/{listing_id}"
    )


def notify_buyer_found(listing_title: str, deal_id: str, buyer_price: float, our_fee: float):
    """Alert when a buyer is ready to transact."""
    send_sms_alert(
        f"LISTINGARB: BUYER FOUND!\n"
        f"Item: {listing_title[:50]}\n"
        f"Buyer price: ${buyer_price:,.0f}\n"
        f"Your fee: ${our_fee:,.0f}\n"
        f"Close deal: http://localhost:3000/deal/{deal_id}"
    )
