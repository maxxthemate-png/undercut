import Link from 'next/link'

export default function CtaBanner({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="rounded-lg bg-ink text-white px-8 py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold">{heading}</h2>
        <p className="mt-3 text-white/75">{sub}</p>
        <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 mt-6">Start free</Link>
      </div>
    </section>
  )
}
