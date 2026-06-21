/** SEO landing — high commercial intent: "StreetPricer alternative".
 *  Honest, first-party positioning. New file (no collision with edited pages). */
import Link from 'next/link'
import TrustBadges from '../_components/TrustBadges'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'StreetPricer Alternative — Undercut (floor-first eBay repricer)',
  'Looking for a StreetPricer alternative? Undercut auto-undercuts the lowest competitor with a hard floor so you never sell below your minimum. 14-day Starter trial, no card.',
  '/streetpricer-alternative'
)

const ROWS: [string, string, string][] = [
  ['Start with no card', '14-day Starter trial, then Free (25 listings) or $29/mo', 'Paid plans'],
  ['Hard per-item floor', 'Core feature — set in seconds', 'Supported'],
  ['Setup', '1-click eBay connect, live in minutes', 'Moderate'],
  ['AI aggressiveness tuning', 'Yes (Pro & Scale) — won’t race to the bottom', 'Rule-based'],
  ['Focus', 'Floor-safe eBay undercutting, kept simple', 'Feature-rich, steeper learning curve'],
]

const FAQ: [string, string][] = [
  ['Is Undercut a good StreetPricer alternative?', 'If you want a simpler, floor-first repricer for eBay — yes. Undercut undercuts the lowest competitor automatically but never drops below a per-item minimum you set, and you can start with a 14-day Starter trial (no card).'],
  ['Can I keep my pricing rules?', 'You set a floor, an optional ceiling, and an undercut amount per listing. On Pro and Scale, AI tunes how aggressive to be so you keep margin instead of racing to the bottom.'],
  ['How do I switch?', 'Connect your eBay account in one click, import your active listings, set floors, and turn repricing on. No long migration.'],
]

export default function StreetPricerAlternative() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-muted hover:text-ink transition">Compare</Link>
            <Link href="/login" className="text-muted hover:text-ink transition">Log in</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold text-cut">StreetPricer Alternative</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">A simpler eBay repricer — with a real hard floor.</h1>
        <p className="mt-5 text-lg text-muted">
          If you’re comparing StreetPricer alternatives, the question that matters is: will it ever sell your
          items too cheap? Undercut is built so it <span className="font-semibold text-ink">can’t</span> — it
          undercuts the lowest competitor automatically, but never below the minimum you set.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
          <Link href="/ebay-price-checker" className="inline-flex items-center justify-center gap-2 rounded border border-line text-ink font-medium px-5 py-2.5 transition hover:border-muted">See it on your listing →</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-wash text-left">
                <th className="px-2.5 py-2.5 md:px-4 md:py-3 font-semibold text-muted w-24 md:w-56"> </th>
                <th className="px-2.5 py-2.5 md:px-4 md:py-3 font-bold text-cut bg-cut-tint">Undercut</th>
                <th className="px-2.5 py-2.5 md:px-4 md:py-3 font-semibold text-ink">StreetPricer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map(([label, u, s]) => (
                <tr key={label}>
                  <td className="px-2.5 py-2.5 md:px-4 md:py-3 align-top font-medium text-ink">{label}</td>
                  <td className="px-2.5 py-2.5 md:px-4 md:py-3 align-top font-medium text-ink bg-cut-tint">{u}</td>
                  <td className="px-2.5 py-2.5 md:px-4 md:py-3 align-top text-muted">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-3">
          Positioning as of June 2026. Competitor features and pricing change — check their site for current details. StreetPricer is a trademark of its respective owner; Undercut is not affiliated with or endorsed by it.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-6 pb-2">
        <TrustBadges />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-lg bg-ink text-white px-8 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Founding trial</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">14 days of Starter, free — no card.</h2>
          <p className="mt-3 text-white/75">Connect eBay, set your floors, watch it win the sale without giving away margin.</p>
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 mt-6">Start your trial</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Switching questions</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/compare" className="text-cut font-medium hover:opacity-90 transition">See the full repricer comparison →</Link>
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
