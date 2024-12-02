import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "1020px",
        lg: "1200px",
        xl: "1400px",
        "2xl": "1580px",
      },
    },
    extend: {
      colors: {
        primary : "#4461F2"  ,
        secondary : "#0F0F0F" ,
        lightblue : "#EDEFF3",
        white : "#F9F9F9",
        black : "#0F0F0F",

      },
    },
  },
  plugins: [],
} satisfies Config;
