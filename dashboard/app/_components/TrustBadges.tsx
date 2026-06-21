// Compact trust strip — factual badges only (no founder note, no stats fetch).
// Dropped in right before the final CTA on ad-destination landing pages, where a
// cold visitor is deciding whether to connect their whole eBay store. Pulls the
// shared TRUST_BADGES so it can't drift from the home page's TrustSection.
import { TRUST_BADGES } from '../_content/shared'

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2 text-xs text-muted">
      {TRUST_BADGES.map((t) => (
        <span key={t} className="px-3 py-1.5 rounded-full border border-line bg-surface">{t}</span>
      ))}
    </div>
  )
}
