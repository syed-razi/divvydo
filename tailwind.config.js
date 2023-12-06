/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      keyframes: {
        grow: {
          from: { height: "0%" },
          to: { height: "60%" },
        },
      },
      animation: {
        grow: "grow 0.5s",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
