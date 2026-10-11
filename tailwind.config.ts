import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Brand Palette
        canvas: "var(--color-fog-grey, #EDEDED)",
        fog: {
          DEFAULT: "#EDEDED",
          light: "#F7F7F7",
          border: "#E2E2E2",
        },
        teal: {
          50: "#E6F2F6",
          100: "#CCE4EC",
          300: "#5FAAC0",
          500: "#12789C", // Primary Workshop Teal
          DEFAULT: "#12789C",
          600: "#0E6180",
          700: "#0A4A62",
        },
        navy: {
          900: "#0C2342", // Primary Deep Navy
          DEFAULT: "#0C2342",
          700: "#1A3A63",
          500: "#3D5A80",
          300: "#8798B0",
          muted: "rgba(12, 35, 66, 0.60)",
          subtle: "rgba(12, 35, 66, 0.40)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Bricolage Grotesque", "sans-serif"],
        body: ["var(--font-body)", "Helvetica World", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        hero: "40px",
        sheet: "32px",
        card: "28px",
        tile: "20px",
        button: "16px",
        input: "16px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(12, 35, 66, 0.08)",
        "soft-hover": "0 14px 36px rgba(12, 35, 66, 0.12)",
        "teal-glow": "0 18px 30px -10px rgba(18, 120, 156, 0.40)",
        "navy-glow": "0 18px 30px -10px rgba(12, 35, 66, 0.35)",
        subtle: "0 2px 8px rgba(12, 35, 66, 0.04)",
      },
      backgroundImage: {
        "gradient-teal-card": "linear-gradient(135deg, #1896BE 0%, #12789C 50%, #0E6180 100%)",
        "gradient-navy-card": "linear-gradient(135deg, #1A3A63 0%, #0C2342 100%)",
        "gradient-light-card": "linear-gradient(135deg, #FFFFFF 0%, #EDEDED 100%)",
        "gradient-teal-300-500": "linear-gradient(135deg, #5FAAC0 0%, #12789C 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
