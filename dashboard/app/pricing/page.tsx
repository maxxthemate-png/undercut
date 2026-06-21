import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import Faq from '../_components/Faq'
import CtaBanner from '../_components/CtaBanner'
import PricingTable from './PricingTable'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Undercut Pricing — eBay Repricer Plans from $0 (Free Tier + 14-Day Trial)',
  'Simple volume-based pricing for the floor-first eBay repricer: Free for 25 listings, Starter $29, Pro $79, Scale $199. Annual plans get 2 months free. No card to start.',
  '/pricing'
)

const FAQ = [
  {
    q: 'Is the trial really free?',
    a: 'Yes. Every new account gets 14 days of full Starter features with no credit card. When it ends you move to the Free plan (25 listings) automatically — nothing is ever charged unless you choose to upgrade.',
  },
  {
    q: 'What happens when my trial ends?',
    a: 'You keep your account, your store connection, and all your floors. You drop to the Free plan (25 listings); listings beyond that pause repricing until you upgrade. No surprise charges — there is no card on file.',
  },
  {
    q: 'What counts as a listing?',
    a: 'An active eBay listing that Undercut manages (watches competitors and reprices). You choose which listings to enable — the limit applies to managed listings, not your whole store.',
  },
  {
    q: 'How does annual billing work?',
    a: 'Annual plans cost 10× the monthly price — about two months free. Starter is $290/yr instead of $348 (save $58), Pro $790/yr instead of $948 (save $158), Scale $1,990/yr instead of $2,388 (save $398).',
  },
  {
    q: 'Can I cancel? Do you support Amazon?',
    a: 'Cancel anytime from the billing portal — access runs to the end of the paid period, and annual plans have a 30-day full-refund window (see the refund policy). Amazon: not yet — Undercut is deliberately eBay-first to stay simple and cheap.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Pricing</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">Simple, volume-based pricing</h1>
        <p className="mt-4 text-muted">
          Pay for the listings you manage — every plan includes the hard price floor. Start with 14
          days of Starter free, no card, then stay on Free or upgrade.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <PricingTable />
        <p className="text-center text-xs text-muted mt-6">
          Prices in USD. Cancel anytime. Annual plans: 30-day full-refund window.
        </p>
      </section>
      <CtaBanner heading="Win the sale without losing margin." sub="14-day Starter trial, no card. Undercut competitors automatically — never below your minimum." />
      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
