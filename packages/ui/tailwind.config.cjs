/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-background': '#59594E',
        'secondary-background': '#1A1A12',
        primary: '#91C83C',
        secondary: '#39501C',
        tertiary: '#C6C0AA',
        text: '#FFFFFF'
      }
    }
  },
  plugins: []
};
