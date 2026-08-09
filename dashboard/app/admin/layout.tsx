// /admin was the only private route with no robots metadata: it relied purely
// on the robots.txt Disallow, and since the root layout gained a homepage
// canonical it was also inheriting canonical "/". Mirrors app/dashboard/layout.tsx.
export const metadata = {
  title: 'Undercut Admin',
  robots: { index: false },
  alternates: { canonical: '/admin' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
