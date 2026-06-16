"""
Undercut — Notification Service
Sends SMS (Twilio) and email (SendGrid) alerts to operator, plus customer
lifecycle email. Only fires when human action is needed — not for routine work.
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
            subject=f"[Undercut] {subject}",
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


def send_customer_email(to: str, subject: str, html: str, reply_to: str = None) -> bool:
    """Send a lifecycle / nurture email to a customer or lead via SendGrid.
    Dormant-safe: returns False (no send) if SendGrid isn't configured.
    NOTE: deliverability requires a VERIFIED sender for settings.FROM_EMAIL."""
    if not settings.SENDGRID_API_KEY or not to:
        logger.warning("SendGrid not configured — customer email skipped", to=to)
        return False
    try:
        import re as _re
        import sendgrid
        from sendgrid.helpers.mail import Mail, ReplyTo

        # CAN-SPAM footer appended centrally so every customer email carries a
        # working unsubscribe link + postal address, regardless of template.
        try:
            from .email_tokens import unsubscribe_url
            unsub = unsubscribe_url(to)
            if unsub:
                html += (
                    '<p style="color:#999;font-size:11px;margin-top:18px">'
                    f'<a href="{unsub}" style="color:#999">Unsubscribe</a> · '
                    f"{settings.OPERATOR_LEGAL_NAME}, {settings.OPERATOR_ADDRESS}</p>"
                )
        except Exception:
            pass

        text = _re.sub(r"<[^>]+>", "", html).strip()
        message = Mail(
            from_email=settings.FROM_EMAIL,
            to_emails=to,
            subject=subject,
            plain_text_content=text,
            html_content=html,
        )
        message.reply_to = ReplyTo(reply_to or settings.OPERATOR_EMAIL or settings.FROM_EMAIL)
        sendgrid.SendGridAPIClient(settings.SENDGRID_API_KEY).send(message)
        logger.info("Customer email sent", to=to, subject=subject)
        return True
    except Exception as e:
        logger.error("Customer email failed", error=str(e), to=to)
        return False
