module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#248cfb",
        "secondary": "#282C34",
        "tertiary": "#7b869b",
        "accent1": "#F46036",
        "accent2": "#F9ADA0"
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
