'use client'
import { useState } from 'react'

type Step = { label: string; done: boolean; cta?: string; onCta?: () => void; detail?: string }

export default function Onboarding({
  stores,
  listings,
  changes,
  busy,
  onConnect,
  onImport,
  onReprice,
}: {
  stores: any[]
  listings: any[]
  changes: any[]
  busy: string
  onConnect: () => void
  onImport: () => void
  onReprice: () => void
}) {
  const [hidden, setHidden] = useState(
    typeof window !== 'undefined' && localStorage.getItem('undercut_onboarding_hidden') === '1'
  )

  const floorsSet = listings.filter((l) => l.floor_price != null).length
  const steps: Step[] = [
    { label: 'Connect your eBay store', done: stores.length > 0, cta: 'Connect with eBay', onCta: onConnect },
    {
      label: 'Import your listings',
      done: listings.length > 0,
      cta: stores.length > 0 ? (busy === 'import' ? 'Importing…' : 'Import listings') : undefined,
      onCta: onImport,
    },
    {
      label: 'Set floor prices',
      done: listings.length > 0 && floorsSet > 0,
      detail: listings.length > 0 ? `${floorsSet} of ${listings.length} listings have a floor` : undefined,
      cta: listings.length > 0 ? 'Set floors below' : undefined,
      onCta: () => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Turn on repricing',
      done: listings.some((l) => l.repricing_enabled),
      cta: floorsSet > 0 ? 'Flip "On" in the table' : undefined,
      onCta: () => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ]
  const doneCount = steps.filter((s) => s.done).length
  const allDone = doneCount === steps.length

  if (hidden || allDone) return null
  const current = steps.findIndex((s) => !s.done)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">
          Get to your first automated reprice — step {doneCount + 1} of {steps.length}
        </p>
        <button
          onClick={() => {
            localStorage.setItem('undercut_onboarding_hidden', '1')
            setHidden(true)
          }}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          hide
        </button>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-4">
        <div className="h-1.5 bg-blue-600 rounded-full transition-all" style={{ width: `${(doneCount / steps.length) * 100}%` }} />
      </div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
            <span className={s.done ? 'text-gray-400 line-through' : i === current ? 'font-semibold' : 'text-gray-500'}>
              {s.done ? '✓ ' : `${i + 1}. `}
              {s.label}
              {s.detail && !s.done && <span className="text-xs text-gray-400 font-normal"> — {s.detail}</span>}
            </span>
            {i === current && s.cta && s.onCta && (
              <button
                onClick={s.onCta}
                disabled={busy !== ''}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
              >
                {s.cta}
              </button>
            )}
          </li>
        ))}
      </ol>
      {steps.every((s) => s.done) && changes.length === 0 && (
        <button onClick={onReprice} className="mt-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium">
          Run your first reprice now
        </button>
      )}
    </div>
  )
}
