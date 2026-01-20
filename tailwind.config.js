/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#ebab56',
        'custom-orange': '#b86506',
      },
    },
  },
  plugins: [],
}
