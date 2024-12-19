/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
