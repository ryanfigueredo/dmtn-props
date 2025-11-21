/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dmtn-purple': {
          dark: '#4A4A8A',
          DEFAULT: '#5E5BB5',
          light: '#7B78D4',
          lighter: '#E8E7F5',
        },
      },
    },
  },
  plugins: [],
}

