/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        mainGreen: '#a3e635',
        hoverGreen: '#219100',
        componentGreen: '#86dc6b',
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addBase }) {
      addBase({
        ':root': {
          '--main-green': '#a3e635',
          '--hover-green': '#219100',
          '--component-green': '#86dc6b',
        },
      });
    },
  ],
};
