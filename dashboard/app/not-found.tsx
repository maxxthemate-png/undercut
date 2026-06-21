import Link from 'next/link'
import Nav from './_components/Nav'
import Footer from './_components/Footer'

export default function NotFound() {
  const popular = [
    ['Fee calculator', '/ebay-fee-calculator'],
    ['Price checker', '/ebay-price-checker'],
    ['Profit calculator', '/ebay-profit-calculator'],
    ['Price-floor guide', '/guides/ebay-price-floor'],
    ['Compare repricers', '/compare'],
    ['Pricing', '/pricing'],
  ]
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">404</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">This page got undercut.</h1>
        <p className="mt-4 text-muted">It doesn&apos;t exist (anymore). Here&apos;s where most sellers go:</p>
        <ul className="grid sm:grid-cols-2 gap-2 mt-8 text-sm">
          {popular.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="block px-4 py-3 rounded-lg border border-line hover:shadow text-cut font-medium transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 mt-8">
          Start free — 14-day trial, no card
        </Link>
      </section>
      <Footer />
    </div>
  )
}
