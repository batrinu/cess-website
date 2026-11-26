/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/*.{ts,tsx}',
    './src/components/*.{ts,tsx}',
    './src/components/site/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "rgb(var(--color-alabaster) / <alpha-value>)",
        vellum: "rgb(var(--color-vellum) / <alpha-value>)",
        stone: "rgb(var(--color-stone) / <alpha-value>)",
        rule: "rgb(var(--color-rule) / <alpha-value>)",
        "border-ui": "rgb(var(--color-border-ui) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--color-ink-muted) / <alpha-value>)",
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        "navy-elevated": "rgb(var(--color-navy-elevated) / <alpha-value>)",
        "navy-deep": "rgb(var(--color-navy-deep) / <alpha-value>)",
        "rule-dark": "rgb(var(--color-rule-dark) / <alpha-value>)",
        "on-dark": "rgb(var(--color-on-dark) / <alpha-value>)",
        "on-dark-muted": "rgb(var(--color-on-dark-muted) / <alpha-value>)",
        copper: "rgb(var(--color-copper) / <alpha-value>)",
        "copper-light": "rgb(var(--color-copper-light) / <alpha-value>)",
        "copper-ink": "rgb(var(--color-copper-ink) / <alpha-value>)",
        "success-ink": "rgb(var(--color-success-ink) / <alpha-value>)",
        "success-dark": "rgb(var(--color-success-dark) / <alpha-value>)",
        "error-ink": "rgb(var(--color-error-ink) / <alpha-value>)",
        "error-dark": "rgb(var(--color-error-dark) / <alpha-value>)",
        "wa-bg": "rgb(var(--color-wa-bg) / <alpha-value>)",
        "wa-ink": "rgb(var(--color-wa-ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Source Serif 4"', '"Source Serif 4 Fallback"', 'Georgia', 'serif'],
        body: ['Inter', '"Inter Fallback"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
