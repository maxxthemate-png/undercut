import './globals.css'

export const metadata = {
  title: 'Undercut — automated eBay repricing',
  description:
    'Undercut automatically reprices your eBay listings to beat the lowest competitor — with a hard floor so you never sell below your minimum.',
  verification: { google: 'zD2b6hZVML47szgBwkOGmg4lKCngzVA4ZGW6p6XGKj8' },
}

const APP_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Undercut',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://undercut-nu.vercel.app',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  )
}
