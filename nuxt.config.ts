// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    googleCivicKey: process.env.GOOGLE_CIVIC_API_KEY,
    ipStackKey: process.env.IP_STACK_API_KEY,
  },
  css: ['@/assets/css/main.css'],
});
