import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors - customize per product
        brand: {
          25: 'var(--color-brand-25)',
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        // Semantic colors
        fg: {
          primary: 'var(--color-fg-primary)',
          secondary: 'var(--color-fg-secondary)',
          tertiary: 'var(--color-fg-tertiary)',
          quaternary: 'var(--color-fg-quaternary)',
          disabled: 'var(--color-fg-disabled)',
          brand: {
            primary: 'var(--color-fg-brand-primary)',
            secondary: 'var(--color-fg-brand-secondary)',
          },
          error: {
            primary: 'var(--color-fg-error-primary)',
            secondary: 'var(--color-fg-error-secondary)',
          },
          success: {
            primary: 'var(--color-fg-success-primary)',
            secondary: 'var(--color-fg-success-secondary)',
          },
          warning: {
            primary: 'var(--color-fg-warning-primary)',
            secondary: 'var(--color-fg-warning-secondary)',
          },
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          quaternary: 'var(--color-bg-quaternary)',
          disabled: 'var(--color-bg-disabled)',
          brand: {
            primary: 'var(--color-bg-brand-primary)',
            secondary: 'var(--color-bg-brand-secondary)',
            solid: 'var(--color-bg-brand-solid)',
          },
          error: {
            primary: 'var(--color-bg-error-primary)',
            secondary: 'var(--color-bg-error-secondary)',
          },
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          tertiary: 'var(--color-border-tertiary)',
          brand: 'var(--color-border-brand)',
          error: 'var(--color-border-error)',
          disabled: 'var(--color-border-disabled)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        '3xl': 'var(--shadow-3xl)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
    },
  },
  plugins: [],
}

export default config
