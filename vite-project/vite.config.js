import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'prompt',
      devOptions:{
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.svg'],
      manifest: {
        name: 'One Bubble Tea A Day',
        short_name: 'Bubble Tea',
        description: 'Bubble Tea is Good',
        theme_color: '#ffffff',
				icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox:{
        runtimeCaching:[
          {
            urlPattern: /^https:\/\/pokeapi.co\/api\/v2\/pokemon$/,
            handler: 'CacheFirst',
            options:{
              cacheName: 'auth-user-cache',
              expiration:{
                maxEntries: 10,
                maxAgeSeconds: 3 // <== 3 seconds for dev
              },
              cacheableResponse:{
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})
