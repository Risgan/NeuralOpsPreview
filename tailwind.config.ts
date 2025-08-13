import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#071739",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4A6382",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#A68768",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#CDD4DA",
          foreground: "#071739",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#071739",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#071739",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        neuralops: {
          "dark-blue": "#071739",
          "medium-blue": "#4A6382",
          "light-blue": "#A4B6C4",
          "very-light-blue": "#CDD4DA",
          gold: "#A68768",
          beige: "#E3C39D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
