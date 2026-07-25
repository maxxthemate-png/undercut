'use client'
import { useState, useEffect } from 'react'
import { api } from './lib/api'
import { track, trackConversion } from './lib/track'

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

export default function LeadForm({ source = 'landing', cta, note }: { source?: string; cta?: string; note?: string }) {
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
      const payload: Record<string, string> = { email, source: resolveSource(source) }
      if (note) payload.note = note.slice(0, 300)
      const r = await api('/api/leads', { method: 'POST', body: JSON.stringify(payload) })
      if (r.ok) {
        setDone(true)
        track('lead_submit', { source: resolveSource(source) })
        trackConversion(process.env.NEXT_PUBLIC_GADS_LEAD_LABEL)
      } else if (r.status === 429) {
        setErr('That was a lot of tries at once — wait a minute and resend.')
      } else {
        setErr('That did not go through. Email hello@undercutpricer.com and we will add you manually.')
      }
    } catch {
      setErr('That did not go through. Email hello@undercutpricer.com and we will add you manually.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return <p className="text-floor font-medium">✅ Sent — check your inbox. Reply to it any time; a real person reads every reply.</p>
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Error must render on EVERY breakpoint: it was previously sm:hidden, so a
          failed submit on desktop showed nothing at all and the visitor left. */}
      {err && <p className="text-sm text-cut mb-2">{err}</p>}
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          placeholder="you@yourstore.com"
          className="flex-1 rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" />
        <button disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50 whitespace-nowrap">
          {busy ? 'Sending…' : (cta || 'Email me the guide')}
        </button>
      </form>
    </div>
  )
}
