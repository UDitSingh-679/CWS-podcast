import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: "#0D0D0D",
        deep: "#080808",
        surface: "#111111",
        "brands-bg": "#0F0F14",
        cream: "#F5E2C8",
        lime: "#D4F87A",
        amber: "#F5A623",
        mouse: "#888888",
        muted: "#666666",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        editorial: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
