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
    const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pw }) })
    const d = await res.json().catch(() => ({}))
    setBusy(false)
    if (res.ok) { tok.set(d.token); router.push('/dashboard') }
    else setErr(d.detail || 'Login failed')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Log in to Undercut</h1>
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="password" placeholder="Password"
               value={pw} onChange={e => setPw(e.target.value)} required />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        <p className="text-xs text-gray-500 text-center">No account? <Link href="/signup" className="text-blue-600">Sign up</Link></p>
      </form>
    </div>
  )
}
