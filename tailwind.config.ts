import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#67529c",
        secondary: "#24abb5",
        "background-light": "#ffffff",
        "background-dark": "#0f172a",
        "surface-light": "#f8f9fc",
        "surface-dark": "#1e293b",
        "card-dark": "#334155",
      },
      fontFamily: {
        display: ["Tajawal", "sans-serif"],
        body: ["Tajawal", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
