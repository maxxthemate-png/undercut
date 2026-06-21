import type { ComparisonRow } from '../_content/types'

export default function ComparisonTable({
  competitor,
  rows,
  disclaimer,
}: {
  competitor: string
  rows: ComparisonRow[]
  disclaimer?: string
}) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-wash text-left">
              <th className="px-4 py-3 text-sm font-semibold text-muted w-48">Feature</th>
              <th className="px-4 py-3 text-sm font-bold text-cut bg-cut-tint">Undercut</th>
              <th className="px-4 py-3 text-sm font-semibold text-ink">{competitor}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-sm font-medium text-ink">{r.label}</td>
                <td className="px-4 py-3 text-sm align-top font-medium text-ink bg-cut-tint">{r.undercut}</td>
                <td className="px-4 py-3 text-sm align-top text-muted">{r.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">
        {disclaimer ||
          'Positioning as of 2026. Competitor features and pricing change — check their site for current details. All product names and trademarks are property of their respective owners.'}
      </p>
    </section>
  )
}
