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
      backgroundImage: {
        'linear-home':
          'linear-gradient(0deg, rgba(64,64,64,0.5) 0%, rgba(55,55,55,0.8) 50%, rgba(51,51,51,1) 100%)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
