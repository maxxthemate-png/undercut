import type { ContentSection } from '../_content/types'

function paragraphs(body?: string): string[] {
  if (!body) return []
  return body.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
}

export default function Prose({ sections }: { sections: ContentSection[] }) {
  return (
    <section className="max-w-2xl mx-auto px-6 py-8">
      {sections.map((s, i) => (
        <div key={i} className="mt-10 first:mt-0">
          <h2 className="text-2xl font-bold mb-3">{s.h2}</h2>
          {paragraphs(s.body).map((p, j) => (
            <p key={j} className="text-gray-700 mt-3 leading-relaxed">{p}</p>
          ))}
          {s.bullets && s.bullets.length > 0 && (
            <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
              {s.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}
