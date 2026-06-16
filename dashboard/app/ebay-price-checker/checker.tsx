'use client'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'
import { track } from '../lib/track'

type Item = { title: string; price: number; condition?: string; url?: string }
type Result = { query: string; lowest: number | null; count: number; items: Item[] }

const money = (v: number | null | undefined) =>
  typeof v === 'number' && isFinite(v) ? `$${v.toFixed(2)}` : '—'

export default function Checker() {
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<Result | null>(null)
  const [floor, setFloor] = useState<string>('')
  const [floorFired, setFloorFired] = useState(false)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim().length < 3 || busy) return
    setBusy(true); setErr(''); setRes(null); setFloor(''); setFloorFired(false)
    try {
      const r = await api(`/api/tools/price-check?q=${encodeURIComponent(q.trim())}`)
      if (r.status === 429) setErr('Too many checks — give it a minute and try again.')
      else if (!r.ok) setErr('Something went wrong — try again.')
      else {
        const data: Result = await r.json()
        setRes(data)
        track('demo_use', { query: data.query, lowest: data.lowest ?? 0, listings: data.count })
      }
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  const lowest = res?.lowest ?? null
  const pennyUnder = lowest != null ? Math.max(lowest - 0.01, 0) : null
  const floorNum = floor.trim() === '' ? null : Number(floor)
  const floorValid = floorNum != null && isFinite(floorNum) && floorNum > 0
  // Decision: win the sale above the floor, or hold at the floor and refuse the loss.
  const wins = floorValid && pennyUnder != null && pennyUnder >= (floorNum as number)
  const margin = wins ? (pennyUnder as number) - (floorNum as number) : 0

  function onFloorChange(v: string) {
    setFloor(v)
    if (!floorFired && v.trim() !== '') {
      track('demo_floor', { query: res?.query })
      setFloorFired(true)
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
              <p className="text-4xl font-extrabold mt-1">{money(lowest)}</p>
              <p className="text-sm text-blue-100 mt-2">across {res.count} live listings for &ldquo;{res.query}&rdquo;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600">To win this sale you&apos;d price at</p>
              <p className="text-4xl font-extrabold mt-1 text-green-700">{money(pennyUnder)}</p>
              <p className="text-sm text-gray-600 mt-2">a penny under the lowest competitor.</p>
            </div>
          </div>

          {/* Instant demo: show exactly what Undercut would do against the seller's own floor */}
          {lowest != null && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm font-semibold">Now see what Undercut would actually do to your listing</p>
              <p className="text-sm text-gray-600 mt-1 mb-3">Enter your cost or break-even floor — the lowest price you&apos;d ever accept on this item.</p>
              <div className="flex items-center gap-2 max-w-xs">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={floor}
                  onChange={(e) => onFloorChange(e.target.value)}
                  placeholder="Your floor (e.g. 48.00)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>

              {floorValid && pennyUnder != null && (
                wins ? (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-green-900 font-semibold">✅ Undercut lists you at {money(pennyUnder)} and wins the sale.</p>
                    <p className="text-sm text-green-800 mt-1">
                      That&apos;s a penny under the lowest competitor and <b>{money(margin)} above your {money(floorNum)} floor</b> — you take the sale and keep the margin. Undercut re-checks and holds that edge 24/7.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-amber-900 font-semibold">🛡️ The market is already below your {money(floorNum)} floor.</p>
                    <p className="text-sm text-amber-800 mt-1">
                      A &ldquo;just undercut everyone&rdquo; rule would drag you to {money(pennyUnder)} and lose money on every sale. Undercut <b>holds at {money(floorNum)} and waits</b> — you never sell at a loss chasing the bottom. The moment competitors rise above your floor, it starts winning again automatically.
                    </p>
                  </div>
                )
              )}
            </div>
          )}

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
            <p className="font-semibold">That&apos;s one listing. Undercut does this for your whole store.</p>
            <p className="text-sm text-gray-300 mt-1 mb-4">It watches the lowest competitor on every listing, reprices you to win 24/7, and never crosses the floor you set. Set it and forget it.</p>
            <Link href="/signup" className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500">Start free — 14-day trial, no card</Link>
          </div>
        </div>
      )}
    </div>
  )
}
