'use client'
/** Founder metrics dashboard — internal business overview.
 *  Live data from /api/admin/metrics, gated by the admin key (UNDERCUT_API_KEY). */
import { useEffect, useState } from 'react'
import { API_BASE } from '../lib/api'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const KEY_STORE = 'undercut_admin_key'
const BLUE = '#2563eb'
const PLAN_COLORS: Record<string, string> = {
  free: '#cbd5e1', trial: '#93c5fd', starter: '#60a5fa', pro: '#2563eb', scale: '#1e3a8a',
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 bg-white">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-extrabold mt-1 text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 bg-white">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  )
}

export default function Admin() {
  const [key, setKey] = useState('')
  const [input, setInput] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function load(k: string) {
    setLoading(true); setErr('')
    try {
      const r = await fetch(`${API_BASE}/api/admin/metrics`, { headers: { 'X-Admin-Key': k } })
      if (r.status === 403) { setErr('Invalid admin key.'); setData(null); localStorage.removeItem(KEY_STORE); setKey(''); return }
      if (!r.ok) { setErr(`Error ${r.status}`); return }
      setData(await r.json())
    } catch (e: any) { setErr(e?.message || 'Network error') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    const k = typeof window !== 'undefined' ? localStorage.getItem(KEY_STORE) : null
    if (k) { setKey(k); load(k) }
  }, [])

  function unlock() {
    if (!input.trim()) return
    localStorage.setItem(KEY_STORE, input.trim()); setKey(input.trim()); load(input.trim())
  }
  function lock() { localStorage.removeItem(KEY_STORE); setKey(''); setData(null) }

  // ---- Key gate ----
  if (!key) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6">
          <h1 className="text-lg font-bold">Undercut — Founder Metrics</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the admin key to view.</p>
          <input type="password" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && unlock()}
            placeholder="Admin key" className="mt-4 w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
          {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
          <button onClick={unlock} className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Unlock</button>
        </div>
      </div>
    )
  }

  const u = data?.users || { total: 0, by_plan: {}, active_trials: 0 }
  const planData = Object.keys(u.by_plan || {})
    .sort((a, b) => ['free', 'trial', 'starter', 'pro', 'scale'].indexOf(a) - ['free', 'trial', 'starter', 'pro', 'scale'].indexOf(b))
    .map(p => ({ plan: p, count: u.by_plan[p] }))
  const series = data?.reprices?.series || []
  const f = data?.funnel || {}
  const srcFunnel: any[] = data?.source_funnel || []
  const pct = (r: number | undefined) => `${Math.round((r || 0) * 1000) / 10}%`

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Undercut — Founder Metrics</h1>
            {data && <p className="text-xs text-gray-400">updated {new Date(data.generated_at).toLocaleString()}</p>}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => load(key)} disabled={loading} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50">{loading ? 'Refreshing…' : '↻ Refresh'}</button>
            <button onClick={lock} className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">Lock</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {err && <div className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">{err}</div>}
        {!data && !err && <p className="text-gray-500">Loading…</p>}

        {data && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Kpi label="MRR" value={`$${(data.mrr || 0).toLocaleString()}`} sub="paid plans" />
              <Kpi label="Users" value={String(u.total)} sub={`${u.active_trials} on trial`} />
              <Kpi label="Active trials" value={String(u.active_trials)} />
              <Kpi label="Leads" value={String(data.leads?.total ?? 0)} sub={`+${data.leads?.last_7d ?? 0} / 7d`} />
              <Kpi label="Stores" value={String(data.stores ?? 0)} />
              <Kpi label="Reprices" value={String(data.reprices?.total ?? 0)} sub={`+${data.reprices?.last_7d ?? 0} / 7d`} />
            </div>

            {/* Conversion funnel — the campaign read (signup → trial → paid).
                Demo-use lives in Google Ads, not here (the demo is anonymous). */}
            <Panel title="Conversion funnel">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">{f.leads ?? 0}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Leads</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">{f.signups ?? 0}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Signups <span className="text-gray-400">· {f.leads ? pct(f.lead_to_signup_rate) : '—'} of leads</span></p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">{f.active_trials ?? 0}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Active trials</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-blue-600">{f.paid ?? 0}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Paid <span className="text-gray-400">· {((f.paid || 0) + (f.active_trials || 0) + (f.expired_trials || 0)) ? pct(f.trial_to_paid_rate) : '—'} trial→paid</span></p>
                </div>
              </div>
            </Panel>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Panel title="Reprices — last 14 days">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BLUE} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="reprices" stroke={BLUE} fill="url(#g)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Users by plan">
                {planData.length === 0 ? <p className="text-sm text-gray-400">No users yet.</p> : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={planData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="plan" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {planData.map(d => <Cell key={d.plan} fill={PLAN_COLORS[d.plan] || BLUE} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Panel>
            </div>

            {/* Lead sources + recent activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Panel title="Funnel by source">
                {srcFunnel.length === 0 ? <p className="text-sm text-gray-400">No leads yet.</p> : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 text-left">
                        <th className="font-medium pb-1">Source</th>
                        <th className="font-medium pb-1 text-right">Leads</th>
                        <th className="font-medium pb-1 text-right">Signups</th>
                        <th className="font-medium pb-1 text-right">Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {srcFunnel.map((s: any) => (
                        <tr key={s.source} className="border-t border-gray-100">
                          <td className="py-1.5 text-gray-600">{s.source}</td>
                          <td className="py-1.5 text-right font-semibold">{s.leads}</td>
                          <td className="py-1.5 text-right text-gray-700">{s.signups}</td>
                          <td className="py-1.5 text-right text-blue-600 font-semibold">{s.paid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Panel>

              <Panel title="Recent signups">
                {(!data.recent_signups || data.recent_signups.length === 0) ? <p className="text-sm text-gray-400">None yet.</p> : (
                  <ul className="space-y-2">
                    {data.recent_signups.map((r: any, i: number) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{r.email}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{r.plan}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>

              <Panel title="Recent leads">
                {(!data.recent_leads || data.recent_leads.length === 0) ? <p className="text-sm text-gray-400">None yet.</p> : (
                  <ul className="space-y-2">
                    {data.recent_leads.map((r: any, i: number) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{r.email}</span>
                        <span className="text-xs text-gray-400">{r.source}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>

            <p className="text-xs text-gray-400 text-center pt-2">Live data · {API_BASE.replace('https://', '')}</p>
          </>
        )}
      </main>
    </div>
  )
}
