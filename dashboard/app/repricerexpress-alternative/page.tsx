/** SEO landing — high commercial intent: "RepricerExpress alternative" / "Repricer.com alternative".
 *  Honest, first-party positioning. */
import Link from 'next/link'
import LeadForm from '../lead-form'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'RepricerExpress / Repricer.com Alternative — Undercut (floor-first eBay repricer)',
  'A simpler, floor-first RepricerExpress alternative for eBay sellers. Undercut beats the lowest competitor automatically but never sells below the per-item minimum you set. 14-day trial, no card.',
  '/repricerexpress-alternative'
)

const ROWS: [string, string, string][] = [
  ['Price to start', '14-day Starter trial (no card) — then Free (25) or $29/mo', 'Paid, multi-channel tiers'],
  ['Per-item hard floor', 'Core feature — set in seconds', 'Supported'],
  ['Built for', 'eBay sellers who want floor-safe undercutting, simply', 'Multi-marketplace (Amazon-led) sellers'],
  ['Setup', '1-click eBay connect, live in minutes', 'Multi-channel onboarding'],
  ['AI aggressiveness tuning', 'Yes (Pro) — won’t race to the bottom', 'Rule-based'],
]

const FAQ: [string, string][] = [
  ['Is Undercut a good RepricerExpress alternative?', 'If you sell on eBay and want a simple, floor-first repricer — yes. Undercut undercuts the lowest competitor automatically and never drops below the per-item minimum you set. Start with a 14-day trial, no card.'],
  ['Do you support other marketplaces?', 'Undercut is eBay-focused today — that focus is why setup is one click and the floor logic stays dead simple. If you need heavy multi-channel Amazon repricing, a multi-marketplace tool may fit better.'],
  ['How do I switch?', 'Connect eBay in one click, import your listings, set floors, turn repricing on. No long migration.'],
]

export default function RepricerExpressAlternative() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-[#EE2B1C]">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="text-sm font-semibold text-blue-600">RepricerExpress alternative</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">The simple, floor-first eBay repricer.</h1>
        <p className="mt-5 text-lg text-gray-600">Undercut auto-beats the lowest competitor on your eBay listings — and <span className="font-semibold text-gray-900">never sells below the floor you set</span>. No multi-channel complexity, no card to start.</p>
        <div className="mt-8"><Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link></div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse min-w-[640px]">
            <thead><tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-500 w-44">Feature</th>
              <th className="px-4 py-3 text-sm font-bold text-blue-700 bg-blue-50">Undercut</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">RepricerExpress / Repricer.com</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map(r => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{r[0]}</td>
                  <td className="px-4 py-3 text-sm align-top font-medium text-gray-900 bg-blue-50">{r[1]}</td>
                  <td className="px-4 py-3 text-sm align-top text-gray-600">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Comparison reflects Undercut’s positioning as of 2026; competitor features and pricing change — check their site for current details. All trademarks belong to their owners.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Questions sellers ask</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (<div key={q}><p className="font-semibold">{q}</p><p className="text-sm text-gray-600 mt-1">{a}</p></div>))}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Try it free, or get founding pricing</h2>
          <p className="text-gray-600 mt-2 mb-6">Start the 14-day trial — or drop your email for early access + founding pricing.</p>
          <div className="flex justify-center mb-6"><Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — no card</Link></div>
          <LeadForm source="repricerexpress-alt" />
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">© Undercut — automated eBay repricing.</footer>
    </div>
  )
}
