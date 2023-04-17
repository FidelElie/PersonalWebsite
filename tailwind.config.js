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
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
