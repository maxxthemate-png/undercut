import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Undercut — automated eBay repricing with a hard price floor'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #19191B 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: '#EE2B1C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            ↓
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 800 }}>
            <span>under</span>
            <span style={{ color: '#EE2B1C' }}>cut</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.15, display: 'flex' }}>
            Beat the lowest competitor.
          </div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.15, color: '#94a3b8', display: 'flex' }}>
            Never below your floor.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {['Hard price floor', '14-day trial, no card', 'Automated eBay repricing'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '12px 24px',
                borderRadius: 999,
                border: '2px solid #334155',
                color: '#cbd5e1',
                fontSize: 26,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
