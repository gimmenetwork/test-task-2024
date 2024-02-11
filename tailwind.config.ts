/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'bermuda-gray': {
        '50': '#f5f8f9',
        '100': '#e7eff2',
        '200': '#d5e2e8',
        '300': '#b8cfd8',
        '400': '#95b7c5',
        '500': '#7ba1b6',
        '600': '#688ba6',
        '700': '#5d7c98',
        '800': '#50667d',
        '900': '#435565',
        '950': '#2c353f',
    },
    
    }
  },
  plugins: [],
}

