import Link from 'next/link'
import Calculator from './calculator'
import LeadForm from '../lead-form'
import Faq from '../_components/Faq'
import Footer from '../_components/Footer'
import Nav from '../_components/Nav'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Best Offer Calculator — Minimum Offer to Accept (2026)',
  'Work out the minimum eBay Best Offer worth accepting from your cost, fees, and margin — plus the exact auto-accept and auto-decline thresholds to set.',
  '/ebay-best-offer-calculator'
)

const FAQ = [
  {
    q: 'What is the minimum offer I should accept on eBay?',
    a: 'The price where the offer still covers item cost + your shipping cost + eBay fees + your minimum margin. Formula: (cost + shipping + per-order fee) ÷ (1 − fee rate − margin rate). Below that number you are paying the buyer to take your item.',
  },
  {
    q: 'Should I use auto-accept and auto-decline?',
    a: 'Yes — they turn Best Offer from a chore into a system. Set auto-accept at your minimum acceptable offer and auto-decline slightly below it. You stop negotiating every lowball manually, and serious buyers get instant gratification, which converts better.',
  },
  {
    q: 'Is Best Offer better than just lowering my price?',
    a: 'They solve different problems. Best Offer captures price-sensitive buyers without showing everyone a lower price. Lowering the list price (or repricing) improves search competitiveness for every buyer. Competitive commodity listings usually benefit more from repricing; unique items benefit more from Best Offer.',
  },
  {
    q: 'How does Best Offer interact with automated repricing?',
    a: 'They stack: the repricer keeps your list price winning against competitors (never below your floor), while Best Offer thresholds catch buyers who want to feel like they got a deal. Use the same floor for both — your minimum is your minimum.',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Free tool — no signup</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">eBay Best Offer Calculator</h1>
        <p className="mt-4 text-muted">Know the <b>minimum offer worth accepting</b> before the offers arrive — and set auto-accept/auto-decline so eBay negotiates for you.</p>
      </section>
      <section className="px-6 pb-12"><Calculator /></section>
      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-line">
        <h2 className="text-2xl font-bold mb-4">Your negotiation floor is the same as your repricing floor</h2>
        <div className="space-y-4 text-muted text-[15px] leading-relaxed">
          <p>
            Sellers who lose money on Best Offer almost never lose it on one bad deal — they lose it by accepting &ldquo;just slightly low&rdquo; offers repeatedly because the number <i>felt</i> fine in the moment. The defense is computing your minimum once, when you&apos;re calm, and letting automation enforce it.
          </p>
          <p>
            That&apos;s the same principle behind floor-first repricing: <Link href="/" className="text-cut font-medium">Undercut</Link> beats the lowest competitor automatically but never crosses the per-item floor you set. Work the full math in the <Link href="/ebay-fee-calculator" className="text-cut font-medium">fee calculator</Link>, or read the <Link href="/guides/ebay-price-floor" className="text-cut font-medium">price-floor guide</Link>.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Automate the rest of your pricing too.</h2>
        <p className="text-muted mt-2 mb-5">Undercut reprices every listing against the lowest competitor — floor-protected, 24/7. Start free, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        </div>
        <p className="text-sm text-muted mb-3">Want the best-offer auto-accept playbook? We&apos;ll email it:</p>
        <LeadForm source="best-offer-calculator" />
      </section>
      <Faq items={FAQ} />
      <Footer />
    </div>
  )
}
