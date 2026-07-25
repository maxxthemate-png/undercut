/** SEO landing — category intent: "eBay repricing software". First-party, honest. */
import Link from 'next/link'
import LeadForm from '../lead-form'
import TrustBadges from '../_components/TrustBadges'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricing Software — Undercut (auto-undercut with a hard price floor)',
  'eBay repricing software that beats your lowest competitor automatically and never sells below a floor you set. 1-click connect, AI tuning, 14-day trial — no credit card.',
  '/ebay-repricing-software'
)

const CHECKS = [
  ['A hard per-item floor', 'The #1 thing to demand: software that will never reprice below your minimum. Undercut treats the floor as sacred.'],
  ['Real competitor tracking', 'It should watch the lowest comparable listing and undercut to win — not just follow a fixed rule blindly.'],
  ['AI that protects margin', 'Good repricing software knows when NOT to chase the price down. Undercut’s AI (Pro & Scale) tunes aggressiveness so you keep profit.'],
  ['Fast, simple setup', 'You shouldn’t need a sales call. Connect eBay in one click, import listings, set floors, go.'],
]

export default function EbayRepricingSoftware() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-muted hover:text-ink transition">Compare</Link>
            <Link href="/ebay-profit-calculator" className="text-muted hover:text-ink transition">Calculator</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="text-sm font-semibold text-cut">eBay repricing software</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">Win the sale without selling at a loss.</h1>
        <p className="mt-5 text-lg text-muted">Undercut is eBay repricing software that automatically beats the lowest competitor — and <span className="font-semibold text-ink">clamps every change to a floor you set</span>, so your margin is always protected. AI-tuned, 1-click setup, free to start.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
          <Link href="/ebay-price-checker" className="inline-flex items-center justify-center gap-2 rounded border border-line text-ink font-medium px-5 py-2.5 transition hover:border-muted">See it on your listing →</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">What to look for in eBay repricing software</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {CHECKS.map(([t, d]) => (
            <div key={t} className="bg-wash rounded-lg p-6">
              <p className="font-semibold">✅ {t}</p>
              <p className="text-sm text-muted mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">How Undercut works</h2>
        <div className="grid sm:grid-cols-3 gap-5 mt-8 text-left">
          {[['1. Connect eBay', 'One click. We import your active listings automatically.'],
            ['2. Set your floor', 'A minimum price per item. We never go below it.'],
            ['3. Reprice 24/7', 'We beat the lowest competitor in the band above your floor, AI-tuned.']].map(([t, d]) => (
            <div key={t} className="bg-surface border border-line rounded-lg p-5"><p className="font-semibold">{t}</p><p className="text-sm text-muted mt-2">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-wash border-t border-line">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Start free — no card</h2>
          <p className="text-muted mt-2 mb-6">14-day Starter trial, no card. Or get the eBay repricing starter guide by email.</p>
          <div className="mb-6"><TrustBadges /></div>
          <div className="flex justify-center mb-6"><Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free</Link></div>
          <LeadForm source="ebay-repricing-software" />
        </div>
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">© Undercut — automated eBay repricing.</footer>
    </div>
  )
}
