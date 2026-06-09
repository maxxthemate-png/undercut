/** Undercut — competitor comparison / pull-marketing landing page.
 *  Targets high-intent search: "ebay repricer comparison", "repricer with a hard floor",
 *  "ebay repricer that won't race to the bottom". Honest, first-party positioning. */
import Link from 'next/link'
import LeadForm from '../lead-form'

export const metadata = {
  title: 'Undercut vs StreetPricer, RepricerExpress & Informed.co — eBay Repricer Comparison (2026)',
  description:
    'Compare Undercut to the top eBay repricing tools. Floor-first repricing that undercuts the lowest competitor automatically but never sells below the minimum you set. Free to start, no card.',
  alternates: { canonical: '/compare' },
}

type Row = { label: string; undercut: string; street: string; rex: string; informed: string }

const ROWS: Row[] = [
  { label: 'Price to start', undercut: '14-day trial free (no card) — then Free (25) or $29/mo', street: 'Paid plans', rex: 'Higher-tier, multi-channel', informed: 'Enterprise / custom' },
  { label: 'Per-item hard floor', undercut: 'Core feature — set in seconds', street: 'Supported', rex: 'Supported', informed: 'Supported' },
  { label: 'Setup', undercut: '1-click eBay connect, live in minutes', street: 'Moderate', rex: 'Multi-channel config', informed: 'Onboarding / sales call' },
  { label: 'AI aggressiveness tuning', undercut: 'Yes (Pro) — won’t race to the bottom', street: 'Rule-based', rex: 'Rule-based', informed: 'Advanced' },
  { label: 'Repricing speed', undercut: 'Every 15 min (Pro)', street: 'Scheduled', rex: 'Scheduled', informed: 'Fast' },
  { label: 'Built for', undercut: 'eBay sellers who want floor-safe undercutting, simply', street: 'eBay power sellers', rex: 'Multi-marketplace sellers', informed: 'Large / Amazon-led sellers' },
]

const FAQ: [string, string][] = [
  ['Will it race my prices to the bottom?', 'No — that’s the whole point of the floor. You set a minimum price per item (cost + fees + the smallest margin you’ll accept). Undercut only competes in the band above it and will never list or reprice below your floor.'],
  ['Do I need a credit card to start?', 'No. Every account starts with a 14-day Founding trial — full Starter features (100 listings), no card. After it ends you stay free (25 listings) or upgrade. Paid plans add volume, AI tuning, and faster repricing.'],
  ['How fast does it reprice?', 'Hourly on Free/Starter, every 15 minutes on Pro, every 5 minutes on Scale.'],
  ['How does it pick the price?', 'It tracks the lowest competitor on the same item and undercuts to win the sale — then clamps to your floor. On Pro, AI tunes how aggressive to be so you keep margin instead of giving it away.'],
  ['What does it cost as I grow?', 'Free (25), Starter $29 (100), Pro $79 (1,000), Scale $199 (10,000 listings). Cancel anytime.'],
]

function Cell({ children, hero = false }: { children: React.ReactNode; hero?: boolean }) {
  return (
    <td className={`px-4 py-3 text-sm align-top ${hero ? 'font-medium text-gray-900 bg-blue-50' : 'text-gray-600'}`}>{children}</td>
  )
}

export default function Compare() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">Undercut</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-gray-900 font-medium">Compare</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold text-blue-600">eBay Repricer Comparison</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">The eBay repricer built around a hard floor.</h1>
        <p className="mt-5 text-lg text-gray-600">
          See how Undercut compares to StreetPricer, RepricerExpress, and Informed.co — and why
          <span className="font-semibold text-gray-900"> floor-first</span> means you undercut the competition
          automatically without ever racing to the bottom.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-500 w-44">Feature</th>
                <th className="px-4 py-3 text-sm font-bold text-blue-700 bg-blue-50">Undercut</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">StreetPricer</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">RepricerExpress</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Informed.co</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map(r => (
                <tr key={r.label}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.label}</td>
                  <Cell hero>{r.undercut}</Cell>
                  <Cell>{r.street}</Cell>
                  <Cell>{r.rex}</Cell>
                  <Cell>{r.informed}</Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Comparison reflects Undercut’s positioning as of June 2026. Competitor features and pricing change — check their sites for current details. All product names and trademarks are property of their respective owners.
        </p>
      </section>

      {/* Floor-first explainer */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center">The floor-first difference</h2>
        <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
          Sellers’ #1 fear of auto-repricers is that they’ll sell your stuff too cheap. Undercut is built so that can’t happen.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ['Set your floor', 'Pick a minimum price per item — cost + fees + the smallest margin you’ll accept. We will never go below it.'],
            ['Undercut above it', 'We track the lowest competitor and reprice to win the sale, but only in the band above your floor.'],
            ['AI keeps margin', 'On Pro, AI tunes how aggressive to be — so you win sales without giving away profit.'],
          ].map(([t, d]) => (
            <div key={t} className="bg-gray-50 rounded-xl p-6">
              <p className="font-semibold">{t}</p>
              <p className="text-sm text-gray-600 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founding offer */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-blue-600 text-white px-8 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Founding trial</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">Every new seller gets 14 days of Starter, free.</h2>
          <p className="mt-3 text-blue-100">Full repricing on up to 100 listings — no credit card. All we ask is honest feedback, and a testimonial if you love it.</p>
          <Link href="/signup" className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">Start your free trial</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Questions sellers ask</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-gray-600 mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Want in but not ready today?</h2>
          <p className="text-gray-600 mt-2 mb-6">Leave your email and we'll send early access + founding pricing.</p>
          <LeadForm source="compare" />
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/compare" className="hover:text-gray-600">Compare</Link>
          <Link href="/signup" className="hover:text-gray-600">Start free</Link>
        </div>
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
