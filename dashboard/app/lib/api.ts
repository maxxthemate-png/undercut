'use client'
export const API_BASE = process.env.API_URL || 'http://localhost:8000'

export const tok = {
  get: () => (typeof window !== 'undefined' ? localStorage.getItem('undercut_token') : null),
  set: (t: string) => localStorage.setItem('undercut_token', t),
  clear: () => localStorage.removeItem('undercut_token'),
}

export async function api(path: string, opts: RequestInit = {}) {
  const t = tok.get()
  return fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
      ...(opts.headers || {}),
    },
  })
}
