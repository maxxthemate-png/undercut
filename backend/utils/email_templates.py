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
            f'<p>P.S. — know another eBay seller? <a href="{app}/dashboard#referral-card">Refer them</a> and you both get a free month when they upgrade.</p>'
        ),
    )


def lead_guide_email():
    """Sent IMMEDIATELY on lead capture — the tool pages promise "we'll email it",
    so this has to actually contain the guide, not a pitch with a link."""
    app = _app()
    return (
        "Your eBay price-floor guide (the 4-line formula)",
        _wrap(
            "<p>Here it is — the whole thing, no course, no upsell.</p>"
            "<p><b>The floor formula.</b> For any listing, the lowest price you can accept is:</p>"
            '<pre style="background:#f6f7f9;padding:12px 14px;border-radius:6px;font-size:13px;'
            'white-space:pre-wrap;line-height:1.5">item cost\n'
            "+ eBay final value fee (~13.25% of total incl. shipping, most categories)\n"
            "+ payment/fixed fee ($0.30 per order)\n"
            "+ your shipping cost (if free shipping)\n"
            "+ the smallest profit you'll accept\n"
            "= YOUR FLOOR</pre>"
            "<p><b>Worked example.</b> A $22 item, $6 to ship free, $5 minimum profit: "
            "22 + 6 + 5 = $33 of hard cost and target. Divide by (1 − 0.1325) to cover the fee "
            "on the whole sale, then add $0.30 → floor ≈ <b>$38.35</b>. Below that you are paying "
            "to make the sale.</p>"
            "<p><b>Three mistakes that cost sellers real money:</b></p>"
            "<p>1. Flooring at item cost only. The fee is charged on the total including shipping, "
            "so a cost-only floor loses money on every free-shipping sale.<br>"
            "2. One floor across all conditions. Used and refurb inventory has different cost bases; "
            "a single formula quietly sells your good stock too cheap.<br>"
            "3. Automating without a floor at all. Any repricer without a hard floor will follow a "
            "competitor's clearance sale straight down.</p>"
            "<p><b>The one rule to keep:</b> the floor is a hard stop, not a suggestion. If a "
            "competitor goes below your floor, the correct move is to lose that sale — not to match it.</p>"
            f'<p>Run your own numbers here: <a href="{app}/ebay-fee-calculator">free fee + floor calculator</a>. '
            f'If you want this enforced automatically across your whole store, that is what '
            f'<a href="{app}/signup">Undercut</a> does (14 days free, no card).</p>'
            "<p>Reply and tell me what you sell — I read every reply and I'll tell you straight "
            "whether automated repricing is even worth it for your inventory.</p>"
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


def activation_no_store_email():
    app = _app()
    return (
        "Your Undercut trial is running — but your store isn't connected",
        _wrap(
            "<p>Quick nudge: your trial clock is ticking but Undercut can't see your listings yet, "
            "so it isn't doing anything for you.</p>"
            f'<p>Connecting takes about 30 seconds: <a href="{app}/dashboard">connect your eBay store →</a></p>'
            "<p>Worth knowing before you click: connecting only <i>imports</i> your listings. "
            "Nothing reprices until you set a floor and switch it on, one listing at a time. "
            "There is no way for it to touch a price you haven't approved a floor for.</p>"
        ),
    )


def activation_import_failed_email():
    """The highest-value email in the system: this seller connected successfully and
    got zero listings, which is our bug, not theirs. Own it and offer a real fix."""
    app = _app()
    return (
        "Your listings didn't import — that's on us",
        _wrap(
            "<p>I can see your eBay store connected fine, but no listings came through. "
            "That's a problem on our end, not something you did wrong.</p>"
            "<p>eBay's listing API has been throwing intermittent errors, and retrying usually "
            f'clears it: <a href="{app}/dashboard">hit "Retry import" on your dashboard →</a></p>'
            "<p>If it fails again, just reply to this email and tell me your eBay seller name. "
            "I'll dig into the actual error and get your listings in myself — and I'll extend your "
            "trial so you don't lose days to our bug.</p>"
            "<p>Sorry for the wasted trip.</p>"
        ),
    )


def activation_no_floors_email(count: int):
    app = _app()
    n = f"{count} listing{'s' if count != 1 else ''}"
    return (
        f"Your {n} imported — one step left before repricing starts",
        _wrap(
            f"<p>Good news: {n} imported successfully. One thing stands between that and "
            "automatic repricing — a floor.</p>"
            "<p><b>Nothing reprices without a floor.</b> That's deliberate: the floor is the hard "
            "stop that keeps automation from ever selling below your minimum. No floor, no action.</p>"
            "<p>The number to use: item cost + eBay fees (~13.25% + $0.30) + shipping + the smallest "
            "profit you'll take. Start with your best sellers — you don't have to do all of them.</p>"
            f'<p><a href="{app}/dashboard">Set your floors →</a> · '
            f'<a href="{app}/ebay-fee-calculator">calculate them first →</a></p>'
        ),
    )


def trial_ending_no_value_email(days_left: int):
    """Trial expiring having delivered ZERO reprices. Asking for money here reads as
    tone-deaf; the honest move is to own it and offer more time."""
    app = _app()
    when = "tomorrow" if (days_left or 0) <= 1 else f"in {days_left} days"
    return (
        f"Your trial ends {when} and Undercut never got to run",
        _wrap(
            f"<p>Straight talk: your trial ends {when}, and looking at your account, Undercut never "
            "actually repriced anything for you. So I'm not going to ask you to pay for it.</p>"
            "<p>Usually this means the listing import didn't complete, or floors were never set "
            "(nothing reprices without a floor — that's the safety design).</p>"
            f'<p>If you want to give it a real shot: <a href="{app}/dashboard">open your dashboard →</a> '
            "and reply to this email. Tell me where it got stuck and I'll fix it on my end and extend "
            "your trial by another 14 days, no charge.</p>"
            "<p>And if it's just not for you, no hard feelings — you'll drop to the free plan "
            "automatically and nothing gets charged.</p>"
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


def referral_credit_email():
    app = _app()
    return (
        "Someone you referred just upgraded — you earned a free month 🎉",
        _wrap(
            "<p>Good news: a seller you referred to Undercut just moved to a paid plan.</p>"
            "<p>A <b>$29 credit</b> (one Starter month) was just added to your account — it applies "
            "automatically to your next invoice. They got a free month too.</p>"
            f'<p>Keep sharing your link for more free months: <a href="{app}/dashboard">grab it from your dashboard →</a></p>'
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
