// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', 'nitro-cloudflare-dev'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: false }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'frier',
        compatibility_date: '2026-01-09',
        observability: {
          enabled: true
        },
        compatibility_flags: ['nodejs_compat'],
        containers: [
          {
            class_name: 'Sandbox',
            image: './Dockerfile',
            instance_type: 'lite',
            max_instances: 10
          }
        ],
        assets: {
          directory: './.output/public/',
          binding: 'ASSETS'
        }
      }
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
