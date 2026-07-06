"""Customer lifecycle email copy → (subject, html). Founder voice, plain-ish HTML.
Links point at settings.PUBLIC_APP_URL. Kept here so routes/services stay thin."""
import html

from ..utils.settings import settings


def _app() -> str:
    return (getattr(settings, "PUBLIC_APP_URL", None) or "https://undercutpricer.com").rstrip("/")


def _wrap(inner: str) -> str:
    return (
        '<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;color:#222;line-height:1.55">'
        f"{inner}"
        '<p style="color:#888;font-size:12px;margin-top:28px">— Maxx, Undercut · '
        f'<a href="{_app()}">undercut</a><br>'
        "Reply anytime — or use the unsubscribe link below.</p></div>"
    )


def welcome_email():
    app = _app()
    return (
        "Welcome to Undercut — let’s turn on repricing",
        _wrap(
            "<p>You’re in 🎉 Undercut reprices your eBay listings to beat the lowest competitor — "
            "but never below the floor you set, so it can’t race your prices to the bottom.</p>"
            "<p>One step to turn it on: connect your eBay store (1 click) so we can import your listings.</p>"
            f'<p><a href="{app}/dashboard">Connect your store →</a></p>'
            "<p>Your 14-day Starter trial is live (100 listings, no card). Reply if you’d like help setting floors.</p>"
        ),
    )


def lead_drip_day1():
    app = _app()
    return (
        "Your eBay prices, on autopilot (with a floor)",
        _wrap(
            "<p>Thanks for checking out Undercut. The short version: it undercuts the lowest competitor "
            "automatically, but a hard floor means it can never sell below the minimum you set.</p>"
            f'<p>Start free in ~2 minutes (no card): <a href="{app}/signup">{app}/signup</a></p>'
            "<p>Reply with what you sell and I’ll tell you straight whether it’s a fit.</p>"
        ),
    )


def lead_drip_day3():
    app = _app()
    return (
        "The one repricer setting that matters",
        _wrap(
            "<p>The setting I’d never automate without: a <b>hard floor</b> = cost + fees + the smallest margin "
            "you’ll accept. Set it once and the tool only ever competes <i>above</i> it.</p>"
            f'<p>Try it on your own listings — 14-day Starter trial, no card: <a href="{app}/signup">{app}/signup</a></p>'
        ),
    )


def lead_drip_day7():
    app = _app()
    return (
        "How much is manual repricing costing you?",
        _wrap(
            "<p>Repricing by hand means either losing the sale to undercutters or burning hours chasing them. "
            "Undercut does it 24/7, always clamped to your floor.</p>"
            f'<p>Comparing tools? Here’s the honest rundown: <a href="{app}/compare">{app}/compare</a></p>'
        ),
    )


def demo_followup(note: str | None = None):
    """First touch for a lead who used the public price-checker demo. Leads with
    their own checked result (note) when we have it, so it reads like a personal
    follow-up, not a generic drip."""
    app = _app()
    ctx = (
        f'<p style="background:#f5f7ff;border-left:3px solid #2563eb;padding:10px 14px;'
        f'border-radius:6px;color:#333">{html.escape(note)}</p>'
        if note else ""
    )
    return (
        "About that listing you just checked",
        _wrap(
            "<p>You just ran a listing through the Undercut price checker. Here’s what it’s really showing you:</p>"
            + ctx +
            "<p>That’s <i>one</i> listing. Undercut does this across your whole store, around the clock — it beats "
            "the lowest competitor automatically, but a hard floor means it can never sell below the minimum you set. "
            "No more racing to the bottom while you sleep.</p>"
            f'<p>Put your store on autopilot — 14-day trial, no card: <a href="{app}/signup">{app}/signup</a></p>'
            "<p>Reply and tell me what you sell — I’ll tell you straight whether it’s a fit.</p>"
        ),
    )


def trial_ending_email(days_left: int):
    app = _app()
    when = "tomorrow" if (days_left or 0) <= 1 else f"in {days_left} days"
    return (
        f"Your Undercut trial ends {when}",
        _wrap(
            f"<p>Your Starter trial ends {when}. After that you stay on the Free plan (25 listings) unless you upgrade.</p>"
            f'<p>If Undercut’s been winning you sales, keep the momentum: <a href="{app}/dashboard">pick a plan →</a></p>'
            "<p>Not the right time? No action needed — you’ll drop to Free automatically.</p>"
        ),
    )


def trial_expired_email():
    app = _app()
    return (
        "Your trial ended — you’re on the Free plan",
        _wrap(
            "<p>Your trial wrapped up, so you’re now on the Free plan (25 listings, hourly repricing, hard floor).</p>"
            f'<p>Want the full power back — more listings, AI tuning, 15-minute repricing? <a href="{app}/dashboard">Upgrade anytime →</a></p>'
        ),
    )


def magic_login_email(link: str):
    return (
        "Your Undercut sign-in link",
        _wrap(
            "<p>Here’s your one-click sign-in link for Undercut:</p>"
            f'<p><a href="{link}">Sign in to Undercut →</a></p>'
            "<p>The link works for 30 minutes and signs in only this account. "
            "If you didn’t ask for it, you can ignore this email.</p>"
        ),
    )


def password_reset_email(link: str):
    return (
        "Reset your Undercut password",
        _wrap(
            "<p>Someone (hopefully you) asked to reset the password on this Undercut account.</p>"
            f'<p><a href="{link}">Choose a new password →</a></p>'
            "<p>The link works for 60 minutes. If you didn\u2019t ask for this, you can ignore it — "
            "your password is unchanged.</p>"
        ),
    )


def first_reprice_email(old_price: float, new_price: float, competitor_low: float | None):
    app = _app()
    comp = f" (lowest competitor was ${competitor_low:,.2f})" if competitor_low else ""
    return (
        "Your repricer just made its first move",
        _wrap(
            f"<p>Undercut just repriced one of your listings for the first time: "
            f"<b>${old_price:,.2f} → ${new_price:,.2f}</b>{comp} — and it stayed above the floor you set.</p>"
            "<p>This now happens around the clock, on every listing you’ve enabled. "
            f'See every change in your <a href="{app}/dashboard">price log →</a></p>'
        ),
    )


def weekly_digest_email(reprices: int, listings: int, margin_protected: float = 0.0):
    app = _app()
    money_line = (
        f"<p style=\"font-size:17px\">Undercut held <b>${margin_protected:,.2f}</b> of margin "
        f"above your floors this week.</p>" if margin_protected and margin_protected > 0 else ""
    )
    subject = (f"Undercut held ${margin_protected:,.0f} above your floors this week"
               if margin_protected and margin_protected > 0
               else f"Your Undercut week: {reprices} reprice{'s' if reprices != 1 else ''}")
    return (
        subject,
        _wrap(
            money_line +
            f"<p>This week Undercut made <b>{reprices}</b> price update{'s' if reprices != 1 else ''} "
            f"across <b>{listings}</b> of your listings — every one of them at or above your floor.</p>"
            f'<p><a href="{app}/dashboard">See the full log →</a></p>'
            "<p>Tip: listings without a floor never reprice. If you’ve added inventory, set floors on the new items.</p>"
        ),
    )


def winback_email():
    app = _app()
    return (
        "Your price floors are still saved",
        _wrap(
            "<p>Your Undercut account is still here — store connection, floors, and settings all saved. "
            "While you’ve been away, competitors keep moving their prices.</p>"
            f'<p>Pick up where you left off (Free covers 25 listings): <a href="{app}/login">log back in →</a></p>'
            "<p>Reply if something didn’t work for you — I read every reply and it shapes what I build next.</p>"
        ),
    )


def payment_failed_email():
    app = _app()
    return (
        "Action needed: your Undercut payment didn't go through",
        _wrap(
            "<p>Your latest payment failed — usually an expired or replaced card. "
            "Your repricing is still running, but it will pause if the card isn’t updated.</p>"
            f'<p><a href="{app}/dashboard">Update your card →</a> (Billing → manage subscription)</p>'
        ),
    )


def payment_retry_email():
    app = _app()
    return (
        "Reminder: update your card to keep Undercut repricing",
        _wrap(
            "<p>Quick reminder — your payment still hasn’t gone through. Stripe will keep retrying, "
            "but if it can’t charge the card your account drops to the Free plan (25 listings).</p>"
            f'<p><a href="{app}/dashboard">Fix it in 1 minute →</a></p>'
        ),
    )


def access_reduced_email():
    app = _app()
    return (
        "Repricing reduced to Free limits — restore your plan anytime",
        _wrap(
            "<p>We couldn’t collect payment, so your account is temporarily on Free limits "
            "(25 listings, hourly repricing). Nothing is deleted — floors, settings, and history are intact.</p>"
            f'<p>Update your card and everything is restored instantly: <a href="{app}/dashboard">restore my plan →</a></p>'
        ),
    )
