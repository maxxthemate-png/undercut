/** SEO landing — high commercial intent: "inkFrog alternative" / "inkFrog shut down".
 *  inkFrog (eBay listing manager) was discontinued in 2026, sending sellers looking
 *  for a new tool. Honest, first-party positioning: Undercut is a focused repricer,
 *  not a full listing manager — it picks up the pricing job specifically.
 *  New file (no collision with edited pages). */
import Link from 'next/link'
import TrustBadges from '../_components/TrustBadges'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'inkFrog Alternative — Undercut (floor-safe eBay repricer)',
  'inkFrog shut down and you need a new tool? Undercut auto-undercuts the lowest competitor with a hard floor so you never sell below your minimum. 14-day Starter trial, no card.',
  '/inkfrog-alternative'
)

const ROWS: [string, string, string][] = [
  ['Status', 'Live and actively maintained', 'Discontinued (shut down 2026)'],
  ['What it does', 'Auto-reprices eBay listings to beat the lowest competitor', 'Was a listing manager — not a repricer'],
  ['Hard per-item floor', 'Core feature — never sells below your minimum', '—'],
  ['Start with no card', '14-day Starter trial, then Free (25 listings) or $29/mo', 'No longer available'],
  ['AI aggressiveness tuning', 'Yes (Pro & Scale) — won’t race to the bottom', '—'],
  ['Setup', '1-click eBay connect, live in minutes', '—'],
]

const FAQ: [string, string][] = [
  ['Is Undercut a drop-in replacement for inkFrog?', 'No — and we won’t pretend otherwise. inkFrog was a listing-management tool; Undercut does one job: automatically repricing your eBay listings to beat the lowest competitor, clamped to a hard floor you set. If keeping your prices competitive was the part of inkFrog you relied on, Undercut covers that job well. For listing creation or templates you’ll want a separate tool.'],
  ['I’m migrating off inkFrog — how do I switch?', 'Connect your eBay account in one click, import your active listings, set a hard floor on each one, and turn repricing on. There’s no long migration and no card required to start — a 14-day Starter trial gets you a full reprice cycle to evaluate.'],
  ['Will it ever sell my items too cheap?', 'No. Undercut undercuts the lowest live competitor automatically, but it can never drop a listing below the per-item hard floor you set. The floor is a hard stop, not a suggestion. On Pro and Scale, AI tuning controls how aggressively each listing moves toward that floor so you keep margin.'],
  ['How often does it reprice?', 'Every 15 minutes on Pro and Scale, and hourly on Free and Starter. Competitor price tracking runs on every plan — it’s core to how repricing works.'],
]

export default function InkFrogAlternative() {
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
        <p className="text-sm font-semibold text-cut">inkFrog Alternative</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">inkFrog is gone. Keep your eBay prices winning.</h1>
        <p className="mt-5 text-lg text-muted">
          With inkFrog shut down, eBay sellers are rebuilding their toolkit. Undercut isn’t a full listing
          manager — it does <span className="font-semibold text-ink">one</span> job: it undercuts the lowest
          competitor automatically, and it <span className="font-semibold text-ink">can’t</span> sell below the
          minimum you set.
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
                <th className="px-2.5 py-2.5 md:px-4 md:py-3 font-semibold text-ink">inkFrog</th>
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
          Positioning as of July 2026. inkFrog was an eBay listing-management tool, not a repricer, and is no longer operating. inkFrog is a trademark of its respective owner; Undercut is not affiliated with or endorsed by it.
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
        <h2 className="text-2xl font-bold text-center mb-8">Migration questions</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 space-y-2">
          <p><Link href="/inkfrog-migration" className="text-cut font-medium hover:opacity-90 transition">Full inkFrog migration checklist (what to export, what breaks) →</Link></p>
          <p><Link href="/compare" className="text-cut font-medium hover:opacity-90 transition">See the full repricer comparison →</Link></p>
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
