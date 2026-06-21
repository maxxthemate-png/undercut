import Link from 'next/link'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import LeadForm from '../lead-form'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'Contact — Undercut',
  'Get help with Undercut, the floor-first eBay repricer. Email the founder directly — replies usually within one business day.',
  '/contact'
)

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-4 text-muted">
          Undercut is founder-run — your email goes straight to the person who built it. Replies
          usually within one business day.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-block mt-8 px-8 py-4 rounded-lg border border-line bg-wash hover:border-muted transition"
        >
          <span className="block text-sm text-muted">Email support</span>
          <span className="block text-xl font-bold text-cut">{SUPPORT_EMAIL}</span>
        </a>
        <p className="mt-6 text-sm text-muted">
          For account issues, include your account email. For listing issues, include the eBay item ID.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-8 border-t border-line">
        <h2 className="text-lg font-bold mb-3 text-center">Faster answers</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-center">
          <li><Link href="/pricing" className="text-cut hover:opacity-90">Pricing &amp; what happens after the trial</Link></li>
          <li><Link href="/guides/ebay-price-floor" className="text-cut hover:opacity-90">How to set your price floor</Link></li>
          <li><Link href="/ebay-fee-calculator" className="text-cut hover:opacity-90">Fee calculator</Link></li>
          <li><Link href="/refund-policy" className="text-cut hover:opacity-90">Refund policy</Link></li>
        </ul>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 text-center border-t border-line">
        <p className="text-sm text-muted mb-3">Not a customer yet? Get early access + founding pricing:</p>
        <LeadForm source="contact" />
      </section>
      <Footer />
    </div>
  )
}
