/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,tx,tsx}"],
  important: true,
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        'xm': '400px',
        'sm': '600px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1540px',
        '2xl': '1920px'
      },
      boxShadow: {
        'table': '0px 2px 6px 0px rgba(225, 231, 237, 1)',
        'tooltip': '0px 4px 4px 0px rgba(85, 81, 81, 0.25) '
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
    divideStyle: true
  }
};
