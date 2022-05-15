module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#248cfb", // Dodger Blue
        "secondary": "#F2545B", // Sizzling Red
        "tertiary": "#7b869b", // Shadow Blue
        "background": "#2D3047", // Alabaster
        "light": "#F9EAE1", // Linen
        "orange": "#E3A857"
      },
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
