const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        light: colors.cyan["500"],
        DEFAULT: colors.cyan["600"],
        dark: colors.cyan["700"]
      },
      secondary: {
        light: colors.amber["500"],
        DEFAULT: colors.amber["600"],
        dark: colors.amber["700"]
      },
      tertiary: {
        light: colors.emerald["500"],
        DEFAULT: colors.emerald["600"],
        dark: colors.emerald["700"]
      },
      gray: {
        lightest: colors.blue["50"],
        lighter: colors.slate["500"],
        light: colors.slate["600"],
        DEFAULT: colors.slate["700"],
        dark: colors.slate["800"],
        darker: colors.slate["900"]
      },
      white: colors.white,
      transparent: "transparent",
      currentColor: "currentColor",
      inherit: "inherit"
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
