import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        realme: {
          yellow: "#FFC800",        // 🟡 amarelo oficial Realme
          "yellow-bright": "#FFD400",
          "yellow-dark": "#E6B400",
          black: "#000000",
          dark: "#0A0A0A",
          gray: "#1A1A1A",
          card: "#141414",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "realme-glow": "0 0 30px rgba(255, 200, 0, 0.25)",
        "realme-glow-lg": "0 0 60px rgba(255, 200, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;