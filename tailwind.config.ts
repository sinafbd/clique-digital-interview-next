import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "forecast-gradient":
          "linear-gradient(0deg, rgba(196, 196, 196, 0.2) -79.96%, rgba(196, 196, 196, 0.0877044) 6.86%, rgba(196, 196, 196, 0) 78.31%)",
      },
      colors: {
        primaryColor: "#F48403",
        primaryBg: "#2c2a30",
        secondaryBg: "#232229",
      },
    },
  },
  plugins: [],
};
export default config;
