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
        "stroke": "#DFE4EA",
        "dark": "#374151",
        "gray-1": "#F9FAFB",
        "gray-2": "#F3F4F6",
        "gray-3": "#E5E7EB",
        "gray-4": "#DEE2E6",
        "gray-5": "#CED4DA",
        "gray-6": "#CED4DA",
        "gray-7": "#CED4DA",
        "purple": "#8646F4",
        "purple-dark": "#6D28D9",
        "purple-light": "#C4B5FD",
        "purple-light-3": "#DDD6FE",
        "purple-light-4": "#EDE9FE",
        "purple-light-5": "#F5F3FF",
        "blue": "#2D68F8",
        "blue-dark": "#C1C3FB7",
        "blue-light": "#5475E5",
        "blue-light-2": "#8099EC",
        "blue-light-3": "#ADBCF2",
        "blue-light-4": "#C3CEF6",
        "blue-light-5": "#E1E8FF",
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

