/** SEO landing — high commercial intent: "StreetPricer alternative".
 *  Honest, first-party positioning. New file (no collision with edited pages). */
import Link from 'next/link'

export const metadata = {
  title: 'StreetPricer Alternative — Undercut (floor-first eBay repricer)',
  description:
    'Looking for a StreetPricer alternative? Undercut auto-undercuts the lowest competitor with a hard floor so you never sell below your minimum. 14-day Starter trial, no card.',
  alternates: { canonical: '/streetpricer-alternative' },
}

const ROWS: [string, string, string][] = [
  ['Start with no card', '14-day Starter trial, then Free (25 listings) or $29/mo', 'Paid plans'],
  ['Hard per-item floor', 'Core feature — set in seconds', 'Supported'],
  ['Setup', '1-click eBay connect, live in minutes', 'Moderate'],
  ['AI aggressiveness tuning', 'Yes (Pro) — won’t race to the bottom', 'Rule-based'],
  ['Focus', 'Floor-safe eBay undercutting, kept simple', 'Feature-rich, steeper learning curve'],
]

const FAQ: [string, string][] = [
  ['Is Undercut a good StreetPricer alternative?', 'If you want a simpler, floor-first repricer for eBay — yes. Undercut undercuts the lowest competitor automatically but never drops below a per-item minimum you set, and you can start with a 14-day Starter trial (no card).'],
  ['Can I keep my pricing rules?', 'You set a floor, an optional ceiling, and an undercut amount per listing. On Pro, AI tunes how aggressive to be so you keep margin instead of racing to the bottom.'],
  ['How do I switch?', 'Connect your eBay account in one click, import your active listings, set floors, and turn repricing on. No long migration.'],
]

export default function StreetPricerAlternative() {
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

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-sm font-semibold text-blue-600">StreetPricer Alternative</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">A simpler eBay repricer — with a real hard floor.</h1>
        <p className="mt-5 text-lg text-gray-600">
          If you’re comparing StreetPricer alternatives, the question that matters is: will it ever sell your
          items too cheap? Undercut is built so it <span className="font-semibold text-gray-900">can’t</span> — it
          undercuts the lowest competitor automatically, but never below the minimum you set.
        </p>
        <div className="mt-8">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-500 w-56"> </th>
                <th className="px-4 py-3 text-sm font-bold text-blue-700 bg-blue-50">Undercut</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">StreetPricer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map(([label, u, s]) => (
                <tr key={label}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{label}</td>
                  <td className="px-4 py-3 text-sm align-top font-medium text-gray-900 bg-blue-50">{u}</td>
                  <td className="px-4 py-3 text-sm align-top text-gray-600">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Positioning as of June 2026. Competitor features and pricing change — check their site for current details. StreetPricer is a trademark of its respective owner; Undercut is not affiliated with or endorsed by it.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-blue-600 text-white px-8 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Founding trial</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">14 days of Starter, free — no card.</h2>
          <p className="mt-3 text-blue-100">Connect eBay, set your floors, watch it win the buy box without giving away margin.</p>
          <Link href="/signup" className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">Start your trial</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Switching questions</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-gray-600 mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/compare" className="text-blue-600 font-medium hover:text-blue-700">See the full repricer comparison →</Link>
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
