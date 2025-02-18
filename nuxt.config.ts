// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    //'vuetify-nuxt-module',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@nuxt/scripts',
    '@nuxtjs/google-fonts'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false // set to 'true', EVENTUALLY
  },
  runtimeConfig: {
    public: {
      autocomplete: process.env.GEO_KEY,
      gMapKey: process.env.GMAPS_API_KEY
    }
  },
  primevue: {
    importTheme: { from: '~/assets/theme.js' },
  },
  googleFonts: {
    families: {
      Neuton: true,
      Mulish: true
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: { primary: colors.green }
        }
      }
    }
  },
  css: [ 'primeicons/primeicons.css']
})