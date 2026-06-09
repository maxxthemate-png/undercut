"""Customer lifecycle email copy → (subject, html). Founder voice, plain-ish HTML.
Links point at settings.PUBLIC_APP_URL. Kept here so routes/services stay thin."""
from ..utils.settings import settings


def _app() -> str:
    return (getattr(settings, "PUBLIC_APP_URL", None) or "https://undercut-nu.vercel.app").rstrip("/")


def _wrap(inner: str) -> str:
    return (
        '<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;color:#222;line-height:1.55">'
        f"{inner}"
        '<p style="color:#888;font-size:12px;margin-top:28px">— Maxx, Undercut · '
        f'<a href="{_app()}">undercut</a><br>'
        "Don’t want these? Just reply and I’ll take you off.</p></div>"
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
