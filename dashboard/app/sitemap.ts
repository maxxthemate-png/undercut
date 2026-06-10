import type { MetadataRoute } from 'next'
import { allPages } from './_content/registry'

const BASE = 'https://undercut-nu.vercel.app'

// Public, indexable routes. Keep in sync as new marketing pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const STATIC = ['', '/compare', '/streetpricer-alternative', '/repricerexpress-alternative', '/free-ebay-repricer', '/ebay-repricing-software', '/ebay-profit-calculator', '/ebay-fee-calculator', '/guides/ebay-price-floor', '/signup', '/login']
  const generated = allPages().map((p) => `/${p.collection}/${p.slug}`)
  const routes = [...STATIC, ...generated.filter((r) => !STATIC.includes(r))]
  return routes.map((p) => ({
    url: BASE + (p || '/'),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : p === '/login' ? 0.3 : 0.8,
  }))
}
