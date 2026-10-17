/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: '#0f1828',
        primaryDark: '#070d17',
        primaryLight: '#1a2a44',
        secondary: '#f59e0b',
        secondaryDark: '#c47d08',
        dark: '#0F172A',
        light: '#F8FAFC',
        success: '#22C55E',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
}