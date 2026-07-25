/** Undercut — competitor comparison / pull-marketing landing page.
 *  Targets high-intent search: "ebay repricer comparison", "repricer with a hard floor",
 *  "ebay repricer that won't race to the bottom". Honest, first-party positioning. */
import Link from 'next/link'
import LeadForm from '../lead-form'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Undercut vs StreetPricer, RepricerExpress & Informed.co — eBay Repricer Comparison (2026)',
  'Compare Undercut to the top eBay repricing tools. Floor-first repricing that undercuts the lowest competitor automatically but never sells below the minimum you set. Free to start, no card.',
  '/compare'
)

type Row = { label: string; undercut: string; street: string; rex: string; informed: string }

const ROWS: Row[] = [
  { label: 'Price to start', undercut: '14-day trial free (no card) — then Free (25) or $29/mo', street: 'Paid plans', rex: 'Higher-tier, multi-channel', informed: 'Enterprise / custom' },
  { label: 'Per-item hard floor', undercut: 'Core feature — set in seconds, or all at once in bulk', street: 'Supported (required)', rex: 'Supported', informed: 'Supported' },
  { label: 'Setup', undercut: '1-click eBay connect, live in minutes', street: 'Moderate', rex: 'Multi-channel config', informed: 'Onboarding / sales call' },
  { label: 'AI aggressiveness tuning', undercut: 'Yes (Pro & Scale) — won’t race to the bottom', street: 'Rule-based', rex: 'Rule-based', informed: 'Advanced' },
  { label: 'Repricing speed', undercut: 'Every 15 min (Pro & Scale)', street: 'Scheduled', rex: 'Scheduled', informed: 'Fast' },
  { label: 'Built for', undercut: 'eBay sellers who want floor-safe undercutting, simply', street: 'eBay power sellers', rex: 'Multi-marketplace sellers', informed: 'Amazon / Walmart sellers — no longer supports eBay' },
  { label: 'Supports eBay', undercut: 'eBay-only — it is the whole product', street: 'Yes', rex: 'Yes (Amazon-led)', informed: 'No — Amazon + Walmart only as of 2026' },
]

const FAQ: [string, string][] = [
  ['Will it race my prices to the bottom?', 'No — that’s the whole point of the floor. You set a minimum price per item (cost + fees + the smallest margin you’ll accept). Undercut only competes in the band above it and will never list or reprice below your floor.'],
  ['Do I need a credit card to start?', 'No. Every account starts with a 14-day Founding trial — full Starter features (100 listings), no card. After it ends you stay free (25 listings) or upgrade. Paid plans add volume, AI tuning, and faster repricing.'],
  ['How fast does it reprice?', 'Hourly on Free/Starter, every 15 minutes on Pro and Scale.'],
  ['How does it pick the price?', 'It tracks the lowest competitor on the same item and undercuts to win the sale — then clamps to your floor. On Pro and Scale, AI tunes how aggressive to be so you keep margin instead of giving it away.'],
  ['What does it cost as I grow?', 'Free (25), Starter $29 (100), Pro $79 (1,000), Scale $199 (10,000 listings). Cancel anytime.'],
]

function Cell({ children, hero = false }: { children: React.ReactNode; hero?: boolean }) {
  return (
    <td className={`px-4 py-3 text-sm align-top ${hero ? 'font-medium text-ink bg-cut-tint' : 'text-muted'}`}>{children}</td>
  )
}

export default function Compare() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-ink font-medium relative cut-rule">Compare</Link>
            <Link href="/login" className="text-muted hover:text-ink transition">Log in</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold text-cut">eBay Repricer Comparison</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">The eBay repricer built around a hard floor.</h1>
        <p className="mt-5 text-lg text-muted">
          See how Undercut compares to StreetPricer, RepricerExpress, and Informed.co — and why
          <span className="font-semibold text-ink"> floor-first</span> means you undercut the competition
          automatically without ever racing to the bottom.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
        </div>
        <p className="mt-4 text-sm text-muted">Coming from inkFrog? <Link href="/inkfrog-alternative" className="text-cut hover:underline">See the dedicated inkFrog migration guide →</Link></p>
        <p className="mt-2 text-sm text-muted">Switching from StreetPricer? <Link href="/streetpricer-alternative" className="text-cut hover:underline">See the StreetPricer alternative guide →</Link> · Switching from RepricerExpress? <Link href="/repricerexpress-alternative" className="text-cut hover:underline">See the RepricerExpress alternative guide →</Link></p>
      </section>

      {/* Comparison table */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-wash text-left">
                <th className="px-4 py-3 text-sm font-semibold text-muted w-44">Feature</th>
                <th className="px-4 py-3 text-sm font-bold text-cut bg-cut-tint">Undercut</th>
                <th className="px-4 py-3 text-sm font-semibold text-ink">StreetPricer</th>
                <th className="px-4 py-3 text-sm font-semibold text-ink">RepricerExpress</th>
                <th className="px-4 py-3 text-sm font-semibold text-ink">Informed.co</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map(r => (
                <tr key={r.label}>
                  <td className="px-4 py-3 text-sm font-medium text-ink">{r.label}</td>
                  <Cell hero>{r.undercut}</Cell>
                  <Cell>{r.street}</Cell>
                  <Cell>{r.rex}</Cell>
                  <Cell>{r.informed}</Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-3">
          Comparison reflects Undercut’s positioning as of June 2026. Competitor features and pricing change — check their sites for current details. All product names and trademarks are property of their respective owners.
        </p>
      </section>

      {/* Floor-first explainer */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center">The floor-first difference</h2>
        <p className="text-center text-muted mt-3 max-w-2xl mx-auto">
          Sellers’ #1 fear of auto-repricers is that they’ll sell your stuff too cheap. Undercut is built so that can’t happen.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ['Set your floor', 'Pick a minimum price per item — cost + fees + the smallest margin you’ll accept. We will never go below it.'],
            ['Undercut above it', 'We track the lowest competitor and reprice to win the sale, but only in the band above your floor.'],
            ['AI keeps margin', 'On Pro and Scale, AI tunes how aggressive to be — so you win sales without giving away profit.'],
          ].map(([t, d]) => (
            <div key={t} className="bg-wash rounded-lg p-6">
              <p className="font-semibold">{t}</p>
              <p className="text-sm text-muted mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founding offer */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-lg bg-ink text-white px-8 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Founding trial</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">Every new seller gets 14 days of Starter, free.</h2>
          <p className="mt-3 text-white/75">Full repricing on up to 100 listings — no credit card. All we ask is honest feedback, and a testimonial if you love it.</p>
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 mt-6">Start your free trial</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Questions sellers ask</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
        </div>
      </section>

      <section className="bg-wash border-t border-line">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Want in but not ready today?</h2>
          <p className="text-muted mt-2 mb-6">Not ready to switch? Get the repricer evaluation checklist by email.</p>
          <LeadForm source="compare" />
        </div>
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/" className="hover:text-ink transition">Home</Link>
          <Link href="/compare" className="hover:text-ink transition">Compare</Link>
          <Link href="/signup" className="hover:text-ink transition">Start free</Link>
        </div>
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
