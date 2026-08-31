import Link from 'next/link'
import Calculator from './calculator'
import LeadForm from '../lead-form'
import Faq from '../_components/Faq'
import Footer from '../_components/Footer'
import Nav from '../_components/Nav'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricing Lag Cost Calculator — What Manual Repricing Is Really Costing You',
  'See the labor cost and price-exposure window of manually repricing your eBay listings — and how much of that gap automated repricing closes.',
  '/ebay-repricing-lag-calculator'
)

const FAQ = [
  {
    q: 'What is "repricing lag"?',
    a: 'The gap between when a competitor changes their price and when you notice and react to it. If you check listings once a day, your lag can be up to 24 hours — during which any price-sensitive buyer goes to whoever is cheapest right now, not whoever was cheapest at your last check.',
  },
  {
    q: 'Is manual repricing actually that expensive?',
    a: 'It has two costs, and most sellers only feel one of them. The visible one is your time — minutes per listing, per check, adding up over a week. The invisible one is the sales lost during your exposure window, which never shows up as a line item because you never see the sale you didn\'t get.',
  },
  {
    q: 'How often do I need to reprice to stay competitive?',
    a: 'It depends on the category. Commodity items in high-competition categories can see price changes many times a day; slower categories move less. The safer default is to shrink the window as much as you reasonably can — checking once a day leaves a much wider opening than checking hourly.',
  },
  {
    q: 'Does faster repricing mean racing to the bottom?',
    a: 'Only without a floor. Undercut reprices fast but never below the per-item minimum you set — speed closes the exposure window, the floor protects the margin. Neither works without the other.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Free calculator — no signup</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Repricing Lag Cost Calculator</h1>
        <p className="mt-4 text-muted">Manually repricing costs you twice: the <b>time</b> you spend doing it, and the <b>sales</b> that slip away while your prices sit stale. See both numbers.</p>
      </section>
      <section className="px-6 pb-12"><Calculator /></section>
      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-line">
        <h2 className="text-2xl font-bold mb-4">The cost you can&apos;t see is the one that matters more</h2>
        <div className="space-y-4 text-muted text-[15px] leading-relaxed">
          <p>
            Sellers who reprice manually almost always underestimate what it&apos;s costing them, because the labor time is the only part that&apos;s visible. You can feel the minutes you spend opening listings and retyping prices. You can&apos;t feel the sale that went to a competitor at 9:40pm because your last price check was at 8am.
          </p>
          <p>
            That second cost compounds with volume: the more listings you run and the more competitive the category, the wider your real exposure window gets relative to how often you can realistically check it by hand. It&apos;s the same problem <Link href="/" className="text-cut font-medium">Undercut</Link> exists to close — competitor tracking and repricing on a fixed automated cadence, with a hard <Link href="/guides/ebay-price-floor" className="text-cut font-medium">price floor</Link> so speed never costs you margin.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Close the window automatically.</h2>
        <p className="text-muted mt-2 mb-5">Undercut watches every listing and reprices on a fixed schedule — as fast as every 15 minutes — floor-protected the whole time. Start free, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        </div>
        <p className="text-sm text-muted mb-3">Want the price-floor guide that pairs with this? We&apos;ll email it:</p>
        <LeadForm source="repricing-lag-calculator" />
      </section>
      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
