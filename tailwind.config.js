/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          100: '#5C5C5C',
          200: 'rgba(51, 51, 51, 0.7)',
          300: '#404040',
          400: '#373737',
        },
      },
    },
  },
  plugins: [],
}
