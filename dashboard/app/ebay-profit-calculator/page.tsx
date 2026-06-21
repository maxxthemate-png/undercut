import Link from 'next/link'
import Calculator from './calculator'
import LeadForm from '../lead-form'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'Free eBay Repricing Profit Calculator — Undercut',
  'See your safe price floor and exactly what you net when you undercut the lowest competitor — without ever selling below your minimum. Free, no signup.',
  '/ebay-profit-calculator'
)

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/ebay-fee-calculator" className="text-muted hover:text-ink transition">Fee calculator</Link>
            <Link href="/compare" className="text-muted hover:text-ink transition">Compare</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">eBay Repricing Profit Calculator</h1>
        <p className="mt-4 text-muted">Find your safe <b>price floor</b> and see exactly what you net when you undercut the lowest competitor — without ever selling below your minimum.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <Calculator />
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Let Undercut do this automatically, 24/7.</h2>
        <p className="text-muted mt-2 mb-5">It reprices every listing to beat the lowest competitor and stops dead at your floor. Start free — 14-day trial, no card.</p>
        <div className="flex justify-center mb-8">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        </div>
        <p className="text-sm text-muted mb-3">Not ready? Get early access + founding pricing:</p>
        <LeadForm source="calculator" />
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted bg-surface">
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
