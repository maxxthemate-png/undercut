// Lightweight analytics: Google Ads / gtag events.
// Deployed DARK — no-op until NEXT_PUBLIC_GADS_ID is set in Vercel env (the owner
// pastes the Ads conversion ID + labels when the campaign goes live). Safe to call
// anywhere; never throws, never blocks.

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

/** Fire a generic analytics event (e.g. demo_use). No-op if gtag isn't loaded. */
export function track(event: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event, params)
  } catch {
    /* analytics must never break the app */
  }
}

/**
 * Fire a Google Ads conversion. `label` is the conversion action's label from the
 * Ads account (owner provides it via NEXT_PUBLIC_GADS_*_LABEL). No-op if the Ads
 * tag isn't configured yet.
 */
export function trackConversion(label?: string, params: Record<string, any> = {}): void {
  const id = process.env.NEXT_PUBLIC_GADS_ID
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !id || !label) return
  try {
    window.gtag('event', 'conversion', { send_to: `${id}/${label}`, ...params })
  } catch {
    /* analytics must never break the app */
  }
}

export {}
