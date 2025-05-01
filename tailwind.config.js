/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        mainGreen: '#1aa3b3a6',
        hoverGreen: '#3ea5bf',
        componentGreen: '#86dc6b',
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    function ({ addBase }) {
      addBase({
        ':root': {
          '--main-green': '#40b6c4a6',
          '--hover-green': '#219100',
          '--component-green': '#86dc6b',
        },
      });
    },
  ],
};
