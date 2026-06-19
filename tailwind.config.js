/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bp: {
          red:      '#CC0000',
          'red-dark': '#990000',
          'red-light': '#FF1A1A',
          white:    '#FFFFFF',
          gray:     '#F5F5F5',
          'gray-dark': '#E0E0E0',
          text:     '#1A1A1A',
          muted:    '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}