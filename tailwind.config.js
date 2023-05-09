/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@chakra-ui/react')],
  mode: 'jit',
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}