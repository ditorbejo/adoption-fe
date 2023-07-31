import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";
import icons from './src/assets/images/icons.json'

const icon = icons.icons
const mapIcon = icon.map((item) => {
  return {
    src: './src/assets/images/' + item.src,
    sizes: item.sizes
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
        // icons: [
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SmallTile.scale-100.png",
        //     "sizes": "71x71"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SmallTile.scale-125.png",
        //     "sizes": "89x89"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SmallTile.scale-150.png",
        //     "sizes": "107x107"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SmallTile.scale-200.png",
        //     "sizes": "142x142"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SmallTile.scale-400.png",
        //     "sizes": "284x284"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square150x150Logo.scale-100.png",
        //     "sizes": "150x150"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square150x150Logo.scale-125.png",
        //     "sizes": "188x188"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square150x150Logo.scale-150.png",
        //     "sizes": "225x225"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square150x150Logo.scale-200.png",
        //     "sizes": "300x300"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square150x150Logo.scale-400.png",
        //     "sizes": "600x600"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Wide310x150Logo.scale-100.png",
        //     "sizes": "310x150"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Wide310x150Logo.scale-125.png",
        //     "sizes": "388x188"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Wide310x150Logo.scale-150.png",
        //     "sizes": "465x225"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Wide310x150Logo.scale-200.png",
        //     "sizes": "620x300"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Wide310x150Logo.scale-400.png",
        //     "sizes": "1240x600"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/LargeTile.scale-100.png",
        //     "sizes": "310x310"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/LargeTile.scale-125.png",
        //     "sizes": "388x388"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/LargeTile.scale-150.png",
        //     "sizes": "465x465"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/LargeTile.scale-200.png",
        //     "sizes": "620x620"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/LargeTile.scale-400.png",
        //     "sizes": "1240x1240"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.scale-100.png",
        //     "sizes": "44x44"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.scale-125.png",
        //     "sizes": "55x55"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.scale-150.png",
        //     "sizes": "66x66"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.scale-200.png",
        //     "sizes": "88x88"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.scale-400.png",
        //     "sizes": "176x176"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/StoreLogo.scale-100.png",
        //     "sizes": "50x50"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/StoreLogo.scale-125.png",
        //     "sizes": "63x63"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/StoreLogo.scale-150.png",
        //     "sizes": "75x75"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/StoreLogo.scale-200.png",
        //     "sizes": "100x100"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/StoreLogo.scale-400.png",
        //     "sizes": "200x200"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SplashScreen.scale-100.png",
        //     "sizes": "620x300"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SplashScreen.scale-125.png",
        //     "sizes": "775x375"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SplashScreen.scale-150.png",
        //     "sizes": "930x450"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SplashScreen.scale-200.png",
        //     "sizes": "1240x600"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/SplashScreen.scale-400.png",
        //     "sizes": "2480x1200"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-16.png",
        //     "sizes": "16x16"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-20.png",
        //     "sizes": "20x20"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-24.png",
        //     "sizes": "24x24"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-30.png",
        //     "sizes": "30x30"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-32.png",
        //     "sizes": "32x32"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-36.png",
        //     "sizes": "36x36"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-40.png",
        //     "sizes": "40x40"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-44.png",
        //     "sizes": "44x44"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-48.png",
        //     "sizes": "48x48"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-60.png",
        //     "sizes": "60x60"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-64.png",
        //     "sizes": "64x64"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-72.png",
        //     "sizes": "72x72"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-80.png",
        //     "sizes": "80x80"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-96.png",
        //     "sizes": "96x96"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.targetsize-256.png",
        //     "sizes": "256x256"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
        //     "sizes": "16x16"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
        //     "sizes": "20x20"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
        //     "sizes": "24x24"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
        //     "sizes": "30x30"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
        //     "sizes": "32x32"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
        //     "sizes": "36x36"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
        //     "sizes": "40x40"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
        //     "sizes": "44x44"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
        //     "sizes": "48x48"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
        //     "sizes": "60x60"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
        //     "sizes": "64x64"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
        //     "sizes": "72x72"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
        //     "sizes": "80x80"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
        //     "sizes": "96x96"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
        //     "sizes": "256x256"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
        //     "sizes": "16x16"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
        //     "sizes": "20x20"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
        //     "sizes": "24x24"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
        //     "sizes": "30x30"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
        //     "sizes": "32x32"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
        //     "sizes": "36x36"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
        //     "sizes": "40x40"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
        //     "sizes": "44x44"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
        //     "sizes": "48x48"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
        //     "sizes": "60x60"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
        //     "sizes": "64x64"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
        //     "sizes": "72x72"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
        //     "sizes": "80x80"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
        //     "sizes": "96x96"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
        //     "sizes": "256x256"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-512-512.png",
        //     "sizes": "512x512"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-192-192.png",
        //     "sizes": "192x192"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-144-144.png",
        //     "sizes": "144x144"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-96-96.png",
        //     "sizes": "96x96"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-72-72.png",
        //     "sizes": "72x72"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/android/android-launchericon-48-48.png",
        //     "sizes": "48x48"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/16.png",
        //     "sizes": "16x16"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/20.png",
        //     "sizes": "20x20"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/29.png",
        //     "sizes": "29x29"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/32.png",
        //     "sizes": "32x32"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/40.png",
        //     "sizes": "40x40"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/50.png",
        //     "sizes": "50x50"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/57.png",
        //     "sizes": "57x57"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/58.png",
        //     "sizes": "58x58"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/60.png",
        //     "sizes": "60x60"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/64.png",
        //     "sizes": "64x64"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/72.png",
        //     "sizes": "72x72"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/76.png",
        //     "sizes": "76x76"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/80.png",
        //     "sizes": "80x80"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/87.png",
        //     "sizes": "87x87"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/100.png",
        //     "sizes": "100x100"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/114.png",
        //     "sizes": "114x114"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/120.png",
        //     "sizes": "120x120"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/128.png",
        //     "sizes": "128x128"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/144.png",
        //     "sizes": "144x144"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/152.png",
        //     "sizes": "152x152"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/167.png",
        //     "sizes": "167x167"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/180.png",
        //     "sizes": "180x180"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/192.png",
        //     "sizes": "192x192"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/256.png",
        //     "sizes": "256x256"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/512.png",
        //     "sizes": "512x512"
        //   },
        //   {
        //     "src": "../adoption-fe/src/assets/images/ios/1024.png",
        //     "sizes": "1024x1024"
        //   }
        // ]
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
