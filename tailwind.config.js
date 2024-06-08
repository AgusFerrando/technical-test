/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "white": "#FFFFFF",
        "background": "#F1F4F9",
        "primary-text": "#1F2A37",
        "secondary-text": "#8899A8",
        "dark": "#374151",
        "purple": "#8646F4",
        "purple-dark": "#6D28D9",
        "purple-light": "#C4B5FD",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

