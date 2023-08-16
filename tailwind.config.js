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
          50: '#ebebeb',
          100: '#c0c0c0',
          200: '#a1a1a1',
          300: '#767676',
          400: '#5c5c5c',
          500: '#333333',
          550: '#454545',
          600: '#2e2e2e',
          700: '#242424',
          800: '#1c1c1c',
          900: '#151515',
        },
        blue: {
          50: '#e6f0f6',
          100: '#b1d1e2',
          200: '#8bbad4',
          300: '#569bc0',
          400: '#3587b4',
          500: '#0369a1',
          600: '#036093',
          700: '#024b72',
          800: '#023a59',
          900: '#012c44',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
}
