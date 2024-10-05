/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': '#F5E6D3',
        'light-beige': '#FAF0E6',
        'brown': '#8B4513',
        'light-brown': '#A0522D',
        'dark-brown': '#5C3317',
      },
    },
  },
  plugins: [],
}