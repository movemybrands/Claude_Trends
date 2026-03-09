import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090f',
        surface: '#0d1117',
        'surface-alt': '#0a0e16',
        border: '#1e2530',
        accent: '#4a9eff',
        green: '#34d058',
        yellow: '#f0b429',
        red: '#f85149',
        'text-primary': '#e2e8f0',
        'text-secondary': '#8b96a8',
        'text-muted': '#4a5568',
      },
      fontFamily: {
        mono: ['DM Mono', 'Courier New', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
