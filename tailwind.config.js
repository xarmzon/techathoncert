/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1100px",
        "2xl": "1440px",
      },
    },

    extend: {
      fontFamily: {
        techathonRegular: ["TechathonRegular", "sans-serif"],
        techathonMedium: ["TechathonMedium", "sans-serif"],
      },
      backgroundImage: {
        circuit_bg: "url(/circuit_bg.png)",
        grdt: "linear-gradient(to bottom right, #22CBD5 50%,#986DF6)",
      },
      colors: {
        primary: {
          DEFAULT: "#32376F",
          dark: "#05050b",
        },
        secondary: "#22CBD5",
        accent: "#986DF6",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
