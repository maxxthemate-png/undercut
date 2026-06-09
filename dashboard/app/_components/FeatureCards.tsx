export default function FeatureCards({ items }: { items: { title: string; body: string }[] }) {
  if (!items?.length) return null
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-6">
          <p className="font-semibold">{it.title}</p>
          <p className="text-sm text-gray-600 mt-2">{it.body}</p>
        </div>
      ))}
    </section>
  )
}
