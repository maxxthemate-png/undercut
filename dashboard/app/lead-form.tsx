'use client'
import { useState, useEffect } from 'react'
import { api } from './lib/api'

// First-touch acquisition source: capture utm_source / ref / source from the
// landing URL once, persist it, and tag the lead — so /admin's leads-by-source
// chart reflects real channels instead of a hardcoded "landing".
function sanitize(s: string): string {
  return s.slice(0, 64).replace(/[^\w.-]/g, '_')
}
function resolveSource(fallback: string): string {
  if (typeof window === 'undefined') return fallback
  try {
    const p = new URLSearchParams(window.location.search)
    const fromUrl = p.get('utm_source') || p.get('ref') || p.get('source')
    const stored = localStorage.getItem('undercut_src')
    const val = fromUrl || stored || fallback
    return val ? sanitize(val) : fallback
  } catch {
    return fallback
  }
}

export default function LeadForm({ source = 'landing' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  // Persist first-touch source so it survives navigation to the form.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const p = new URLSearchParams(window.location.search)
      const s = p.get('utm_source') || p.get('ref') || p.get('source')
      if (s && !localStorage.getItem('undercut_src')) {
        localStorage.setItem('undercut_src', sanitize(s))
      }
    } catch {
      /* ignore */
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(''); setBusy(true)
    try {
      const r = await api('/api/leads', { method: 'POST', body: JSON.stringify({ email, source: resolveSource(source) }) })
      if (r.ok) setDone(true)
      else setErr('Something went wrong — try again.')
    } catch {
      setErr('Something went wrong — try again.')
    }
    setBusy(false)
  }

  if (done) {
    return <p className="text-floor font-medium">✅ You're on the list — we'll email you early access + founding pricing.</p>
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="you@yourstore.com"
        className="flex-1 rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" />
      <button disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50 whitespace-nowrap">
        {busy ? 'Adding…' : 'Get early access'}
      </button>
      {err && <span className="text-sm text-cut sm:hidden">{err}</span>}
    </form>
  )
}
