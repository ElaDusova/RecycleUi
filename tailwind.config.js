/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
    theme: {
      colors: {
        'mainGreen': '#a3e635',
        'hoverGreen': '#219100',
        'componentGreen': '#86dc6b',
      }
    }
}
