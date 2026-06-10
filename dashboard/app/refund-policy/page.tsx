import LegalPage from '../_components/LegalPage'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'Refund Policy — Undercut',
  'Undercut refund policy: try everything free for 14 days first, cancel monthly plans anytime, and get a full refund on annual plans within 30 days.',
  '/refund-policy'
)

export default function Page() {
  return (
    <LegalPage title="Refund Policy" updated="June 10, 2026">
      <h2>Try before you pay</h2>
      <p>
        Every account starts with a 14-day trial with no credit card, and the Free plan exists after
        that — so you can fully evaluate Undercut before spending anything.
      </p>

      <h2>Monthly plans</h2>
      <p>
        Cancel anytime from the billing portal. Your access continues to the end of the current paid
        month; we don&apos;t prorate partial months.
      </p>

      <h2>Annual plans</h2>
      <p>
        Full refund within <b>30 days</b> of your first annual purchase, no questions asked. After 30
        days, you can cancel renewal and keep access for the remainder of the year.
      </p>

      <h2>Billing errors</h2>
      <p>Duplicate charges or billing mistakes are always refunded in full.</p>

      <h2>How to request</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from your account email. Refunds
        are processed through Stripe and typically arrive within 5–10 business days.
      </p>
    </LegalPage>
  )
}
