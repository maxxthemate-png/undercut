/** Undercut — marketing landing + pricing. */
import Link from 'next/link'
import LeadForm from './lead-form'

const TIERS = [
  { name: 'Free', price: '$0', listings: '25 listings', features: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'], cta: 'Start free', highlight: false },
  { name: 'Starter', price: '$29', listings: '100 listings', features: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'], cta: 'Start free', highlight: false },
  { name: 'Pro', price: '$79', listings: '1,000 listings', features: ['AI price optimizer', '15-min repricing', 'Competitor tracking'], cta: 'Start free', highlight: true },
  { name: 'Scale', price: '$199', listings: '10,000 listings', features: ['AI price optimizer', '5-min repricing', 'Priority support'], cta: 'Start free', highlight: false },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-lg">Undercut</span>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Win the sale on autopilot.</h1>
        <p className="mt-5 text-lg text-gray-600">
          Undercut automatically reprices your eBay listings to beat the lowest competitor —
          with a hard floor so you <span className="font-semibold text-gray-900">never sell below your minimum</span>.
          AI decides how aggressive to be, 24/7.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
          <Link href="/login" className="px-6 py-3 rounded-lg border border-gray-200 font-medium hover:bg-gray-50">Log in</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {[
          ['1. Connect eBay', 'Securely link your store in one click. We import your active listings automatically.'],
          ['2. Set your floor', 'Pick a minimum price per item. We will never go below it — your margin is protected.'],
          ['3. We undercut, 24/7', 'We track the lowest competitor and reprice to win, AI-tuned so you don’t race to the bottom.'],
        ].map(([t, d]) => (
          <div key={t} className="bg-gray-50 rounded-xl p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-gray-600 mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Simple, volume-based pricing</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {TIERS.map(t => (
            <div key={t.name} className={`rounded-2xl border p-6 flex flex-col ${t.highlight ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200'}`}>
              {t.highlight && <span className="text-xs font-semibold text-blue-600 mb-2">MOST POPULAR</span>}
              <p className="font-semibold">{t.name}</p>
              <p className="text-3xl font-extrabold mt-1">{t.price}<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-sm text-gray-500 mt-1">{t.listings}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
                {t.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <Link href="/signup" className={`mt-6 text-center px-4 py-2 rounded-lg text-sm font-medium ${t.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 hover:bg-gray-50'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Every account starts with a 14-day Founding trial — full Starter features, no card. Then stay on Free (25 listings) or upgrade. Cancel anytime.</p>
      </section>

      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Not ready to connect your store yet?</h2>
          <p className="text-gray-600 mt-2 mb-6">Drop your email — we'll send early access and lock in founding pricing for you.</p>
          <LeadForm source="landing" />
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/compare" className="hover:text-gray-600">Compare repricers</Link>
          <Link href="/login" className="hover:text-gray-600">Log in</Link>
        </div>
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
