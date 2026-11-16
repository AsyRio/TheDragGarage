import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Service worker memperbarui diri otomatis saat ada versi baru
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'motors/*.svg'],

      // Manifest: syarat agar aplikasi bisa di-install
      manifest: {
        name: 'DragGarage',
        short_name: 'DragGarage',
        description: 'Katalog motor drag dan leaderboard balap untuk game Indonesian Drag Race',
        lang: 'id',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0f1014',
        background_color: '#0f1014',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      workbox: {
        // Precache semua aset statis (termasuk gambar png/svg/webp)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        // Navigasi offline jatuh ke app shell (index.html)
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Semua GET ke API: coba jaringan dulu, jika gagal pakai cache
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
