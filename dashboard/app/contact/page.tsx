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
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-4 text-gray-600">
          Undercut is founder-run — your email goes straight to the person who built it. Replies
          usually within one business day.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-block mt-8 px-8 py-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
        >
          <span className="block text-sm text-gray-500">Email support</span>
          <span className="block text-xl font-bold text-blue-600">{SUPPORT_EMAIL}</span>
        </a>
        <p className="mt-6 text-sm text-gray-500">
          For account issues, include your account email. For listing issues, include the eBay item ID.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-8 border-t border-gray-100">
        <h2 className="text-lg font-bold mb-3 text-center">Faster answers</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-center">
          <li><Link href="/pricing" className="text-blue-600 hover:text-blue-700">Pricing &amp; what happens after the trial</Link></li>
          <li><Link href="/guides/ebay-price-floor" className="text-blue-600 hover:text-blue-700">How to set your price floor</Link></li>
          <li><Link href="/ebay-fee-calculator" className="text-blue-600 hover:text-blue-700">Fee calculator</Link></li>
          <li><Link href="/refund-policy" className="text-blue-600 hover:text-blue-700">Refund policy</Link></li>
        </ul>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 text-center border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-3">Not a customer yet? Get early access + founding pricing:</p>
        <LeadForm source="contact" />
      </section>
      <Footer />
    </div>
  )
}
