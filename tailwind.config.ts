import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#030303',
        'space-soft': '#0A0A0A',
        lunar: '#F2F2EA',
        dust: '#8A8A84',
        'hud-line': '#2A2A2A',
        signal: '#FF3B30',
        ice: '#8FB8FF',
        neon: '#C6FF3E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        hud: '0 0 0 1px rgba(242, 242, 234, 0.12), 0 24px 64px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        grid: [
          'linear-gradient(to right, rgba(242, 242, 234, 0.06) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(242, 242, 234, 0.06) 1px, transparent 1px)',
        ].join(', '),
      },
    },
  },
  plugins: [],
} satisfies Config
