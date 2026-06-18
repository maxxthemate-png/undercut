// Canonical brand / offer constants — single source of truth for every
// generated page, so the offer copy is changed in ONE place.

export const BRAND = 'Undercut'
export const BASE_URL = 'https://undercut-nu.vercel.app'
export const SUPPORT_EMAIL = 'nuvent66@gmail.com'
export const FOUNDER = 'Maxx'

export const OFFER = 'Start free — 14-day trial, no card'
export const POSITIONING =
  'Undercut automatically beats the lowest competitor — but never drops below the per-item floor you set.'

// price/listings stay strings (rendered as-is by PageView/registry consumers).
// key/monthly/annual/save power the pricing page + dashboard upgrade buttons.
export const PLANS = [
  { name: 'Free', price: '$0', listings: '25 listings', key: 'free', monthly: 0, annual: 0, save: 0 },
  { name: 'Starter', price: '$29', listings: '100 listings', key: 'starter', monthly: 29, annual: 290, save: 58 },
  { name: 'Pro', price: '$79', listings: '1,000 listings', key: 'pro', monthly: 79, annual: 790, save: 158 },
  { name: 'Scale', price: '$199', listings: '10,000 listings', key: 'scale', monthly: 199, annual: 1990, save: 398 },
]

export const DEFAULT_CTA = {
  heading: 'Win the sale without losing margin.',
  sub: '14-day Starter trial, no card. Undercut competitors automatically — never below your minimum.',
}

// Factual trust badges — single source for the home page TrustSection and the
// landing-page TrustBadges strip, so the two can't drift. No fake testimonials.
export const TRUST_BADGES = [
  'eBay tokens encrypted at rest',
  'Hard-floor guarantee — never below your minimum',
  'No card required to start',
  'Billing by Stripe — cancel anytime',
]

// Standard metadata for bespoke marketing pages: canonical + OG + twitter in one call.
export function pageMeta(title: string, description: string, path: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BRAND, type: 'website' as const },
    twitter: { card: 'summary_large_image' as const, title, description },
  }
}
