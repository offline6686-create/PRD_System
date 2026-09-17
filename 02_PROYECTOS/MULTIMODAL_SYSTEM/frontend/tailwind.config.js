/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prd: {
          dark: '#0f172a',
          card: '#1e293b',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          accent: '#06b6d4'
        }
      }
    },
  },
  plugins: [],
}
