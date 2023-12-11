/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sky-gradient':
          'linear-gradient(91deg, #0369A1 0%, #0369A1 0%, #024B72 100%)',
        'modal-gradient':
          'linear-gradient(153deg, rgba(51, 51, 51, 0.7) 0%, rgba(39, 39, 39, 0.7) 100%)',
        'button-gradient': 'linear-gradient(91deg, #333 0%, #2E2E2E 100%)',
        'desk-gradient': 'linear-gradient(91deg, #2E2E2E 0%, #242424 100%)',
        'grey-gradient': 'linear-gradient(141deg, #181818 0%, #242424 100%);',
      },
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
          650: '#474747',
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
