import Link from 'next/link'
import Calculator from './calculator'
import LeadForm from '../lead-form'
import Faq from '../_components/Faq'
import Footer from '../_components/Footer'
import Nav from '../_components/Nav'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Sell-Through Rate Calculator — Is Your Inventory Moving?',
  'Calculate your eBay sell-through rate in seconds and see whether your inventory velocity is healthy — plus exactly what to do when listings stop selling.',
  '/ebay-sell-through-rate-calculator'
)

const FAQ = [
  {
    q: 'What is a good sell-through rate on eBay?',
    a: 'It varies by category, but as a rough 30-day benchmark: above 80% means demand outpaces supply, 40–80% is healthy for most resellers, 15–40% is sluggish, and below 15% means inventory is stalled. Commodity categories (media, electronics) should run higher; rare collectibles naturally run lower.',
  },
  {
    q: 'How do I calculate sell-through rate?',
    a: 'Items sold in a period divided by total items available (sold + still active), times 100. Example: 12 sold with 60 still active = 12 ÷ 72 = 16.7%. Normalize to 30 days to compare months of different lengths.',
  },
  {
    q: 'Why did my sell-through rate drop?',
    a: 'The most common cause is silent undercutting: a competitor listed the same item cheaper and is now winning the sales you used to get. Other causes include seasonality, rising shipping costs pushing your total price up, and stale listings losing Best Match rank.',
  },
  {
    q: 'How does repricing improve sell-through?',
    a: 'For price-competitive items, sitting above the lowest credible competitor costs you most of the sales. A repricer keeps you at the winning price automatically — and a floor-first repricer like Undercut does it without ever selling below your minimum, so velocity improves without margin collapse.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Free tool — no signup</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Sell-Through Rate Calculator</h1>
        <p className="mt-4 text-muted">Find out whether your inventory is actually moving — and what to do when it isn&apos;t.</p>
      </section>
      <section className="px-6 pb-12"><Calculator /></section>
      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-line">
        <h2 className="text-2xl font-bold mb-4">Low sell-through is usually a price problem</h2>
        <div className="space-y-4 text-muted text-[15px] leading-relaxed">
          <p>
            When listings stop selling, sellers blame the algorithm, the season, or the economy. Sometimes that&apos;s right. But for anything with competition, the boring explanation wins most often: <b>someone listed it cheaper, and buyers found them first</b>. Your listing didn&apos;t get worse — your price stopped being the winning price.
          </p>
          <p>
            The fix isn&apos;t panic-slashing. Work out your <Link href="/ebay-fee-calculator" className="text-cut font-medium">break-even floor</Link>, check the <Link href="/ebay-price-checker" className="text-cut font-medium">lowest live competitor</Link>, and price to win <i>above</i> the floor. <Link href="/" className="text-cut font-medium">Undercut</Link> does that loop automatically on every listing, 24/7 — read <Link href="/guides/ebay-price-floor" className="text-cut font-medium">how the floor works</Link>.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Fix slow listings automatically.</h2>
        <p className="text-muted mt-2 mb-5">Undercut reprices to beat the lowest competitor — never below your floor. Start free, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        </div>
        <p className="text-sm text-muted mb-3">Not ready? Get early access + founding pricing:</p>
        <LeadForm source="str-calculator" />
      </section>
      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
