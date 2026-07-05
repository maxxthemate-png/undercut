import './globals.css'
import { Space_Grotesk, Hanken_Grotesk, Space_Mono } from 'next/font/google'

// Display: distinctive grotesque with ticker-like digits. Body: warm, readable,
// not Inter/Geist. Mono: prices/floors/margins render here — the precision signature.
const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-display', display: 'swap' })
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap' })

export const metadata = {
  metadataBase: new URL('https://undercutpricer.com'),
  title: 'Undercut — automated eBay repricing',
  description:
    'Undercut automatically reprices your eBay listings to beat the lowest competitor — with a hard floor so you never sell below your minimum.',
  verification: { google: 'zD2b6hZVML47szgBwkOGmg4lKCngzVA4ZGW6p6XGKj8' },
  openGraph: {
    siteName: 'Undercut',
    type: 'website',
    url: '/',
    title: 'Undercut — automated eBay repricing',
    description:
      'Beat the lowest competitor automatically — never below the per-item floor you set. Free to start, no card.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undercut — automated eBay repricing',
    description:
      'Beat the lowest competitor automatically — never below the per-item floor you set.',
  },
}

const APP_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Undercut',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://undercutpricer.com',
  description:
    'Automated eBay repricer: beats the lowest competitor automatically with a per-item hard price floor so you never sell below your minimum.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '199',
    priceCurrency: 'USD',
    offerCount: 4,
  },
}

// Google Ads / gtag tag — only emitted when NEXT_PUBLIC_GADS_ID is set in Vercel
// env. Until then the site ships with NO tag (deployed dark). Owner pastes the Ads
// conversion ID when the paid-search campaign goes live; see Docs/GOOGLE_ADS_UNDERCUT.md.
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {GADS_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GADS_ID}');`,
              }}
            />
          </>
        ) : null}
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  )
}
