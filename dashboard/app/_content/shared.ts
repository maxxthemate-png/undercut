// Canonical brand / offer constants — single source of truth for every
// generated page, so the offer copy is changed in ONE place.

export const BRAND = 'Undercut'
export const BASE_URL = 'https://undercut-nu.vercel.app'

export const OFFER = 'Start free — 14-day trial, no card'
export const POSITIONING =
  'Undercut automatically beats the lowest competitor — but never drops below the per-item floor you set.'

export const PLANS = [
  { name: 'Free', price: '$0', listings: '25 listings' },
  { name: 'Starter', price: '$29', listings: '100 listings' },
  { name: 'Pro', price: '$79', listings: '1,000 listings' },
  { name: 'Scale', price: '$199', listings: '10,000 listings' },
]

export const DEFAULT_CTA = {
  heading: 'Win the sale without losing margin.',
  sub: '14-day Starter trial, no card. Undercut competitors automatically — never below your minimum.',
}
