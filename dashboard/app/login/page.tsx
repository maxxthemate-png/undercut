'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pw }) })
      const d = await res.json().catch(() => ({}))
      if (res.ok) { tok.set(d.token); router.push('/dashboard') }
      else setErr(d.detail || 'Login failed')
    } catch {
      // fetch itself threw (offline / API cold-start): without this the button
      // sticks on "Logging in…" forever with no message.
      setErr('Could not reach the server — please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-ink">Log in to Undercut</h1>
        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="password" placeholder="Password"
               value={pw} onChange={e => setPw(e.target.value)} required />
        <p className="text-right -mt-2"><Link href="/forgot-password" className="text-xs text-cut hover:opacity-90">Forgot password?</Link></p>
        {err && <p className="text-sm text-cut">{err}</p>}
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 w-full rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50">
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        <p className="text-xs text-muted text-center">No account? <Link href="/signup" className="text-cut">Sign up</Link></p>
      </form>
    </div>
  )
}
