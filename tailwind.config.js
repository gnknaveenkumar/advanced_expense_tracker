/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        mainFont:'#733c71'
      }
    },
    screens: {
      'xs': '350px',
      'md': '760px',
      'lg': '1024px',
    },
  },
  plugins: [],
}

