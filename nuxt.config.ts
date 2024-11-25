import { isDevelopment } from "std-env";

const appTitle = "DragonBane - Sheet"

const appDescription = "Dragon Bane TTRPG - Character Sheet Editor"

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  app: {
    head: {
      title: `${appTitle}`,
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "description", content: `${appDescription}` },
        { name: "theme-color", content: "#ffffff" },
        { name: "msapplication-TileColor", content: "#22c55e" },

        { name: 'description', content: 'Dragon Bane TTRPG - Character Sheet Editor.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Open Graph / Facebook meta tags
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Dragon Bane - Sheet' },
        { property: 'og:title', content: 'Dragon Bane - Sheet' },
        { property: 'og:description', content: 'Dragon Bane TTRPG - Character Sheet Editor.' },
        { property: 'og:image', content: 'https://dragonbanesheet.netlify.app/icons/web-app-manifest-512x512.png' },
        { property: 'og:url', content: 'https://dragonbanesheet.netlify.app/' },

        // Twitter Card meta tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Dragon Bane - Sheet' },
        { name: 'twitter:description', content: 'Dragon Bane TTRPG - Character Sheet Editor.' },
        { name: 'twitter:image', content: 'https://dragonbanesheet.netlify.app/icons/web-app-manifest-512x512.png' },

      ],
      link: [
        {
          rel: "icon",
          href: "/icons/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          rel: "apple-touch-icon",
          href: "/icons/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@vite-pwa/nuxt",
    '@pinia/nuxt',
    '@nuxt/ui'
  ],

  colorMode: {
    preference: 'light'
  },

  ui: {
    global: true,
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // plugins: [
  //   '~/plugins/pinia-plugin-persist.client'
  // ],
  pwa: {
    mode: isDevelopment ? "development" : "production",
    scope: "/",
    filename: "sw.ts",
    strategies: "injectManifest",
    includeManifestIcons: false,
    manifest: {
      name: `${appTitle}`,
      short_name: `${appTitle}`,
      description: `${appDescription}`,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/icons/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      start_url: "/",
      display: "fullscreen",
    },
    devOptions: {
      enabled: isDevelopment,
      type: "module",
    },
    client: {
      installPrompt: true,
    },
  },

  compatibilityDate: "2024-11-24",
})