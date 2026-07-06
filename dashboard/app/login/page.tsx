'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [exchanging, setExchanging] = useState(false)

  // If the user arrived from a magic-login email (…/login?token=…), exchange it
  // for a session immediately and drop them on the dashboard.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const t = new URLSearchParams(window.location.search).get('token')
    if (!t) return
    setExchanging(true)
    ;(async () => {
      try {
        const res = await api('/api/auth/login-with-token', { method: 'POST', body: JSON.stringify({ token: t }) })
        const d = await res.json().catch(() => ({}))
        if (res.ok && d.token) { tok.set(d.token); router.push('/dashboard'); return }
        setErr(d.detail || 'This sign-in link is invalid or expired. Request a new one below.')
      } catch {
        setErr('Could not reach the server — please try again.')
      } finally {
        setExchanging(false)
      }
    })()
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      // Always returns ok (no account enumeration); the email only arrives if the
      // account exists.
      await api('/api/auth/request-login-link', { method: 'POST', body: JSON.stringify({ email }) })
      setSent(true)
    } catch {
      setErr('Could not reach the server — please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-ink">Sign in to Undercut</h1>

        {exchanging ? (
          <p className="text-sm text-muted">Signing you in…</p>
        ) : sent ? (
          <>
            <p className="text-sm text-ink bg-cut-tint border border-cut rounded p-3">
              Check your email — we sent a one-click sign-in link to <b>{email}</b>. It works for 30 minutes.
            </p>
            <button onClick={() => { setSent(false); setErr('') }} className="text-xs text-cut hover:opacity-90">Use a different email</button>
          </>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm text-muted">No password needed — enter your email and we’ll send you a secure sign-in link.</p>
            <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="email" placeholder="Email"
                   value={email} onChange={e => setEmail(e.target.value)} required />
            {err && <p className="text-sm text-cut">{err}</p>}
            <button disabled={busy} className="inline-flex items-center justify-center gap-2 w-full rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50">
              {busy ? 'Sending…' : 'Email me a sign-in link'}
            </button>
            <p className="text-xs text-muted text-center">New here? <Link href="/signup" className="text-cut">Start free</Link></p>
          </form>
        )}

        {exchanging && err && <p className="text-sm text-cut">{err}</p>}
      </div>
    </div>
  )
}
