/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        "primary-dark": "#1E40AF",
        secondary: "#9333EA",
        "secondary-dark": "#7E22CE",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        background: "#F3F4F6",
        "background-dark": "#1F2937",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles
  },
  plugins: [],
};
