// Append an entry every time something user-visible ships. Rendered at /changelog.
export interface ChangelogEntry {
  date: string // YYYY-MM-DD
  title: string
  blurb: string
}

export const changelog: ChangelogEntry[] = [
  { date: '2026-06-10', title: 'Sell-through + Best Offer calculators', blurb: 'Two new free tools: check whether your inventory is actually moving, and compute the minimum Best Offer worth accepting (with auto-accept/decline thresholds).' },
  { date: '2026-06-10', title: 'Password reset + one-click unsubscribe', blurb: 'Account recovery from the login page, and every email now carries a working one-click unsubscribe link.' },
  { date: '2026-06-10', title: 'Fair-use plan enforcement', blurb: 'Repricing volume and frequency now match your plan exactly — and dunning grace periods mean a failed card never instantly cuts you off.' },
  { date: '2026-06-09', title: 'Live eBay Price Checker', blurb: 'Free tool: see the lowest live eBay price for any product — the same competitor-low lookup the repricer runs automatically.' },
  { date: '2026-06-09', title: 'eBay Fee Calculator (2026 rates)', blurb: 'Free tool: final value fees by category, per-order fees, Promoted Listings — and your break-even floor.' },
  { date: '2026-06-09', title: 'Annual plans', blurb: 'Pay yearly and get about two months free on Starter, Pro, and Scale.' },
  { date: '2026-06-09', title: '30+ guides, comparisons & glossary', blurb: 'A full library on repricing strategy, price floors, fees, and category-specific playbooks.' },
  { date: '2026-06-08', title: 'Lead nurture + lifecycle emails', blurb: 'Welcome, trial reminders, and a weekly “what your repricer did” digest (coming with your first reprices).' },
  { date: '2026-06-07', title: 'eBay OAuth hardening + token encryption', blurb: 'Signed 15-minute OAuth state and seller tokens encrypted at rest (AES/Fernet).' },
  { date: '2026-06-06', title: 'Stripe billing live', blurb: 'Real subscriptions: Free, Starter $29, Pro $79, Scale $199 — 14-day Starter trial, no card.' },
  { date: '2026-06-04', title: 'Undercut launches', blurb: 'Floor-first automated eBay repricing: beat the lowest competitor, never below your minimum.' },
]
