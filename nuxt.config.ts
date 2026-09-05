// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', 'nitro-cloudflare-dev'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-09-04',

  nitro: {
    preset: 'cloudflare_module',
    // path is in relation to the ./server directory
    // adapted from:https://github.com/nitrojs/nitro/discussions/3099#discussioncomment-13618572
    entry: process.env.NODE_ENV === 'production' ? './cfentry.ts' : undefined,
    cloudflare: {
      nodeCompat: true,
      deployConfig: true
    }
  },

  typescript: {
    typeCheck: false,
    strict: true
  },

  eslint: {
    checker: true,
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
