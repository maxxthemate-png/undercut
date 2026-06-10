import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
      <div className="flex items-center justify-center gap-4 mb-2 flex-wrap">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <Link href="/compare" className="hover:text-gray-600">Compare</Link>
        <Link href="/guides/ebay-price-floor" className="hover:text-gray-600">Guides</Link>
        <Link href="/ebay-fee-calculator" className="hover:text-gray-600">Fee calculator</Link>
        <Link href="/signup" className="hover:text-gray-600">Start free</Link>
      </div>
      © Undercut — automated eBay repricing.
    </footer>
  )
}
