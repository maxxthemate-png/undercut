import type { MetadataRoute } from 'next'
import { allPages } from './_content/registry'

const BASE = 'https://undercut-nu.vercel.app'

// Public, indexable routes. Keep in sync as new marketing pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const STATIC = ['', '/pricing', '/compare', '/streetpricer-alternative', '/repricerexpress-alternative', '/free-ebay-repricer', '/ebay-repricing-software', '/ebay-profit-calculator', '/ebay-fee-calculator', '/ebay-price-checker', '/ebay-sell-through-rate-calculator', '/ebay-best-offer-calculator', '/guides', '/alternatives', '/glossary', '/repricers', '/changelog', '/guides/ebay-price-floor', '/about', '/contact', '/privacy', '/terms', '/refund-policy', '/signup', '/login']
  const generated = allPages().map((p) => `/${p.collection}/${p.slug}`)
  const routes = [...STATIC, ...generated.filter((r) => !STATIC.includes(r))]
  return routes.map((p) => ({
    url: BASE + (p || '/'),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : p === '/pricing' ? 0.9 : ['/login', '/privacy', '/terms', '/refund-policy'].includes(p) ? 0.3 : 0.8,
  }))
}
