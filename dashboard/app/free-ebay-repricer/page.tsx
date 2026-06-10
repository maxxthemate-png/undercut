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
        <p className="text-sm font-semibold text-blue-600">Free eBay Repricer</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">A free eBay repricer that protects your margin.</h1>
        <p className="mt-5 text-lg text-gray-600">
          Undercut the lowest competitor automatically — with a <span className="font-semibold text-gray-900">hard floor</span> so
          you never sell below your minimum. Start with a 14-day Starter trial, then stay free for 25 listings. No card.
        </p>
        <div className="mt-8">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — no card</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {STEPS.map(([t, d]) => (
          <div key={t} className="bg-gray-50 rounded-xl p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-gray-600 mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-blue-600 text-white px-8 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Start repricing free in minutes.</h2>
          <p className="mt-3 text-blue-100">14-day Starter trial, no card. Keep the free plan after, or upgrade when you grow.</p>
          <Link href="/signup" className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">Create your free account</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">Free eBay repricer — FAQ</h2>
        <div className="space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-gray-600 mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/compare" className="text-blue-600 font-medium hover:text-blue-700">Compare Undercut to other repricers →</Link>
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
