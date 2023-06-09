/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.tsx",
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Roboto', sans-serif"
      },
      keyframes: {
        overlayShow: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        listItemShow: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        },
        contentShow: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
