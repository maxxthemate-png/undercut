import './globals.css'

export const metadata = {
  title: 'Undercut — automated eBay repricing',
  description:
    'Undercut automatically reprices your eBay listings to beat the lowest competitor — with a hard floor so you never sell below your minimum.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
