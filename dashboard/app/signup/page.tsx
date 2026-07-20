'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'
import { track, trackConversion } from '../lib/track'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  // If they arrived from the instant demo, greet them with what they just checked.
  const [demo, setDemo] = useState<{ q: string; win?: string; floor?: string } | null>(null)
  const [ref, setRef] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sp = new URLSearchParams(window.location.search)
    const q = (sp.get('q') || '').trim()
    if (sp.get('from') === 'demo' && q) {
      setDemo({ q, win: sp.get('win') || undefined, floor: sp.get('floor') || undefined })
    }
    const r = (sp.get('ref') || '').trim()
    if (r) setRef(r)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setNotice(''); setBusy(true)
    try {
      const res = await api('/api/auth/signup', { method: 'POST', body: JSON.stringify(ref ? { email, ref } : { email }) })
      const d = await res.json().catch(() => ({}))
      if (res.ok && d.token) {
        tok.set(d.token)
        // Fire the Ads conversion + a generic sign_up event (both no-op until the
        // Ads tag is configured). This is the trial-start the paid campaign optimizes for.
        track('sign_up', { method: 'email' })
        trackConversion(process.env.NEXT_PUBLIC_GADS_SIGNUP_LABEL)
        router.push('/dashboard')
      } else if (res.ok && d.check_email) {
        // Email already has an account — we don't hand out access without proof of
        // ownership, so a sign-in link was emailed instead.
        setNotice('You already have an account — we just emailed you a sign-in link. Check your inbox.')
      } else setErr(d.detail || 'Signup failed')
    } catch {
      // fetch threw (offline / cold-start): don't leave the button stuck on
      // "Creating…" with no message — this is the paid-traffic landing action.
      setErr('Could not reach the server — please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-4">
        {demo && (
          <div className="rounded-lg border border-cut bg-cut-tint p-4">
            <p className="text-sm font-semibold text-cut">You checked “{demo.q.length > 48 ? demo.q.slice(0, 48) + '…' : demo.q}”.</p>
            <p className="text-sm text-cut mt-1">
              {demo.win
                ? <>Undercut would win that sale at <b><span className="tabular">${demo.win}</span></b>{demo.floor ? <> — above your <b><span className="tabular">${demo.floor}</span></b> floor</> : null}. </>
                : null}
              Create your account to do this across your <b>whole store</b>, automatically — floor-protected, no card.
            </p>
          </div>
        )}
        {ref && (
          <p className="text-sm text-ink bg-cut-tint border border-cut rounded p-3">
            You were invited by another seller — when you upgrade to a paid plan, <b>you both get a free month</b>.
          </p>
        )}
        <div>
          <h1 className="text-xl font-bold text-ink">Start your Founding trial</h1>
          <p className="text-sm text-muted">14 days of Starter features (100 listings) free — no credit card, no password.</p>
        </div>
        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} required />
        {err && <p className="text-sm text-cut">{err}</p>}
        {notice && <p className="text-sm text-ink bg-cut-tint border border-cut rounded p-3">{notice}</p>}
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 w-full rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50">
          {busy ? 'Creating…' : 'Start free — no card'}
        </button>
        <p className="text-xs text-muted text-center">Already have an account? <Link href="/login" className="text-cut">Sign in</Link></p>
      </form>
    </div>
  )
}
