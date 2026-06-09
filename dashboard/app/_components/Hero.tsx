import Link from 'next/link'

export default function Hero({ eyebrow, h1, intro }: { eyebrow?: string; h1: string; intro: string }) {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
      {eyebrow && <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">{h1}</h1>
      <p className="mt-5 text-lg text-gray-600">{intro}</p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free — 14-day trial, no card</Link>
      </div>
    </section>
  )
}
