/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flameAnimation: {
          "0%": {
            transform: "translateX(0) scale(1)",
            height: "0"
          },
        },
      },
      animation: {
        flame: 'flameAnimation 1s ease-in-out',
      }
    },
  },

  plugins: [],
}
