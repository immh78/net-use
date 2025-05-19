import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate', // service worker가 변경되면 자동으로 업데이트
    //includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'], // 정적 파일
    manifest: {
      name: '모바일 데이터 사용 예정량',
      short_name: 'Mobile Data',
      description: '모바일 데이터 사용 예정량',
      theme_color: '#42b883',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'monitoring.svg',
          sizes: '192x192',
          type: 'image/svg+xml'
        },
        {
          src: 'monitoring.svg',
          sizes: '512x512',
          type: 'image/svg+xml'
        },
        {
          src: 'monitoring.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    }
  })
  ],
  base: "/net-use/"
})
