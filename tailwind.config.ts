import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f97316",
          purple: "#6d28d9",
          blue: "#2563eb",
          ink: "#0f172a"
        }
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)",
        float: "0 18px 42px rgba(37, 99, 235, 0.18)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(249,115,22,0.25), transparent 22%), radial-gradient(circle at top right, rgba(99,102,241,0.28), transparent 28%), linear-gradient(135deg, #4c1d95 0%, #1d4ed8 55%, #eff6ff 120%)"
      },
      transitionDuration: {
        "600": "600ms"
      },
      animation: {
        "soft-pulse": "softPulse 2.2s ease-in-out infinite"
      },
      keyframes: {
        softPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
