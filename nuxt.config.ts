// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './i18.configs';

export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    publicPath: '/assets/',
  },
  layouts: {
    default: '@/layouts/default.vue'
  },
  css: [
    '@/assets/css/tailwind.css',
  ],
    modules: [
      "@nuxtjs/tailwindcss", 
      "@nuxtjs/supabase",
      '@nuxtjs/i18n',
    ],
    i18n: i18nConfig,
  });
  