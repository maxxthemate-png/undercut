import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-[#EE2B1C]">cut</span></Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
        </div>
      </div>
    </nav>
  )
}
