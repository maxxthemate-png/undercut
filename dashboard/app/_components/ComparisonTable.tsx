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
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-500 w-48">Feature</th>
              <th className="px-4 py-3 text-sm font-bold text-blue-700 bg-blue-50">Undercut</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">{competitor}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.label}</td>
                <td className="px-4 py-3 text-sm align-top font-medium text-gray-900 bg-blue-50">{r.undercut}</td>
                <td className="px-4 py-3 text-sm align-top text-gray-600">{r.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        {disclaimer ||
          'Positioning as of 2026. Competitor features and pricing change — check their site for current details. All product names and trademarks are property of their respective owners.'}
      </p>
    </section>
  )
}
