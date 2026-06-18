import Link from 'next/link'
import Checker from './checker'
import LeadForm from '../lead-form'
import Faq from '../_components/Faq'
import Footer from '../_components/Footer'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Price Checker — See the Lowest Live Price for Any Item',
  'Check the lowest live eBay price for any product in seconds — real listings, real prices. Then see what you’d need to charge to win the sale without losing margin.',
  '/ebay-price-checker'
)

const FAQ = [
  {
    q: 'How does the eBay price checker work?',
    a: 'It queries live eBay listings for your search term, sorted by price, and shows the lowest current price, how many competing listings exist, and the cheapest individual listings. It is the same competitor-low lookup the Undercut repricer runs for its users automatically.',
  },
  {
    q: 'Why does the lowest price matter so much on eBay?',
    a: 'For commodity items, eBay buyers sort by price + shipping, so the cheapest credible listing wins most of the sales. If you are priced above the lowest competitor you lose velocity; if you chase them blindly you lose margin. The answer is repricing with a floor: beat the competitor only while it is still profitable.',
  },
  {
    q: 'How often do eBay prices change?',
    a: 'In competitive categories the lowest price can change many times a day as sellers undercut each other or sell out. That is why checking manually does not scale past a handful of listings — automated repricers re-check around the clock.',
  },
  {
    q: 'What should I do if the lowest price is below my cost?',
    a: 'Do not follow it down. Compute your break-even floor (cost + shipping + fees) and hold there — sellers chasing a below-cost competitor lose money on every sale. Undercut enforces that floor automatically: it undercuts when profitable and stops dead at your minimum.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-[#EE2B1C]">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/ebay-fee-calculator" className="text-gray-600 hover:text-gray-900">Fee calculator</Link>
            <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Free tool — live eBay data, no signup</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Price Checker</h1>
        <p className="mt-4 text-gray-600">Paste your <b>eBay listing URL</b> and see the lowest competitor on that exact item — plus what Undercut would price it at to win the sale, without ever dropping below your floor.</p>
      </section>

      <section className="px-6 pb-12">
        <Checker />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Checking prices by hand doesn&apos;t scale</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            Every search above is a snapshot: the lowest price on eBay changes constantly as competitors undercut each other, run sales, or sell out. If you sell anything with competition, the listing that wins this morning can be overpriced by tonight. Sellers either babysit their listings, or they automate it.
          </p>
          <p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Undercut</Link> runs this exact lookup for every listing you have, around the clock, and reprices you a penny under the lowest competitor — but never below the per-item <Link href="/guides/ebay-price-floor" className="text-blue-600 hover:text-blue-700 font-medium">price floor</Link> you set. Work out that floor with the <Link href="/ebay-fee-calculator" className="text-blue-600 hover:text-blue-700 font-medium">fee calculator</Link>, connect your store in one click, and stop checking prices by hand.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Put this on autopilot.</h2>
        <p className="text-gray-600 mt-2 mb-5">Undercut watches the lowest competitor on every listing and reprices you to win — floor-protected. Start free, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
        </div>
        <p className="text-sm text-gray-500 mb-3">Not ready? Get early access + founding pricing:</p>
        <LeadForm source="price-checker" />
      </section>

      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
