import Link from 'next/link'
import Calculator from './calculator'
import LeadForm from '../lead-form'
import Faq from '../_components/Faq'
import Footer from '../_components/Footer'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Fee Calculator (2026) — Final Value Fees, Profit & Break-Even',
  'Calculate exactly what eBay takes from a sale — final value fee, per-order fee, Promoted Listings — plus your real profit and break-even floor. Free, no signup.',
  '/ebay-fee-calculator'
)

const FAQ = [
  {
    q: 'How much does eBay take per sale in 2026?',
    a: 'For most categories, standard (non-store) sellers pay a final value fee of about 13.6% of the total sale — item price plus shipping plus sales tax — plus a per-order fee of $0.30 on orders of $10 or less, or $0.40 on orders over $10. Category rates range from roughly 3% to 15.3%, and optional Promoted Listings add your chosen ad rate on top.',
  },
  {
    q: 'Does eBay charge fees on shipping?',
    a: 'Yes. The final value fee applies to the total amount of the sale, which includes the shipping you charge the buyer and the sales tax eBay collects — not just the item price. Charging high shipping does not avoid fees.',
  },
  {
    q: 'What is the per-order fixed fee?',
    a: 'On top of the percentage fee, eBay charges a flat fee per order: $0.30 for orders of $10 or less and $0.40 for orders over $10. On low-priced items this flat fee meaningfully raises your effective fee percentage.',
  },
  {
    q: 'How do I calculate my break-even price on eBay?',
    a: 'Your break-even price is the price where revenue minus eBay fees minus item and shipping costs equals zero: (item cost + shipping cost + per-order fee) ÷ (1 − fee rate − ad rate) − shipping charged. Selling below it loses money on every sale — that number is exactly the per-item price floor a repricer should never cross.',
  },
  {
    q: 'Do eBay Store subscriptions lower fees?',
    a: 'Yes, in many categories Store subscribers pay a slightly lower final value fee rate, and Top Rated Sellers can earn discounts. This calculator uses typical standard rates — edit the fee percentage field to match your exact rate from eBay’s fee page.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-[#EE2B1C]">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/ebay-profit-calculator" className="text-gray-600 hover:text-gray-900">Profit calculator</Link>
            <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Free tool — no signup</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Fee Calculator</h1>
        <p className="mt-4 text-gray-600">See exactly what eBay takes from a sale — final value fee, per-order fee, and Promoted Listings — and what you actually keep. Then find the <b>break-even floor</b> you should never price below.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <Calculator />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">How eBay fees work in 2026</h2>
        <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
          <p>
            When your item sells, eBay charges a <b>final value fee</b>: a percentage of the <i>total</i> amount the buyer pays — item price, shipping, and sales tax combined. For most categories the standard rate is around <b>13.6%</b>, but it ranges from about 3% (select business &amp; industrial) to 15.3% (books, movies &amp; music). On top of that, every order carries a fixed <b>per-order fee</b> of $0.30 (orders ≤ $10) or $0.40 (orders over $10).
          </p>
          <p>
            If you use <b>Promoted Listings</b>, your chosen ad rate is charged on the sale as well, and international sales add roughly 1.65%. A &ldquo;13.6% fee&rdquo; listing can easily cost 16–18% all-in — which is why sellers who price by gut feel often make less than they think, and why undercutting a competitor by too much can silently push a sale <i>below break-even</i>.
          </p>
          <p>
            The blue box above computes that break-even — your <b>price floor</b>. It is the single most important number in repricing: compete as hard as you want above it, never cross it. That is exactly how <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Undercut</Link> reprices: it beats the lowest competitor automatically, 24/7, and stops dead at the floor you set per item. Read the full method in our <Link href="/guides/ebay-price-floor" className="text-blue-600 hover:text-blue-700 font-medium">price-floor guide</Link>, or work a full deal end-to-end in the <Link href="/ebay-profit-calculator" className="text-blue-600 hover:text-blue-700 font-medium">repricing profit calculator</Link>.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Stop doing this math by hand.</h2>
        <p className="text-gray-600 mt-2 mb-5">Undercut reprices every listing to beat the lowest competitor and never crosses your break-even floor. Start free — 14-day trial, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — no card</Link>
        </div>
        <p className="text-sm text-gray-500 mb-3">Not ready? Get early access + founding pricing:</p>
        <LeadForm source="fee-calculator" />
      </section>

      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
