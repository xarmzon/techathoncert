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
        grdt: "linear-gradient(to bottom right, #22CBD5 50%,#986DF6)",
        grdt2: "linear-gradient(to top left, #22CBD5 50%,#986DF6)",
        cert_badge_g: "url(/cert_badge_g.png)",
        circuit_bg: "url(/circuit_bg.png)",
        cert_cover: "url(/techathon_certificate_cover.jpg)",
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
