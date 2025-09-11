// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#9333EA",
        accent: "#F59E0B",
        background: "#FFFFFF",
        foreground: "#111827",
        destructive: "#EF4444",
        muted: "#6B7280",
      },
      borderRadius: {
        "2xl": "1.5rem",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}

export default config
