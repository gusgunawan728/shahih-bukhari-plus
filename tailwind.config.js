/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#f4fbf7',
          100: '#e3f6ec',
          200: '#c6edd9',
          300: '#9bdebe',
          400: '#67c79e',
          500: '#3fab80',
          600: '#2d8b66',
          700: '#256f53',
          800: '#1b4d3a',
          900: '#133a2c',
          950: '#092119',
        },
        gold: {
          50: '#fefdf7',
          100: '#fdf9e8',
          200: '#f9f1c7',
          300: '#f4e39b',
          400: '#ecd066',
          500: '#dfb738',
          600: '#c59728',
          700: '#9e7120',
          800: '#805920',
          900: '#6c4a1e',
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', 'Traditional Arabic', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
