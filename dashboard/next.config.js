/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Vercel builds → production API; local dev → localhost. Override with the API_URL env var anytime.
    API_URL: process.env.API_URL || (process.env.VERCEL ? 'https://undercut-api.onrender.com' : 'http://localhost:8000'),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },            // login/dashboard not frameable (clickjacking)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
