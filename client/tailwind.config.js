/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          main: 'rgb(255, 138, 54)', // Main color
        },
        cream: {
          main: 'rgb(247, 231, 208)', // Main color
        },
        green: {
          main: 'rgb(45, 67, 66)', // Secondary/Accent
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Modern font
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}
