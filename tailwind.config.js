const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      blue: "#248cfb", // Dodger Blue
      cyan: colors.cyan, // Cyan Pallete
      red: "#F2545B",  // Sizzling Red
      gray: "#7b869b", // Shadow Blue
      darkgray: "#2D3047", // Alabaster
      orange: "#E3A857", // India Orange
      white: "#FFFFFF",
      black: "#000000"
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
