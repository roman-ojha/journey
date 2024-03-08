/** @type {import('tailwindcss').Config} */
import getCssVariableForTailwind from "./lib/getCssVariableForTailwind";
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        background: getCssVariableForTailwind(
          "--clr-container-background-primary"
        ),
        "background-secondary": getCssVariableForTailwind(
          "--clr-container-background-secondary"
        ),
        foreground: "hsl(var(--foreground))",
        "background-secondary-op-50": getCssVariableForTailwind(
          "--clr-container-bg-secondary-op-50"
        ),
        "background-primary-op-20": getCssVariableForTailwind(
          "--clr-container-bg-primary-op-20"
        ),
        "container-border": getCssVariableForTailwind("--clr-container-border"),
        "rating-star": getCssVariableForTailwind("--clr-base-rating-star"),
        primary: {
          DEFAULT: getCssVariableForTailwind("--clr-base-primary"),
          foreground: getCssVariableForTailwind("--clr-foreground-primary"),
        },
        secondary: {
          DEFAULT: getCssVariableForTailwind("--clr-base-secondary"),
          foreground: getCssVariableForTailwind("--clr-foreground-secondary"),
        },
        tertiary: {
          DEFAULT: getCssVariableForTailwind("--clr-base-tertiary"),
          foreground: getCssVariableForTailwind("--clr-foreground-tertiary"),
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
};
