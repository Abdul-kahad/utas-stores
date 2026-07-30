import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Allows testing the PWA service worker during npm run dev
      },
      manifest: {
        name: 'UTAS Stores',
        short_name: 'UTAS Stores',
        description: 'UTAS Store & Inventory Management System',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  // server: {
  //   host: true, // Listens on all local IPs (0.0.0.0)
  //   port: 5173,
  // },
  // preview: {
  //   host: true, // Exposes preview build on LAN
  //   port: 4173,
  // }
})