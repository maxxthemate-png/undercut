/**
 * Undercut — eBay Repricer Dashboard
 * Connect a store, set floor/ceiling/undercut rules, run repricing, see changes.
 */
'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.API_URL || 'http://localhost:8000'

interface Listing {
  id: string
  ebay_item_id: string
  title: string
  current_price: number | null
  floor_price: number | null
  ceiling_price: number | null
  undercut_value: number | null
  undercut_type: string | null
  ai_enabled: boolean
  repricing_enabled: boolean
  last_competitor_low: number | null
  last_repriced_at: string | null
}
interface Store { id: string; name: string; ebay_user_id: string | null }
interface Change {
  old_price: number; new_price: number; competitor_low: number | null
  source: string; reason: string; at: string | null
}

const money = (n: number | null) => (n == null ? '—' : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`)

export default function Dashboard() {
  const [stores, setStores] = useState<Store[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [changes, setChanges] = useState<Change[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [newStore, setNewStore] = useState({ name: '', token: '' })

  async function fetchAll() {
    try {
      const [s, l, c] = await Promise.all([
        fetch(`${API_URL}/api/repricer/stores`),
        fetch(`${API_URL}/api/repricer/listings`),
        fetch(`${API_URL}/api/repricer/price-changes`),
      ])
      if (s.ok) setStores((await s.json()).stores || [])
      if (l.ok) setListings((await l.json()).listings || [])
      if (c.ok) setChanges((await c.json()).changes || [])
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }
  useEffect(() => { fetchAll(); const t = setInterval(fetchAll, 30000); return () => clearInterval(t) }, [])

  async function connectStore() {
    if (!newStore.name) return
    setBusy('connect')
    const r = await fetch(`${API_URL}/api/repricer/stores`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newStore.name, user_token: newStore.token || null }),
    })
    const { id } = await r.json()
    await fetch(`${API_URL}/api/repricer/stores/${id}/import`, { method: 'POST' })
    setNewStore({ name: '', token: '' }); setBusy(''); fetchAll()
  }

  async function saveRule(l: Listing, patch: Partial<Listing>) {
    await fetch(`${API_URL}/api/repricer/listings/${l.id}/rule`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch),
    })
    fetchAll()
  }
  async function runReprice() { setBusy('run'); await fetch(`${API_URL}/api/repricer/run`, { method: 'POST' }); setBusy(''); fetchAll() }

  const enabled = listings.filter(l => l.repricing_enabled).length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Undercut</h1>
            <p className="text-xs text-gray-400">Automated eBay repricing</p>
          </div>
          <button onClick={runReprice} disabled={busy === 'run'}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
            {busy === 'run' ? 'Repricing…' : '↺ Reprice now'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Connected stores" value={String(stores.length)} />
          <Stat label="Listings" value={String(listings.length)} />
          <Stat label="Repricing on" value={String(enabled)} />
          <Stat label="Price changes" value={String(changes.length)} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-3">Connect an eBay store</p>
          <div className="flex flex-wrap gap-2 items-center">
            <input placeholder="Store name" value={newStore.name}
              onChange={e => setNewStore({ ...newStore, name: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="eBay user token (until OAuth)" value={newStore.token}
              onChange={e => setNewStore({ ...newStore, token: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-[240px]" />
            <button onClick={connectStore} disabled={busy === 'connect' || !newStore.name}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-black disabled:opacity-50">
              {busy === 'connect' ? 'Connecting…' : 'Connect + import'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-right">Current</th>
                <th className="px-4 py-3 text-right">Comp. low</th>
                <th className="px-4 py-3 text-right">Floor</th>
                <th className="px-4 py-3 text-right">Ceiling</th>
                <th className="px-4 py-3 text-right">Undercut</th>
                <th className="px-4 py-3 text-center">AI</th>
                <th className="px-4 py-3 text-center">Repricing</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-16 text-center text-gray-400">Loading…</td></tr>
              ) : listings.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-16 text-center text-gray-400">No listings yet — connect a store above.</td></tr>
              ) : listings.map(l => (
                <tr key={l.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 leading-tight">{l.title}</div>
                    <div className="text-xs text-gray-400">#{l.ebay_item_id}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">{money(l.current_price)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{money(l.last_competitor_low)}</td>
                  <td className="px-4 py-3 text-right"><NumCell v={l.floor_price} onSave={v => saveRule(l, { floor_price: v })} /></td>
                  <td className="px-4 py-3 text-right"><NumCell v={l.ceiling_price} onSave={v => saveRule(l, { ceiling_price: v })} /></td>
                  <td className="px-4 py-3 text-right"><NumCell v={l.undercut_value} onSave={v => saveRule(l, { undercut_value: v })} /></td>
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" checked={l.ai_enabled} onChange={e => saveRule(l, { ai_enabled: e.target.checked })} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" checked={l.repricing_enabled} onChange={e => saveRule(l, { repricing_enabled: e.target.checked })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-3">Recent price changes</p>
          {changes.length === 0 ? (
            <p className="text-sm text-gray-400">No changes yet. Set a floor + enable repricing, then “Reprice now”.</p>
          ) : (
            <div className="space-y-1 text-sm">
              {changes.map((c, i) => (
                <div key={i} className="flex justify-between border-b border-gray-50 py-1">
                  <span className="text-gray-600">{money(c.old_price)} → <span className="font-medium text-gray-900">{money(c.new_price)}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{c.source}</span></span>
                  <span className="text-xs text-gray-400">{c.reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function NumCell({ v, onSave }: { v: number | null; onSave: (v: number) => void }) {
  const [val, setVal] = useState<number | ''>(v ?? '')
  useEffect(() => { setVal(v ?? '') }, [v])
  return (
    <input
      type="number" value={val}
      onChange={e => setVal(e.target.value === '' ? '' : Number(e.target.value))}
      onBlur={() => { if (val !== '' && Number(val) !== v) onSave(Number(val)) }}
      className="w-24 border border-gray-200 rounded px-2 py-1 text-right text-sm"
      placeholder="—"
    />
  )
}
