import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/chapters/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/engine/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.12)",
        "glass-lg": "0 16px 48px rgba(0,0,0,0.20)",
      },
      backdropBlur: {
        xs: "4px",
      },
      colors: {
        "glass-white": "rgba(255,255,255,0.08)",
        "glass-border": "rgba(255,255,255,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
