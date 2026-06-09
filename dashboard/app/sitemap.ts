import type { MetadataRoute } from 'next'

const BASE = 'https://undercut-nu.vercel.app'

// Public, indexable routes. Keep in sync as new marketing pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/compare', '/streetpricer-alternative', '/repricerexpress-alternative', '/free-ebay-repricer', '/ebay-repricing-software', '/ebay-profit-calculator', '/guides/ebay-price-floor', '/signup', '/login']
  return routes.map((p) => ({
    url: BASE + (p || '/'),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : p === '/login' ? 0.3 : 0.8,
  }))
}
