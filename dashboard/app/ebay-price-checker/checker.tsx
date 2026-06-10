'use client'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'

type Item = { title: string; price: number; condition?: string; url?: string }
type Result = { query: string; lowest: number | null; count: number; items: Item[] }

const money = (v: number | null | undefined) =>
  typeof v === 'number' && isFinite(v) ? `$${v.toFixed(2)}` : '—'

export default function Checker() {
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<Result | null>(null)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim().length < 3 || busy) return
    setBusy(true); setErr(''); setRes(null)
    try {
      const r = await api(`/api/tools/price-check?q=${encodeURIComponent(q.trim())}`)
      if (r.status === 429) setErr('Too many checks — give it a minute and try again.')
      else if (!r.ok) setErr('Something went wrong — try again.')
      else setRes(await r.json())
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={check} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Try "airpods pro 2" or "lego 75192"'
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-blue-500"
          maxLength={80}
        />
        <button
          type="submit"
          disabled={busy || q.trim().length < 3}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? 'Checking…' : 'Check price'}
        </button>
      </form>
      {err && <p className="text-sm text-red-600 mt-3">{err}</p>}

      {res && (
        <div className="mt-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-600 text-white rounded-2xl p-6">
              <p className="text-sm text-blue-100">Lowest live price right now</p>
              <p className="text-4xl font-extrabold mt-1">{money(res.lowest)}</p>
              <p className="text-sm text-blue-100 mt-2">across {res.count} live listings for &ldquo;{res.query}&rdquo;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600">To win this sale you&apos;d price at</p>
              <p className="text-4xl font-extrabold mt-1 text-green-700">{money(res.lowest != null ? Math.max(res.lowest - 0.01, 0) : null)}</p>
              <p className="text-sm text-gray-600 mt-2">a penny under — <i>if</i> that&apos;s still above your <Link href="/ebay-fee-calculator" className="text-blue-600 hover:text-blue-700">break-even floor</Link>.</p>
            </div>
          </div>

          {res.items.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm font-semibold mb-3">Cheapest live listings</p>
              <ul className="space-y-2 text-sm">
                {res.items.map((it, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4">
                    <span className="text-gray-700 truncate">
                      {it.url ? (
                        <a href={it.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-blue-700">{it.title}</a>
                      ) : it.title}
                      {it.condition ? <span className="text-gray-400"> · {it.condition}</span> : null}
                    </span>
                    <b className="whitespace-nowrap">{money(it.price)}</b>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-900 text-white rounded-2xl p-6 text-center">
            <p className="font-semibold">This number changes every day — Undercut watches it for you.</p>
            <p className="text-sm text-gray-300 mt-1 mb-4">It reprices your listings to beat the lowest competitor 24/7 and never crosses the floor you set.</p>
            <Link href="/signup" className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500">Start free — 14-day trial, no card</Link>
          </div>
        </div>
      )}
    </div>
  )
}
