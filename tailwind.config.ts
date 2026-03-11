import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-mid': 'var(--primary-mid)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        cream: 'var(--cream)',
        'cream-warm': 'var(--cream-warm)',
        white: 'var(--white)',
        text: 'var(--text)',
        'text-mid': 'var(--text-mid)',
        'text-muted': 'var(--text-muted)',
        'text-light': 'var(--text-light)',
        border: 'var(--border)',
        'border-warm': 'var(--border-warm)',
        success: 'var(--success)',
      },
    },
  },
  plugins: [],
};

export default config;
