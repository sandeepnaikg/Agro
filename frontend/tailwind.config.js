/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B3D2A",
        "primary-light": "#2D5A3D",
        secondary: "#B85C38",
        "secondary-container": "#E8D4A8",
        accent: "#4A7C59",
        surface: "#FAF8F4",
        "surface-low": "#FFFFFF",
        "surface-muted": "#F0EBE3",
        parchment: "#F5F1EA",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        standard: "24px",
        card: "28px",
      },
      boxShadow: {
        ambient: "0 8px 32px rgb(27 61 42 / 0.06)",
        card: "0 4px 24px rgb(27 61 42 / 0.05)",
        "card-hover": "0 12px 40px rgb(27 61 42 / 0.1)",
      },
      spacing: {
        section: "5rem",
        "section-sm": "3.5rem",
      },
    },
  },
  plugins: [],
}
