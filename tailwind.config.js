/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,vue}"],
    theme: {
      extend: {
        colors: {
          "bookclub-primary": "#211C6A",
          "bookclub-secondary": "#59B4C3",
          "bookclub-green": "#74E291",
          "bookclub-yellow": "#EFF396",
        },
      },
      fontFamily: {
        Roboto: ["Roboto, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true,
      },
    },
    plugins: [],
  }