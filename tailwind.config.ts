import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Pure black & white for editorial feel
        primary: {
          DEFAULT: "#000000",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#000000",
        },
        // Accent - Vibrant orange for CTAs
        accent: {
          DEFAULT: "#FF5722",
          50: "#fff3e0",
          100: "#ffe0b2",
          200: "#ffcc80",
          300: "#ffb74d",
          400: "#ffa726",
          500: "#FF5722",
          600: "#F4511E",
          700: "#E64A19",
          800: "#D84315",
          900: "#BF360C",
        },
        // Success green for badges
        success: {
          DEFAULT: "#22C55E",
          light: "#DCFCE7",
        },
        // Error red for discounts
        error: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
        },
        // Warning orange/yellow
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
        },
        // Neutral grays
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "4rem",
          { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "2.25rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "display-sm": [
          "1.5rem",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        product: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "product-hover": "0 8px 24px rgba(0, 0, 0, 0.12)",
        dropdown: "0 4px 20px rgba(0, 0, 0, 0.15)",
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      aspectRatio: {
        product: "3 / 4",
      },
    },
  },
  plugins: [],
};

export default config;
