import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";
import icons from './src/assets/images/icons.json'

const icon = icons.icons
const mapIcon = icon.map((item) => {
  return {
    src: './src/assets/images/' + item.src,
    sizes: item.sizes,
    "purpose": "any maskable"
  }
})
console.log(mapIcon)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "LoremIpsum",
        short_name: "LoremIpsum",
        description: "Adoption Cat Cattery Platform",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#d84315",
        icons: mapIcon,
      },
      workbox: {
        sourcemap: true,
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
