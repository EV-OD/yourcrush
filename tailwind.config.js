/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(255, 124, 151)",
        dark: "hsl(347.63, 100%, 65.31%)",
      },
      fontFamily: {
        newSun: ["New Sun Regular", "sans-serif"],
      },
      screens: {
        small: { raw: "(max-height: 700px)" },
        // => @media (min-height: 800px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
};
