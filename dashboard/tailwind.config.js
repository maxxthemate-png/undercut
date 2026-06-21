/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        cut: 'var(--cut)',
        'cut-strong': 'var(--cut-strong)',
        floor: 'var(--floor)',
        guard: 'var(--guard)',
        line: 'var(--line)',
        wash: 'var(--wash)',
        'cut-tint': 'var(--cut-tint)',
        'floor-tint': 'var(--floor-tint)',
        'guard-tint': 'var(--guard-tint)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
      },
      transitionTimingFunction: { brand: 'var(--ease)' },
      maxWidth: { prose: '65ch' },
      screens: { wide: '1440px' },
    },
  },
  plugins: [],
}
