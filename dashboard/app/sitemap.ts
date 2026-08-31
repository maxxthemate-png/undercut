import type { MetadataRoute } from 'next'
import { allPages } from './_content/registry'
import { TRACKED_PRODUCTS } from './_content/tracked-products'
import { changelog } from './_content/changelog'

const BASE = 'https://undercutpricer.com'

// Without this the sitemap is prerendered once and every date below freezes at
// the last deploy. Frontend deploys here are MANUAL (git auto-deploy is off, see
// DEPLOY.md), so that could be weeks stale while the tracker entries claim
// changeFrequency 'daily'. ISR re-renders it daily on the running deployment,
// which is what makes the tracker lastModified below actually true.
export const revalidate = 86400

// Static marketing pages have no per-page date, so they inherit the newest
// changelog entry: the closest honest proxy for "when the site last changed".
const SITE_UPDATED = changelog[0]?.date || '2026-06-04'

// Tracker pages genuinely change every day, the snapshot cron rewrites them.
// Evaluated per render, so it is the last-revalidation date (at most 24h old
// given the revalidate above), not a guarantee of "right now".
const TODAY = () => new Date().toISOString().slice(0, 10)

// Public, indexable routes. Keep in sync as new marketing pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const STATIC = ['', '/pricing', '/compare', '/streetpricer-alternative', '/repricerexpress-alternative', '/inkfrog-alternative', '/inkfrog-migration', '/free-ebay-repricer', '/ebay-repricing-software', '/ebay-profit-calculator', '/ebay-fee-calculator', '/ebay-price-checker', '/ebay-sell-through-rate-calculator', '/ebay-best-offer-calculator', '/ebay-repricing-lag-calculator', '/guides', '/alternatives', '/glossary', '/repricers', '/changelog', '/guides/ebay-price-floor', '/about', '/contact', '/privacy', '/terms', '/refund-policy', '/signup', '/login']
  const LEGAL = ['/privacy', '/terms', '/refund-policy']

  // Per-page lastUpdated from the content registry, keyed by route.
  const registry = allPages().map((p) => ({ route: `/${p.collection}/${p.slug}`, lastUpdated: p.lastUpdated }))
  const registryDates: Record<string, string> = {}
  for (const r of registry) registryDates[r.route] = r.lastUpdated
  const generated = registry.map((r) => r.route)
  const tracker = ['/ebay-price-tracker', ...TRACKED_PRODUCTS.map((p) => `/ebay-price-tracker/${p.slug}`)]
  const routes = [...STATIC, ...generated.filter((r) => !STATIC.includes(r)), ...tracker]

  const today = TODAY()
  return routes.map((p) => {
    const isTracker = p.startsWith('/ebay-price-tracker')
    const lastModified = registryDates[p] || (isTracker ? today : SITE_UPDATED)
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
      isTracker ? 'daily' : LEGAL.includes(p) ? 'monthly' : 'weekly'
    return {
      url: BASE + (p || '/'),
      lastModified,
      changeFrequency,
      priority: p === '' ? 1 : p === '/pricing' ? 0.9 : ['/login', '/privacy', '/terms', '/refund-policy'].includes(p) ? 0.3 : 0.8,
    }
  })
}
