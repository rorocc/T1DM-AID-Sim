// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'model': 'minmax(80px, 1fr) 10px minmax(80px, 1fr) 10px minmax(80px, 1fr)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}