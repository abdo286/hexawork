/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        backgroundColor: "background-color",
        text: "color",
        shadow: "boxShadow",
        transform: "transform",
        maxHeight: "max-height",
      },
      boxShadow: {
        "3xl": "-12px 35px 60px -15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
