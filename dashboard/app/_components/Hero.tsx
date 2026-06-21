import Link from 'next/link'

export default function Hero({ eyebrow, h1, intro }: { eyebrow?: string; h1: string; intro: string }) {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
      {eyebrow && <p className="text-sm font-semibold text-cut">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">{h1}</h1>
      <p className="mt-5 text-lg text-muted">{intro}</p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
      </div>
    </section>
  )
}
