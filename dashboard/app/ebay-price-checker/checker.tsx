'use client'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'
import { track } from '../lib/track'

type Item = { title?: string; price: number; condition?: string; url?: string }
type Result = {
  query?: string
  item?: Item | null   // present when a specific listing was resolved by URL
  lowest: number | null
  count: number
  items: Item[]
}

const money = (v: number | null | undefined) =>
  typeof v === 'number' && isFinite(v) ? `$${v.toFixed(2)}` : '—'

// A pasted eBay URL or a bare item id → exact-listing lookup; anything else → keyword search.
const looksLikeListing = (s: string) => /ebay\.[a-z.]+\/|\/itm\/|^\d{9,15}$/i.test(s.trim())

export default function Checker() {
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<Result | null>(null)
  const [floor, setFloor] = useState<string>('')
  const [floorFired, setFloorFired] = useState(false)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    const raw = q.trim()
    if (raw.length < 3 || busy) return
    setBusy(true); setErr(''); setRes(null); setFloor(''); setFloorFired(false)
    const listing = looksLikeListing(raw)
    const path = listing
      ? `/api/tools/listing-check?url=${encodeURIComponent(raw)}`
      : `/api/tools/price-check?q=${encodeURIComponent(raw)}`
    try {
      const r = await api(path)
      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        setErr(d.detail || 'Something went wrong — try again.')
      } else {
        const data: Result = await r.json()
        // A listing that resolved without a title = an eBay variation/group link we
        // can't read cleanly. Show a friendly nudge instead of a blank result.
        if (listing && !(data.item && data.item.title)) {
          setErr("Couldn't read that exact listing — paste the full link (the one with /itm/…), or just search the product name instead.")
        } else {
          setRes(data)
          track('demo_use', { mode: listing ? 'listing' : 'keyword', lowest: data.lowest ?? 0, listings: data.count })
        }
      }
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  const item = res?.item ?? null
  const lowest = res?.lowest ?? null
  const pennyUnder = lowest != null ? Math.max(lowest - 0.01, 0) : null
  const floorNum = floor.trim() === '' ? null : Number(floor)
  const floorValid = floorNum != null && isFinite(floorNum) && floorNum > 0
  const wins = floorValid && pennyUnder != null && pennyUnder >= (floorNum as number)
  const margin = wins ? (pennyUnder as number) - (floorNum as number) : 0

  function onFloorChange(v: string) {
    setFloor(v)
    if (!floorFired && v.trim() !== '') {
      track('demo_floor', { mode: item ? 'listing' : 'keyword' })
      setFloorFired(true)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={check} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Paste your eBay listing URL — or search a product"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-blue-500"
          maxLength={400}
        />
        <button
          type="submit"
          disabled={busy || q.trim().length < 3}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? 'Checking…' : 'Check it'}
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">Paste a full listing link (the one with <span className="font-mono">/itm/…</span>) for an exact, like-for-like check. A plain product search works too, but matches loosely.</p>
      {err && <p className="text-sm text-red-600 mt-3">{err}</p>}

      {res && (
        <div className="mt-8 space-y-4">
          {/* Your listing (only when resolved by URL) */}
          {item && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-500">Your listing</p>
              <p className="font-semibold leading-snug mt-1">
                {item.url ? <a href={item.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-blue-700">{item.title}</a> : item.title}
                {item.condition ? <span className="text-gray-400 font-normal"> · {item.condition}</span> : null}
              </p>
              {item.price != null && <p className="text-sm text-gray-600 mt-1">Your current price: <b>{money(item.price)}</b></p>}
            </div>
          )}

          {lowest != null ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white rounded-2xl p-6">
                <p className="text-sm text-blue-100">{item ? 'Lowest competitor right now' : 'Lowest live price right now'}</p>
                <p className="text-4xl font-extrabold mt-1">{money(lowest)}</p>
                <p className="text-sm text-blue-100 mt-2">across {res.count} {item ? 'competing' : 'live'} listing{res.count === 1 ? '' : 's'}{!item && res.query ? ` for “${res.query}”` : ''}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-sm text-gray-600">To win this sale you&apos;d price at</p>
                <p className="text-4xl font-extrabold mt-1 text-green-700">{money(pennyUnder)}</p>
                <p className="text-sm text-gray-600 mt-2">a penny under the lowest competitor.</p>
              </div>
            </div>
          ) : item ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="text-green-900 font-semibold">No other live listings of this exact item right now.</p>
              <p className="text-sm text-green-800 mt-1">You set the price. Undercut starts defending your floor the moment a competitor appears — so you never get undercut while you&apos;re not looking.</p>
            </div>
          ) : null}

          {/* Instant demo: what Undercut would do against the seller's own floor */}
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
              <p className="text-sm font-semibold mb-3">Cheapest {item ? 'competing ' : ''}live listings</p>
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
