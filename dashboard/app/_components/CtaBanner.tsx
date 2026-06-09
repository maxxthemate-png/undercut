import Link from 'next/link'

export default function CtaBanner({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="rounded-2xl bg-blue-600 text-white px-8 py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold">{heading}</h2>
        <p className="mt-3 text-blue-100">{sub}</p>
        <Link href="/signup" className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">Start free</Link>
      </div>
    </section>
  )
}
