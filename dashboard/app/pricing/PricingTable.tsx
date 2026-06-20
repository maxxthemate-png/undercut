'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PLANS } from '../_content/shared'

const FEATURES: Record<string, string[]> = {
  free: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'],
  starter: ['Rule-based undercut', 'Hourly repricing', 'Hard price floor'],
  pro: ['AI price optimizer', '15-min repricing', 'Hard price floor'],
  scale: ['AI price optimizer', '15-min repricing', 'Priority support'],
}

export default function PricingTable() {
  const [annual, setAnnual] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setAnnual(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${!annual ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${annual ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          Annual <span className={annual ? 'text-green-300' : 'text-green-600'}>· 2 months free</span>
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        {PLANS.map((p) => {
          const highlight = p.key === 'pro'
          return (
            <div key={p.key} className={`rounded-2xl border p-6 flex flex-col ${highlight ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200'}`}>
              {highlight && <span className="text-xs font-semibold text-blue-600 mb-2">MOST POPULAR</span>}
              <p className="font-semibold">{p.name}</p>
              {annual && p.annual > 0 ? (
                <>
                  <p className="text-3xl font-extrabold mt-1">${p.annual.toLocaleString()}<span className="text-sm font-normal text-gray-400">/yr</span></p>
                  <p className="text-xs text-green-700 mt-1 font-medium">= ${Math.round(p.annual / 12)}/mo · save ${p.save}</p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-extrabold mt-1">${p.monthly}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                  {p.monthly > 0 && <p className="text-xs text-gray-400 mt-1">or ${p.annual.toLocaleString()}/yr (2 months free)</p>}
                </>
              )}
              <p className="text-sm text-gray-500 mt-1">{p.listings}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
                {(FEATURES[p.key] || []).map((f) => <li key={f}>• {f}</li>)}
              </ul>
              <Link
                href="/signup"
                className={`mt-6 text-center px-4 py-2 rounded-lg text-sm font-medium ${highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 hover:bg-gray-50'}`}
              >
                Start free
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
