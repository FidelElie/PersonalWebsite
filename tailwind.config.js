/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#248cfb",
        "secondary": "#282C34",
        "tertiary": "#7b869b"
      },
      borderWidth: {
        DEFAULT: '0.5px',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-0.5deg)' },
          '50%': { transform: 'rotate(0.5deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
