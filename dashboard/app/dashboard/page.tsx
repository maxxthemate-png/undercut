'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { api, tok } from '../lib/api'
import Onboarding from './Onboarding'
import { PLANS } from '../_content/shared'

const planLabel = (key: string, interval: 'month' | 'year') => {
  const p = PLANS.find((x) => x.key === key)
  if (!p) return key
  return interval === 'year' ? `${p.name} $${p.annual.toLocaleString()}/yr` : `${p.name} $${p.monthly}`
}
// numeric listing capacity for a plan key, parsed from its "1,000 listings" label
const planCap = (key: string) => {
  const p = PLANS.find((x) => x.key === key)
  return p ? parseInt(p.listings.replace(/[^0-9]/g, ''), 10) || 0 : 0
}

interface Listing {
  id: string; ebay_item_id: string; title: string
  current_price: number | null; floor_price: number | null; ceiling_price: number | null
  undercut_value: number | null; ai_enabled: boolean; repricing_enabled: boolean
  last_competitor_low: number | null
}
const money = (n: number | null) => (n == null ? '—' : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`)

export default function Dashboard() {
  const router = useRouter()
  const [me, setMe] = useState<any>(null)
  const [stores, setStores] = useState<any[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [changes, setChanges] = useState<any[]>([])
  const [value, setValue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [manualToken, setManualToken] = useState('')
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')
  const [justImported, setJustImported] = useState(0)
  const prevCount = useRef<number | null>(null)

  useEffect(() => {
    if (!tok.get()) { router.push('/login'); return }
    fetchAll(); const t = setInterval(fetchAll, 30000); return () => clearInterval(t)
  }, [])

  async function fetchAll() {
    const meRes = await api('/api/auth/me')
    if (meRes.status === 401) { tok.clear(); router.push('/login'); return }
    setMe(await meRes.json())
    const [s, l, c, v] = await Promise.all([api('/api/repricer/stores'), api('/api/repricer/listings'), api('/api/repricer/price-changes'), api('/api/repricer/value-summary')])
    if (s.ok) setStores((await s.json()).stores || [])
    if (l.ok) {
      const ls = (await l.json()).listings || []
      if (prevCount.current === 0 && ls.length > 0) setJustImported(ls.length)
      prevCount.current = ls.length
      setListings(ls)
    }
    if (c.ok) setChanges((await c.json()).changes || [])
    if (v.ok) setValue(await v.json())   // null/ignored until the endpoint is deployed
    setLoading(false)
  }

  async function importListings() {
    if (!stores.length) return
    setBusy('import')
    await api(`/api/repricer/stores/${stores[0].id}/import`, { method: 'POST' })
    setBusy('')
    fetchAll()
  }

  async function connectEbay() {
    setBusy('connect')
    const d = await (await api('/api/repricer/oauth/login')).json()
    setBusy('')
    if (d.configured && d.url) window.location.href = d.url
    else alert('eBay OAuth not configured yet — paste a token below for now.')
  }
  async function connectManual() {
    if (!manualToken) return; setBusy('manual')
    const { id } = await (await api('/api/repricer/stores', { method: 'POST', body: JSON.stringify({ name: 'eBay Store', user_token: manualToken }) })).json()
    if (id) await api(`/api/repricer/stores/${id}/import`, { method: 'POST' })
    setManualToken(''); setBusy(''); fetchAll()
  }
  async function saveRule(id: string, patch: any) { await api(`/api/repricer/listings/${id}/rule`, { method: 'PUT', body: JSON.stringify(patch) }); fetchAll() }
  async function runReprice() { setBusy('run'); await api('/api/repricer/run', { method: 'POST' }); setBusy(''); fetchAll() }
  async function upgrade(plan: string, interval: 'month' | 'year' = 'month') {
    const d = await (await api('/api/billing/checkout', { method: 'POST', body: JSON.stringify({ plan, interval }) })).json()
    if (d.url) window.location.href = d.url; else alert(d.detail || 'Billing not configured yet.')
  }
  async function manageBilling() {
    setBusy('portal')
    const d = await (await api('/api/billing/portal', { method: 'POST' })).json()
    setBusy('')
    if (d.url) window.location.href = d.url; else alert(d.detail || 'No billing account yet.')
  }
  function logout() { tok.clear(); router.push('/login') }

  // Usage-based upgrade nudge: the highest-intent upsell moment is when a seller
  // is at/over their listing limit (overflow listings are silently not repriced).
  const limit: number = me?.listing_limit ?? 0
  const overflow = me ? listings.length - limit : 0
  const usagePct = limit > 0 ? Math.round((listings.length / limit) * 100) : 0
  const upgradeTargets = PLANS.filter((p) => planCap(p.key) > limit) // only tiers with more capacity
  const limitNudge: 'over' | 'near' | null =
    !me || limit <= 0 || upgradeTargets.length === 0
      ? null
      : overflow > 0
        ? 'over'
        : listings.length / limit >= 0.8
          ? 'near'
          : null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div><h1 className="text-lg font-bold">Undercut</h1><p className="text-xs text-gray-400">Automated eBay repricing</p></div>
          <div className="flex items-center gap-3 text-sm">
            {me && <span className={`text-xs px-2 py-1 rounded-full ${limitNudge === 'over' ? 'bg-red-100 text-red-800' : limitNudge === 'near' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`} title={limitNudge === 'over' ? `${overflow} listings over your plan limit` : limitNudge === 'near' ? 'Approaching your listing limit' : ''}>{me.plan} · {listings.length}/{me.listing_limit}</span>}
            <button onClick={runReprice} disabled={busy === 'run'} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50">{busy === 'run' ? 'Repricing…' : '↺ Reprice now'}</button>
            {me?.stripe_customer_id && <button onClick={manageBilling} disabled={busy === 'portal'} className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50">{busy === 'portal' ? '…' : 'Billing'}</button>}
            <button onClick={logout} className="text-gray-500 hover:text-gray-800">Log out</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {value && value.margin_protected > 0 && (
          <div className="bg-green-600 text-white rounded-xl p-5">
            <p className="text-xs text-green-100 uppercase tracking-wide">Last {value.days} days</p>
            <p className="text-3xl font-extrabold mt-1">
              {money(value.margin_protected)} <span className="text-base font-medium text-green-100">of margin held above your floors</span>
            </p>
            <p className="text-sm text-green-100 mt-1">
              {value.reprices} reprice{value.reprices === 1 ? '' : 's'} · won {value.wins} sale{value.wins === 1 ? '' : 's'} by undercutting
              {value.floored > 0 ? <> · held the floor {value.floored} time{value.floored === 1 ? '' : 's'} instead of racing to the bottom</> : null} — never below your minimum.
            </p>
          </div>
        )}
        {me && me.is_trialing && (() => {
          const d = me.trial_days_left ?? 0
          const urgent = d <= 3
          const soon = d > 3 && d <= 7
          const wrap = urgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
          const text = urgent ? 'text-red-900' : 'text-amber-900'
          return (
            <div className={`${wrap} border rounded-xl p-4`}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className={`text-sm ${text}`}>
                  {urgent
                    ? <>⏰ <b>Only {d} day{d === 1 ? '' : 's'} left</b> on your founding trial — lock in founding pricing now.</>
                    : soon
                      ? <><b>Your founding trial ends in {d} days.</b> Full Starter features ({me.listing_limit} listings), no card.</>
                      : <>🎉 <b>Founding trial</b> — {d} day{d === 1 ? '' : 's'} left · full Starter features ({me.listing_limit} listings), no card. Lock in your plan anytime.</>}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setBillingInterval(billingInterval === 'year' ? 'month' : 'year')} className="text-xs underline text-gray-500 mr-1 whitespace-nowrap">{billingInterval === 'year' ? 'Annual — 2 months free' : 'Monthly'}</button>
                  <button onClick={() => upgrade('starter', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-white border whitespace-nowrap">{planLabel('starter', billingInterval)}</button>
                  <button onClick={() => upgrade('pro', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white whitespace-nowrap">{planLabel('pro', billingInterval)}</button>
                  <button onClick={() => upgrade('scale', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-white border whitespace-nowrap">{planLabel('scale', billingInterval)}</button>
                </div>
              </div>
              <p className={`text-xs mt-2 ${urgent ? 'text-red-700' : 'text-amber-700'}`}>
                When your trial ends you keep your account and move to Free (25 listings) — repricing pauses on the rest until you upgrade. No surprise charges.
              </p>
            </div>
          )
        })()}

        {limitNudge && (
          <div className={`border rounded-xl p-4 ${limitNudge === 'over' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className={`text-sm ${limitNudge === 'over' ? 'text-red-900' : 'text-amber-900'}`}>
                {limitNudge === 'over'
                  ? <>⚠️ <b>{overflow} of your {listings.length} listings aren't being repriced.</b> Your plan covers {limit.toLocaleString()} — upgrade to reprice all {listings.length.toLocaleString()} and stop leaving sales on the table.</>
                  : <><b>You're using {listings.length.toLocaleString()} of {limit.toLocaleString()} listings ({usagePct}%).</b> Upgrade before new imports get paused at your limit.</>}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setBillingInterval(billingInterval === 'year' ? 'month' : 'year')} className="text-xs underline text-gray-500 mr-1 whitespace-nowrap">{billingInterval === 'year' ? 'Annual — 2 months free' : 'Monthly'}</button>
                {upgradeTargets.map((p, i) => (
                  <button key={p.key} onClick={() => upgrade(p.key, billingInterval)} className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{planLabel(p.key, billingInterval)}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {me && me.plan === 'free' && !limitNudge && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm text-blue-900">{value && value.margin_protected > 0 ? <>Undercut held <b>{money(value.margin_protected)}</b> of margin for you on Free — </> : <>You're on <b>Free</b> (25 listings). </>}Upgrade for more listings + 15-min AI repricing — your floors and settings are all saved.</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setBillingInterval(billingInterval === 'year' ? 'month' : 'year')} className="text-xs underline text-gray-500 mr-1 whitespace-nowrap">{billingInterval === 'year' ? 'Annual — 2 months free' : 'Monthly'}</button>
              <button onClick={() => upgrade('starter', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-white border whitespace-nowrap">{planLabel('starter', billingInterval)}</button>
              <button onClick={() => upgrade('pro', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white whitespace-nowrap">{planLabel('pro', billingInterval)}</button>
              <button onClick={() => upgrade('scale', billingInterval)} className="px-3 py-1.5 text-sm rounded-lg bg-white border whitespace-nowrap">{planLabel('scale', billingInterval)}</button>
            </div>
          </div>
        )}

        {justImported > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
            <p className="text-sm text-green-900">✅ Imported <b>{justImported} listing{justImported === 1 ? '' : 's'}</b> — now set a floor on each so we never price below your minimum.</p>
            <button onClick={() => setJustImported(0)} className="text-xs text-green-700 hover:text-green-900">dismiss</button>
          </div>
        )}

        {!loading && (
          <Onboarding
            stores={stores}
            listings={listings}
            changes={changes}
            busy={busy}
            onConnect={connectEbay}
            onImport={importListings}
            onReprice={runReprice}
          />
        )}

        {stores.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center space-y-3">
            <p className="font-semibold">Connect your eBay store</p>
            <button onClick={connectEbay} disabled={busy === 'connect'} className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm">Connect with eBay</button>
            <div className="text-xs text-gray-400">or paste a token</div>
            <div className="flex gap-2 max-w-lg mx-auto">
              <input value={manualToken} onChange={e => setManualToken(e.target.value)} placeholder="eBay user token" className="flex-1 border rounded-lg px-3 py-2 text-sm" />
              <button onClick={connectManual} disabled={busy === 'manual' || !manualToken} className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm disabled:opacity-50">Connect</button>
            </div>
          </div>
        ) : (
          <div id="listings" className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase">
                <tr><th className="px-4 py-3 text-left">Item</th><th className="px-4 py-3 text-right">Current</th><th className="px-4 py-3 text-right">Comp low</th><th className="px-4 py-3 text-right">Floor</th><th className="px-4 py-3 text-right">Ceiling</th><th className="px-4 py-3 text-right">Undercut</th><th className="px-4 py-3 text-center">AI</th><th className="px-4 py-3 text-center">On</th></tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={8} className="py-16 text-center text-gray-400">Loading…</td></tr>
                  : listings.length === 0 ? <tr><td colSpan={8} className="py-12 text-center text-gray-400">No listings imported yet.</td></tr>
                  : listings.map(l => (
                    <tr key={l.id} className="border-b border-gray-100">
                      <td className="px-4 py-3"><div className="font-medium leading-tight">{l.title}</div><div className="text-xs text-gray-400">#{l.ebay_item_id}</div></td>
                      <td className="px-4 py-3 text-right font-semibold">{money(l.current_price)}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{money(l.last_competitor_low)}</td>
                      <td className="px-4 py-3 text-right"><Num v={l.floor_price} onSave={v => saveRule(l.id, { floor_price: v })} /></td>
                      <td className="px-4 py-3 text-right"><Num v={l.ceiling_price} onSave={v => saveRule(l.id, { ceiling_price: v })} /></td>
                      <td className="px-4 py-3 text-right"><Num v={l.undercut_value} onSave={v => saveRule(l.id, { undercut_value: v })} /></td>
                      <td className="px-4 py-3 text-center"><input type="checkbox" checked={l.ai_enabled} onChange={e => saveRule(l.id, { ai_enabled: e.target.checked })} /></td>
                      <td className="px-4 py-3 text-center"><input type="checkbox" checked={l.repricing_enabled} onChange={e => saveRule(l.id, { repricing_enabled: e.target.checked })} /></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {changes.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm font-semibold mb-3">Recent price changes</p>
            {changes.map((c, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-gray-50 py-1">
                <span>{money(c.old_price)} → <b>{money(c.new_price)}</b> <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">{c.source}</span></span>
                <span className="text-xs text-gray-400">{c.reason}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function Num({ v, onSave }: { v: number | null; onSave: (v: number) => void }) {
  const [val, setVal] = useState<number | ''>(v ?? '')
  useEffect(() => { setVal(v ?? '') }, [v])
  return <input type="number" value={val} onChange={e => setVal(e.target.value === '' ? '' : Number(e.target.value))}
    onBlur={() => { if (val !== '' && Number(val) !== v) onSave(Number(val)) }}
    className="w-24 border border-gray-200 rounded px-2 py-1 text-right text-sm" placeholder="—" />
}
