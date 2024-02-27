/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1330px',
    },
    extend: {
      colors: {
        primary: '#242a2b',
        secondary: '#808080',
        accent: {
          DEFAULT: '#1cbccf',
          secondary: '#18abbc',
          tertiary: '#90c6cd',
        },
        grey: '#e8f0f1',
        lightgrey: '#fafafa',
        success: '#4bb543',
        error: '#ed4337',
        info: '#ffc300',
      },
    },
    fontFamily: {
      primary: ['Poppins, sans-serif'],
    },
    boxShadow: {
      bshadow1: '0px 2px 40px 0px rgba(8,70,78,.08)',
      bshadow2: '0px 0px 30px 0px rgba(8,70,81,.06)',
    },
    backgroundImage: {
      register: 'url(./assets/images/alejandro-barba-rj9TiGkLRN8-unsplash.jpg)',
      login: 'url(./assets/images/julia-kicova-g827ZOCwt30-unsplash.jpg)',
      notfound: 'url(./assets/images/jaredd-craig-HH4WBGNyltc-unsplash.jpg)',
    },
  },
  plugins: [],
}
