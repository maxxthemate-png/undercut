/** SEO landing — high intent: "free eBay repricer". New file (no collision). */
import Link from 'next/link'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Repricer — Undercut (hard floor, no card)',
  'A free eBay repricer that auto-undercuts the lowest competitor with a hard floor so you never sell below your minimum. Start with a 14-day Starter trial, then stay free for 25 listings. No card.',
  '/free-ebay-repricer'
)

const STEPS: [string, string][] = [
  ['1. Connect eBay', 'Link your store in one click. We import your active listings automatically.'],
  ['2. Set your floor', 'Pick a minimum price per item — cost + fees + the smallest margin you’ll accept. We never go below it.'],
  ['3. We undercut, 24/7', 'We track the lowest competitor and reprice to win — clamped to your floor, so you never race to the bottom.'],
]

const FAQ: [string, string][] = [
  ['Is it really free?', 'Every account starts with a 14-day Starter trial (100 listings, no card). After it ends you can stay on the Free plan — 25 listings, hard floor, hourly repricing — or upgrade for more volume and faster repricing.'],
  ['Do I need a credit card?', 'No card to start. You only add a card if you choose to upgrade to a paid plan.'],
  ['What’s the catch with a free repricer?', 'The free tier is capped at 25 listings and reprices hourly. The floor guarantee is the same on every plan — your prices are always protected.'],
  ['How is this different from doing it by hand?', 'Manual repricing is constant and easy to get wrong. Undercut watches competitors and reprices automatically within the band above your floor, so you win sales without babysitting prices.'],
]

export default function FreeEbayRepricer() {
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
        <p className="text-sm font-semibold text-cut">Free eBay Repricer</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">A free eBay repricer that protects your margin.</h1>
        <p className="mt-5 text-lg text-muted">
          Undercut the lowest competitor automatically — with a <span className="font-semibold text-ink">hard floor</span> so
          you never sell below your minimum. Start with a 14-day Starter trial, then stay free for 25 listings. No card.
        </p>
        <div className="mt-8">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {STEPS.map(([t, d]) => (
          <div key={t} className="bg-wash rounded-lg p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-muted mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-lg bg-ink text-white px-8 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Start repricing free in minutes.</h2>
          <p className="mt-3 text-white/75">14-day Starter trial, no card. Keep the free plan after, or upgrade when you grow.</p>
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 mt-6">Create your free account</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Free eBay repricer — FAQ</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/compare" className="text-cut font-medium hover:opacity-90 transition">Compare Undercut to other repricers →</Link>
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
