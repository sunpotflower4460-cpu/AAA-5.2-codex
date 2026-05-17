/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        washi: 'var(--color-washi)',
        paper: 'var(--color-paper)',
        sumi: 'var(--color-sumi)',
        'ink-muted': 'var(--color-ink-muted)',
        gold: 'var(--color-gold)',
        indigo: 'var(--color-indigo)',
        vermilion: 'var(--color-vermilion)',
        line: 'var(--color-line)',
        shadow: 'var(--color-shadow)',
      },
      fontFamily: {
        serif: [
          '"Hiragino Mincho ProN"',
          '"Yu Mincho"',
          '"Noto Serif JP"',
          '"Noto Serif"',
          'serif',
        ],
        sans: ['"Hiragino Sans"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 50px var(--color-shadow)',
      },
      maxWidth: {
        content: '720px',
      },
    },
  },
  plugins: [],
}
