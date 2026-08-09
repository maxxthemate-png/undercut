import Link from 'next/link'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import CtaBanner from '../_components/CtaBanner'
import JsonLd from '../_components/JsonLd'
import { TRACKED_PRODUCTS } from '../_content/tracked-products'
import { pageMeta, DEFAULT_CTA, BASE_URL } from '../_content/shared'

export const metadata = pageMeta(
  `eBay Price Tracker: Live Lowest Prices on ${TRACKED_PRODUCTS.length} Popular Resale Items`,
  'Track the lowest live eBay price on consoles, sneakers, trading cards, LEGO, and more — updated daily with price history. Free, no signup required.',
  '/ebay-price-tracker'
)

const ITEM_LIST_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'eBay price trackers',
  numberOfItems: TRACKED_PRODUCTS.length,
  itemListElement: TRACKED_PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `${BASE_URL}/ebay-price-tracker/${p.slug}`,
  })),
}

export default function Page() {
  const cats = Array.from(new Set(TRACKED_PRODUCTS.map((p) => p.category)))
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Free — live eBay data, updated daily</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Price Tracker</h1>
        <p className="mt-4 text-muted">
          The lowest live eBay price on {TRACKED_PRODUCTS.length} popular resale items, with daily
          price history. Built on the same competitor-low lookup the Undercut repricer runs for sellers 24/7.
        </p>
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-14">
        {cats.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="text-lg font-bold capitalize mb-3">{cat}</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {TRACKED_PRODUCTS.filter((p) => p.category === cat).map((p) => (
                <li key={p.slug}>
                  <Link href={`/ebay-price-tracker/${p.slug}`} className="block px-3 py-2 rounded-lg border border-line text-cut hover:bg-wash transition">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-xs text-muted mt-6">
          Prices from eBay&apos;s public Browse API; snapshots taken daily. Not affiliated with eBay Inc.
          Want an item tracked? It&apos;s the same engine sellers use on their own listings — <Link href="/signup" className="text-cut">start free</Link>.
        </p>
      </section>
      <CtaBanner heading={DEFAULT_CTA.heading} sub={DEFAULT_CTA.sub} />
      <Footer />
      <JsonLd data={ITEM_LIST_LD} />
    </div>
  )
}
