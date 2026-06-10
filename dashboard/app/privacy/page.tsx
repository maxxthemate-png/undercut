import LegalPage from '../_components/LegalPage'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'Privacy Policy — Undercut',
  'How Undercut collects, uses, and protects your data: what we store, who processes it, and your rights. Plain-English privacy policy for the eBay repricer.',
  '/privacy'
)

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="June 10, 2026">
      <h2>Who we are</h2>
      <p>
        Undercut (undercut-nu.vercel.app) is an automated eBay repricing service operated by a solo
        founder. Questions about this policy: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><b>Account:</b> your email address and password. Passwords are stored only as a salted PBKDF2-SHA256 hash — never in plaintext.</li>
        <li><b>Store connection:</b> the eBay OAuth tokens you authorize. They are <b>encrypted at rest</b> (Fernet/AES) and used only to read your listings, check competitor prices, and apply the price updates you enable.</li>
        <li><b>Listing and pricing data:</b> eBay item IDs, titles, current prices, the floors/ceilings you set, competitor low prices, and a log of every price change we make.</li>
        <li><b>Billing:</b> handled entirely by Stripe. We never see or store card numbers — only your Stripe customer ID and current plan.</li>
        <li><b>Early-access list:</b> if you join it, your email and a first-touch source tag (e.g. which page or campaign you came from).</li>
        <li><b>Server logs:</b> basic request logs for security and debugging.</li>
      </ul>

      <h2>How we use it</h2>
      <p>
        To run repricing on your behalf, send transactional and lifecycle email (welcome, trial
        reminders, account notices), provide support, and prevent abuse.
        <b> AI disclosure:</b> listing and pricing data (titles, prices, competitor prices — never your
        credentials) may be processed by Anthropic&apos;s Claude models to tune repricing aggressiveness on
        plans with AI features.
      </p>

      <h2>Processors we rely on</h2>
      <ul>
        <li><b>Stripe</b> — payments and subscriptions</li>
        <li><b>SendGrid</b> — email delivery</li>
        <li><b>Render</b> — API and database hosting</li>
        <li><b>Vercel</b> — website hosting</li>
        <li><b>Anthropic</b> — AI pricing advisor</li>
        <li><b>eBay</b> — the marketplace APIs you authorize</li>
      </ul>

      <h2>What we never do</h2>
      <ul>
        <li>Sell or rent your data.</li>
        <li>Share your data for advertising.</li>
        <li>Post, message, or change anything on your eBay account beyond the price updates you explicitly enable.</li>
      </ul>

      <h2>Retention and deletion</h2>
      <p>
        We keep your data while your account is active. Email us to delete your account and all
        associated data. Disconnecting your store revokes our eBay access; you can also revoke it any
        time from your eBay account settings.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        We store a login token and your first-touch source in your browser&apos;s localStorage. We do not
        use third-party advertising trackers.
      </p>

      <h2>Security</h2>
      <p>
        TLS everywhere, OAuth tokens encrypted at rest, passwords hashed, and every API request scoped
        to your own account&apos;s data.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access, correction, export, or deletion of your data at any time by emailing{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2>Children</h2>
      <p>Undercut is for business use by adults 18 and over.</p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially we&apos;ll update this page and the date above, and notify active
        customers by email.
      </p>
    </LegalPage>
  )
}
