import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        surface: "#131922",
        surface2: "#1A2128",
        border: "#232B36",
        violet: "#7C5CFF",
        cyan: "#2DD9C6",
        amber: "#FFB86B",
        text: "#E8ECF1",
        muted: "#8891A3",
        danger: "#FF6B6B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "pipeline-gradient": "linear-gradient(90deg, #7C5CFF 0%, #2DD9C6 55%, #FFB86B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
