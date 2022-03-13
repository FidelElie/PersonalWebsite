module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/providers/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#248cfb", // Dodger Blue
        "secondary": "#F2545B", // Sizzling Red
        "tertiary": "#7b869b", // Shadow Blue
        "background": "#2D3047", // Alabaster
        "light": "#F9EAE1" // Linen
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
}
