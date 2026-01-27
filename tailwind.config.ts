import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Swiss/Print typography
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        // Newspaper-inspired palette
        paper: '#F7F5F0',
        ink: '#1A1A1A',
        accent: '#C41E3A', // Classic newspaper red
        muted: '#6B6B6B',
        border: '#D4D4D4',
      },
      fontSize: {
        // Swiss design type scale
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'headline': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'title': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'micro': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      spacing: {
        'grid': '1.5rem',
        'section': '4rem',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
    },
  },
  plugins: [],
};

export default config;
