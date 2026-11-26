/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
