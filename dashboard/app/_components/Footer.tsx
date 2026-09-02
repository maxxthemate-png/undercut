import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-muted">
      <div className="flex items-center justify-center gap-4 mb-2 flex-wrap">
        <Link href="/" className="hover:text-ink transition">Home</Link>
        <Link href="/pricing" className="hover:text-ink transition">Pricing</Link>
        <Link href="/compare" className="hover:text-ink transition">Compare</Link>
        <Link href="/faq" className="hover:text-ink transition">FAQ</Link>
        <Link href="/guides" className="hover:text-ink transition">Guides</Link>
        <Link href="/ebay-fee-calculator" className="hover:text-ink transition">Fee calculator</Link>
        <Link href="/ebay-price-checker" className="hover:text-ink transition">Price checker</Link>
        <Link href="/ebay-price-tracker" className="hover:text-ink transition">Price tracker</Link>
        <Link href="/ebay-profit-calculator" className="hover:text-ink transition">Profit calculator</Link>
        <Link href="/signup" className="hover:text-ink transition">Start free</Link>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2 flex-wrap text-xs">
        <Link href="/guides" className="hover:text-ink transition">All guides</Link>
        <Link href="/glossary" className="hover:text-ink transition">Glossary</Link>
        <Link href="/repricers" className="hover:text-ink transition">Repricers directory</Link>
        <Link href="/ebay-best-offer-calculator" className="hover:text-ink transition">Best offer calculator</Link>
        <Link href="/ebay-sell-through-rate-calculator" className="hover:text-ink transition">Sell-through rate calculator</Link>
        <Link href="/ebay-repricing-lag-calculator" className="hover:text-ink transition">Repricing lag calculator</Link>
        <Link href="/changelog" className="hover:text-ink transition">Changelog</Link>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2 flex-wrap text-xs">
        <Link href="/about" className="hover:text-ink transition">About</Link>
        <Link href="/contact" className="hover:text-ink transition">Contact</Link>
        <Link href="/privacy" className="hover:text-ink transition">Privacy</Link>
        <Link href="/terms" className="hover:text-ink transition">Terms</Link>
        <Link href="/refund-policy" className="hover:text-ink transition">Refunds</Link>
      </div>
      © Undercut — automated eBay repricing. Not affiliated with eBay Inc.
    </footer>
  )
}
