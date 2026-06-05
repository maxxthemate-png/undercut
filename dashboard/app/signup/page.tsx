'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    const res = await api('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password: pw }) })
    const d = await res.json().catch(() => ({}))
    setBusy(false)
    if (res.ok) { tok.set(d.token); router.push('/dashboard') }
    else setErr(d.detail || 'Signup failed')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Start undercutting</h1>
          <p className="text-sm text-gray-500">Free plan — up to 25 listings.</p>
        </div>
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="password" placeholder="Password (8+ chars)"
               value={pw} onChange={e => setPw(e.target.value)} required minLength={8} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
          {busy ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-xs text-gray-500 text-center">Already have an account? <Link href="/login" className="text-blue-600">Log in</Link></p>
      </form>
    </div>
  )
}
