import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: {
        max: "480px",
      },
      sm: {
        max: "768.98px",
      },
      xlg: {
        max: "976px",
      },
      xmd: {
        max: "1250px",
      },
      md: "768.99px",
      lg: "976px",
      l: "1250px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        geistsans: ["var(--font-geist-sans)"],
        geistmono: ["var(--font-geist-mono)"],
      },
      colors: {
        brand: {
          dark: "#000000",
          white: "#FFFFFF",
          main: "#1F0047",
          secondary: "#B1D362",
          lightYellow: "#FCFF45",
          grayish: "#7B7B7B",
          gray100: "#C4C4C4",
          gray200: "#434343",
          gray300: "#F9F9F9",
          gray400: "#E9E9E9",
          gray500: "#262626",
          gray600: "#F5F5F5",
          gray700: "#D9D9D9",
          lightBlue: "#EAF8FF",
          lightGreen: "#E9F9EB",
          pink100: "#FDE6E4",
          pink200: "#F8F5FB",
          yellow100: "#FDF5DD",
          // grayish: "#9CA3AF",
          ash: "#F4F4F4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
