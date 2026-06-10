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
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="text-sm font-semibold text-[#EE2B1C] uppercase tracking-wide">404</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">This page got undercut.</h1>
        <p className="mt-4 text-gray-600">It doesn&apos;t exist (anymore). Here&apos;s where most sellers go:</p>
        <ul className="grid sm:grid-cols-2 gap-2 mt-8 text-sm">
          {popular.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="block px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-blue-600 font-medium">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/signup" className="inline-block mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
          Start free — 14-day trial, no card
        </Link>
      </section>
      <Footer />
    </div>
  )
}
