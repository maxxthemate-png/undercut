import LegalPage from '../_components/LegalPage'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'Terms of Service — Undercut',
  'The terms that govern your use of Undercut: trials, billing, plan limits, your responsibility for price floors, and our service guarantees in plain English.',
  '/terms'
)

export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="June 10, 2026">
      <h2>The service</h2>
      <p>
        Undercut automatically reprices your eBay listings according to rules you configure — beating
        the lowest competitor while never going below the per-item floor you set.
      </p>

      <h2>Eligibility and accounts</h2>
      <p>
        You must be 18 or older, have a valid eBay seller account, keep your credentials secure, and
        provide accurate information. You are responsible for activity under your account.
      </p>

      <h2>Trials, plans and billing</h2>
      <ul>
        <li>Every new account starts with a <b>14-day Founding trial</b> — full Starter features, no credit card required.</li>
        <li>When the trial ends you move to the <b>Free plan (25 listings)</b> automatically. Nothing is charged unless you upgrade.</li>
        <li>Paid plans are billed monthly or annually via Stripe. Annual plans include roughly two months free.</li>
        <li>You can cancel anytime via the billing portal; access continues to the end of the paid period. See the <a href="/refund-policy">refund policy</a>.</li>
        <li>Plan limits determine how many listings Undercut manages for you.</li>
      </ul>

      <h2>Price floors are yours</h2>
      <p>
        Undercut will never reprice a listing below the floor you set. However, <b>you set the
        floors</b> — you are solely responsible for setting floors that cover your costs, fees, and
        desired margin, and for ensuring your listings comply with eBay policy.
      </p>

      <h2>No guarantees</h2>
      <p>
        We do not guarantee sales, search placement, or profits. Competitor data comes from eBay&apos;s
        APIs and can lag or be incomplete.
      </p>

      <h2>Acceptable use</h2>
      <p>
        No reverse engineering, scraping, reselling access, abusing rate limits, or any use that
        violates eBay&apos;s API terms or applicable law.
      </p>

      <h2>Third-party services</h2>
      <p>
        eBay, Stripe, and our other processors have their own terms. <b>Undercut is not affiliated
        with or endorsed by eBay Inc.</b> &ldquo;eBay&rdquo; is a trademark of eBay Inc.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The service is provided &ldquo;as is.&rdquo; To the maximum extent permitted by law, our aggregate
        liability is capped at the fees you paid us in the 12 months before the claim, and we are not
        liable for indirect or consequential damages (including lost profits or lost sales).
      </p>

      <h2>Termination</h2>
      <p>
        You can close your account anytime. We may suspend accounts that violate these terms, with
        notice where practicable.
      </p>

      <h2>Changes and governing law</h2>
      <p>
        We may update these terms; material changes will be announced by email. These terms are
        governed by the laws of the State of California, USA.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </p>
    </LegalPage>
  )
}
