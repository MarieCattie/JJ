import svgLoader from 'vite-svg-loader';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'JuniorJob',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  components: ['@/components', { path: '@/components/UI', prefix: 'app' }],
  css: ['@/assets/scss/global.scss'],
  modules: [
    '@nuxt/ui',
    'nuxt-icons',
    ['@pinia/nuxt', { autoImports: ['defineStore']}],
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
  ],
  plugins: [
    '~/plugins/apiClient.ts',
    '~/plugins/api.ts'
  ],
  runtimeConfig: {
    public: {
      backendAddress: process.env.BACKEND_ADDRESS || 'https://api.junior-job.ru',
      chatApiAddress: process.env.CHATAPI_ADDRESS || 'https://chatapi.junior-job.ru',
      uploadAddress: process.env.UPLOAD_ADDRESS || 'https://api.junior-job.ru',
      primaryAddress: process.env.PRIMARY_ADDRESS || 'https://api.junior-job.ru',
      domainCookie: 'localhost',
    },
  },
  typescript: { strict: true },
  imports: {
    dirs: ['utils/**', 'stores'],
  },
  vite: {
    plugins: [svgLoader({ defaultImport: 'url' })],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '@/assets/scss/variables' as *;
            @use '@/assets/scss/mixins' as *;
          `,
        },
      },
    },
  },
  i18n: { vueI18n: './i18n.ts' },
  devtools: { enabled: true },
})
