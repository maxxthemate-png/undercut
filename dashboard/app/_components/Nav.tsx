import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-line bg-paper/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-muted hover:text-ink transition">Pricing</Link>
          <Link href="/compare" className="text-muted hover:text-ink transition">Compare</Link>
          <Link href="/faq" className="text-muted hover:text-ink transition">FAQ</Link>
          <Link href="/login" className="text-muted hover:text-ink transition">Log in</Link>
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
        </div>
      </div>
    </nav>
  )
}
