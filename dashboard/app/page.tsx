/** Undercut — marketing landing + pricing. */
import Link from 'next/link'
import LeadForm from './lead-form'
import TrustSection from './_components/TrustSection'
import Footer from './_components/Footer'

const TIERS = [
  { name: 'Free', price: '$0', listings: '25 listings', features: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'], cta: 'Start free', highlight: false },
  { name: 'Starter', price: '$29', listings: '100 listings', features: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'], cta: 'Start free', highlight: false },
  { name: 'Pro', price: '$79', listings: '1,000 listings', features: ['AI price optimizer', '15-min repricing', 'Hard price floor'], cta: 'Start free', highlight: true },
  { name: 'Scale', price: '$199', listings: '10,000 listings', features: ['AI price optimizer', '15-min repricing', 'Priority support'], cta: 'Start free', highlight: false },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></span>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/pricing" className="text-muted hover:text-ink transition">Pricing</Link>
            <Link href="/compare" className="text-muted hover:text-ink transition">Compare</Link>
            <Link href="/login" className="text-muted hover:text-ink transition">Log in</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Win the sale on autopilot.</h1>
        <p className="mt-5 text-lg text-muted">
          Undercut automatically reprices your eBay listings to beat the lowest competitor —
          with a hard floor so you <span className="font-semibold text-ink">never sell below your minimum</span>.
          AI decides how aggressive to be, 24/7.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
          <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded border border-line text-ink font-medium px-5 py-2.5 transition hover:border-muted">Log in</Link>
        </div>
        <p className="mt-4 text-sm text-muted"><Link href="/ebay-profit-calculator" className="text-cut hover:underline">Try the free eBay profit calculator →</Link></p>
        <p className="mt-2 text-sm text-muted">Migrating off inkFrog? <Link href="/inkfrog-alternative" className="text-cut hover:underline">See how Undercut picks up the pricing job →</Link></p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {[
          ['1. Connect eBay', 'Securely link your store in one click. We import your active listings automatically.'],
          ['2. Set your floor', 'Pick a minimum price per item. We will never go below it — your margin is protected.'],
          ['3. We undercut, 24/7', 'We track the lowest competitor and reprice to win, AI-tuned so you don’t race to the bottom.'],
        ].map(([t, d]) => (
          <div key={t} className="bg-wash rounded-lg p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-muted mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Simple, volume-based pricing</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {TIERS.map(t => (
            <div key={t.name} className={`rounded-lg border p-6 flex flex-col ${t.highlight ? 'border-cut ring-1 ring-cut' : 'border-line'}`}>
              {t.highlight && <span className="text-xs font-semibold text-cut mb-2">MOST POPULAR</span>}
              <p className="font-semibold">{t.name}</p>
              <p className="text-3xl font-extrabold mt-1"><span className="tabular">{t.price}</span><span className="text-sm font-normal text-muted">/mo</span></p>
              <p className="text-sm text-muted mt-1">{t.listings}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted flex-1">
                {t.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <Link href="/signup" className={`mt-6 text-center text-sm font-medium ${t.highlight ? 'inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white px-4 py-2 transition hover:opacity-90' : 'inline-flex items-center justify-center gap-2 rounded border border-line text-ink px-4 py-2 transition hover:border-muted'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-6">Every account starts with a 14-day Founding trial — full Starter features, no card. Then stay on Free (25 listings) or upgrade. <span className="font-medium text-muted">Pay annually and get 2 months free.</span> Cancel anytime.</p>
      </section>

      <TrustSection />

      <section className="bg-wash border-t border-line">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">Not ready to connect your store yet?</h2>
          <p className="text-muted mt-2 mb-6">Not ready to connect your store? Get the eBay repricing starter guide — how to set floors that protect margin — by email.</p>
          <LeadForm source="landing" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
