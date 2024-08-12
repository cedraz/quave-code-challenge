// eslint-disable-next-line import/no-unresolved
const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ui/**/*.{js,jsx,ts,tsx}', './client/*.html', flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
