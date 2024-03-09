/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        scale: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        ripple: {
          "0%": {
            top: "36px",
            left: "36px",
            width: "0",
            height: "0",
            opacity: "0",
          },
          "40.9%": {
            top: "36px",
            left: "36px",
            width: "0",
            height: "0",
            opacity: "0",
          },
          "50%": {
            top: " 36px",
            left: " 36px",
            width: " 0",
            height: " 0",
            opacity: " 1",
          },
          "100%": {
            top: "0px",
            left: "0px",
            width: "72px",
            height: "72px",
            opacity: "0",
          },
        },
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both;",
        ribble: "ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
      },
    },
  },

  plugins: [],
};
