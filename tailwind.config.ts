import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "custom-xl": "1400px",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".common-transition": {
          transition: "all 300ms linear",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]); 
    },
  ],
};

export default config;
