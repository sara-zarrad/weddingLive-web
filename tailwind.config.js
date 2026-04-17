/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weddingGold: '#d4a373',
        weddingDark: '#1a1a1a',
      }
    },
  },
  plugins: [],
}