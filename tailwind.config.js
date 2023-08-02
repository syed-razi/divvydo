/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "grow": {
          from: { height: "0%" },
          to: { height: "60%" },
        },
      },
      animation: {
        "grow": "grow 0.5s",
      },
    },
  },
  plugins: [],
};
