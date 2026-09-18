import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15101F",
        surface: "#1F1830",
        surface2: "#2A2140",
        border: "#3A2F52",
        gold: "#E8A63D",
        goldDeep: "#C77F1F",
        copper: "#C6712F",
        teal: "#2FBF9E",
        text: "#F6F1E7",
        muted: "#A296C4",
        danger: "#E5484D",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
