import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
// server.hmr.overlay = false;
export default defineConfig({
  // server
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache-v4",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      onUpdateReady: () => {
        // Skip waiting for the user to explicitly reload the app
        self.skipWaiting();
      },
      onUpdated: () => {
        // Send a message to the clients (browser tabs) to update themselves
        self.clients.claim();
      },
      includeAssets: ["tapShare.ico", "apple-touch-icon.webp", "tapShare.webp"],
      manifest: {
        name: "TapShare",
        short_name: "TapShare",
        background_color: "#000000",
        description:
          "TapShare is a platform that enables users to transfer files/codes, including zip files, to email and phone number in a tap",
        theme_color: "#3C486B",
        start_url: "/",
        icons: [
          {
            src: "tapShare-16x16.webp",
            type: "image/webp",
            sizes: "16x16",
          },
          {
            src: "tapShare-32x32.webp",
            type: "image/webp",
            sizes: "32x32",
          },
          {
            src: "tapShare-192x192.webp",
            type: "image/webp",
            sizes: "192x192",
          },
          {
            src: "tapShare-194x194.webp",
            type: "image/webp",
            sizes: "194x194",
            purpose: "any maskable",
          },
          {
            src: "tapShare-384x384.webp",
            type: "image/webp",
            sizes: "384x384",
          },
          {
            src: "windows11/SmallTile.scale-100.webp",
            type: "image/webp",
            sizes: "71x71",
          },
          {
            src: "windows11/SmallTile.scale-125.webp",
            type: "image/webp",
            sizes: "89x89",
          },
          {
            src: "windows11/SmallTile.scale-150.webp",
            type: "image/webp",
            sizes: "107x107",
          },
          {
            src: "windows11/SmallTile.scale-200.webp",
            type: "image/webp",
            sizes: "142x142",
          },
          {
            src: "windows11/SmallTile.scale-400.webp",
            type: "image/webp",
            sizes: "284x284",
          },
          {
            src: "windows11/Square150x150Logo.scale-100.webp",
            type: "image/webp",
            sizes: "150x150",
          },
          {
            src: "windows11/Square150x150Logo.scale-125.webp",
            type: "image/webp",
            sizes: "188x188",
          },
          {
            src: "windows11/Square150x150Logo.scale-150.webp",
            type: "image/webp",
            sizes: "225x225",
          },
          {
            src: "windows11/Square150x150Logo.scale-200.webp",
            type: "image/webp",
            sizes: "300x300",
          },
          {
            src: "windows11/Square150x150Logo.scale-400.webp",
            type: "image/webp",
            sizes: "600x600",
          },
          {
            src: "windows11/Wide310x150Logo.scale-100.webp",
            type: "image/webp",
            sizes: "310x150",
          },
          {
            src: "windows11/Wide310x150Logo.scale-125.webp",
            type: "image/webp",
            sizes: "388x188",
          },
          {
            src: "windows11/Wide310x150Logo.scale-150.webp",
            type: "image/webp",
            sizes: "465x225",
          },
          {
            src: "windows11/Wide310x150Logo.scale-200.webp",
            type: "image/webp",
            sizes: "620x300",
          },
          {
            src: "windows11/Wide310x150Logo.scale-400.webp",
            type: "image/webp",
            sizes: "1240x600",
          },
          {
            src: "windows11/LargeTile.scale-100.webp",
            type: "image/webp",
            sizes: "310x310",
          },
          {
            src: "windows11/LargeTile.scale-125.webp",
            type: "image/webp",
            sizes: "388x388",
          },
          {
            src: "windows11/LargeTile.scale-150.webp",
            type: "image/webp",
            sizes: "465x465",
          },
          {
            src: "windows11/LargeTile.scale-200.webp",
            type: "image/webp",
            sizes: "620x620",
          },
          {
            src: "windows11/LargeTile.scale-400.webp",
            type: "image/webp",
            sizes: "1240x1240",
          },
          {
            src: "windows11/Square44x44Logo.scale-100.webp",
            type: "image/webp",
            sizes: "44x44",
          },
          {
            src: "windows11/Square44x44Logo.scale-125.webp",
            type: "image/webp",
            sizes: "55x55",
          },
          {
            src: "windows11/Square44x44Logo.scale-150.webp",
            type: "image/webp",
            sizes: "66x66",
          },
          {
            src: "windows11/Square44x44Logo.scale-200.webp",
            type: "image/webp",
            sizes: "88x88",
          },
          {
            src: "windows11/Square44x44Logo.scale-400.webp",
            type: "image/webp",
            sizes: "176x176",
          },
          {
            src: "windows11/StoreLogo.scale-100.webp",
            type: "image/webp",
            sizes: "50x50",
          },
          {
            src: "windows11/StoreLogo.scale-125.webp",
            type: "image/webp",
            sizes: "63x63",
          },
          {
            src: "windows11/StoreLogo.scale-150.webp",
            type: "image/webp",
            sizes: "75x75",
          },
          {
            src: "windows11/StoreLogo.scale-200.webp",
            type: "image/webp",
            sizes: "100x100",
          },
          {
            src: "windows11/StoreLogo.scale-400.webp",
            type: "image/webp",
            sizes: "200x200",
          },
          {
            src: "windows11/SplashScreen.scale-100.webp",
            type: "image/webp",
            sizes: "620x300",
          },
          {
            src: "windows11/SplashScreen.scale-125.webp",
            type: "image/webp",
            sizes: "775x375",
          },
          {
            src: "windows11/SplashScreen.scale-150.webp",
            type: "image/webp",
            sizes: "930x450",
          },
          {
            src: "windows11/SplashScreen.scale-200.webp",
            type: "image/webp",
            sizes: "1240x600",
          },
          {
            src: "windows11/SplashScreen.scale-400.webp",
            type: "image/webp",
            sizes: "2480x1200",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-16.webp",
            type: "image/webp",
            sizes: "16x16",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-20.webp",
            type: "image/webp",
            sizes: "20x20",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-24.webp",
            type: "image/webp",
            sizes: "24x24",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-30.webp",
            type: "image/webp",
            sizes: "30x30",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-32.webp",
            type: "image/webp",
            sizes: "32x32",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-36.webp",
            type: "image/webp",
            sizes: "36x36",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-40.webp",
            type: "image/webp",
            sizes: "40x40",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-44.webp",
            type: "image/webp",
            sizes: "44x44",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-48.webp",
            type: "image/webp",
            sizes: "48x48",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-60.webp",
            type: "image/webp",
            sizes: "60x60",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-64.webp",
            type: "image/webp",
            sizes: "64x64",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-72.webp",
            type: "image/webp",
            sizes: "72x72",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-80.webp",
            type: "image/webp",
            sizes: "80x80",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-96.webp",
            type: "image/webp",
            sizes: "96x96",
          },
          {
            src: "windows11/Square44x44Logo.targetsize-256.webp",
            type: "image/webp",
            sizes: "256x256",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-16.webp",
            type: "image/webp",
            sizes: "16x16",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-20.webp",
            type: "image/webp",
            sizes: "20x20",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-24.webp",
            type: "image/webp",
            sizes: "24x24",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-30.webp",
            type: "image/webp",
            sizes: "30x30",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-32.webp",
            type: "image/webp",
            sizes: "32x32",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-36.webp",
            type: "image/webp",
            sizes: "36x36",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-40.webp",
            type: "image/webp",
            sizes: "40x40",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-44.webp",
            type: "image/webp",
            sizes: "44x44",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-48.webp",
            type: "image/webp",
            sizes: "48x48",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-60.webp",
            type: "image/webp",
            sizes: "60x60",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-64.webp",
            type: "image/webp",
            sizes: "64x64",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-72.webp",
            type: "image/webp",
            sizes: "72x72",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-80.webp",
            type: "image/webp",
            sizes: "80x80",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-96.webp",
            type: "image/webp",
            sizes: "96x96",
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-256.webp",
            type: "image/webp",
            sizes: "256x256",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.webp",
            type: "image/webp",
            sizes: "16x16",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.webp",
            type: "image/webp",
            sizes: "20x20",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.webp",
            type: "image/webp",
            sizes: "24x24",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.webp",
            type: "image/webp",
            sizes: "30x30",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.webp",
            type: "image/webp",
            sizes: "32x32",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.webp",
            type: "image/webp",
            sizes: "36x36",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.webp",
            type: "image/webp",
            sizes: "40x40",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.webp",
            type: "image/webp",
            sizes: "44x44",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.webp",
            type: "image/webp",
            sizes: "48x48",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.webp",
            type: "image/webp",
            sizes: "60x60",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.webp",
            type: "image/webp",
            sizes: "64x64",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.webp",
            type: "image/webp",
            sizes: "72x72",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.webp",
            type: "image/webp",
            sizes: "80x80",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.webp",
            type: "image/webp",
            sizes: "96x96",
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.webp",
            type: "image/webp",
            sizes: "256x256",
          },
          {
            src: "android/android-launchericon-512-512.webp",
            type: "image/webp",
            sizes: "512x512",
          },
          {
            src: "android/android-launchericon-192-192.webp",
            type: "image/webp",
            sizes: "192x192",
          },
          {
            src: "android/android-launchericon-144-144.webp",
            type: "image/webp",
            sizes: "144x144",
          },
          {
            src: "android/android-launchericon-96-96.webp",
            type: "image/webp",
            sizes: "96x96",
          },
          {
            src: "android/android-launchericon-72-72.webp",
            type: "image/webp",
            sizes: "72x72",
          },
          {
            src: "android/android-launchericon-48-48.webp",
            type: "image/webp",
            sizes: "48x48",
          },
          {
            src: "ios/16.webp",
            type: "image/webp",
            sizes: "16x16",
          },
          {
            src: "ios/20.webp",
            type: "image/webp",
            sizes: "20x20",
          },
          {
            src: "ios/29.webp",
            type: "image/webp",
            sizes: "29x29",
          },
          {
            src: "ios/32.webp",
            type: "image/webp",
            sizes: "32x32",
          },
          {
            src: "ios/40.webp",
            type: "image/webp",
            sizes: "40x40",
          },
          {
            src: "ios/50.webp",
            type: "image/webp",
            sizes: "50x50",
          },
          {
            src: "ios/57.webp",
            type: "image/webp",
            sizes: "57x57",
          },
          {
            src: "ios/58.webp",
            type: "image/webp",
            sizes: "58x58",
          },
          {
            src: "ios/60.webp",
            type: "image/webp",
            sizes: "60x60",
          },
          {
            src: "ios/64.webp",
            type: "image/webp",
            sizes: "64x64",
          },
          {
            src: "ios/72.webp",
            type: "image/webp",
            sizes: "72x72",
          },
          {
            src: "ios/76.webp",
            type: "image/webp",
            sizes: "76x76",
          },
          {
            src: "ios/80.webp",
            type: "image/webp",
            sizes: "80x80",
          },
          {
            src: "ios/87.webp",
            type: "image/webp",
            sizes: "87x87",
          },
          {
            src: "ios/100.webp",
            type: "image/webp",
            sizes: "100x100",
          },
          {
            src: "ios/114.webp",
            type: "image/webp",
            sizes: "114x114",
          },
          {
            src: "ios/120.webp",
            type: "image/webp",
            sizes: "120x120",
          },
          {
            src: "ios/128.webp",
            type: "image/webp",
            sizes: "128x128",
          },
          {
            src: "ios/144.webp",
            type: "image/webp",
            sizes: "144x144",
          },
          {
            src: "ios/152.webp",
            type: "image/webp",
            sizes: "152x152",
          },
          {
            src: "ios/167.webp",
            type: "image/webp",
            sizes: "167x167",
          },
          {
            src: "ios/180.webp",
            type: "image/webp",
            sizes: "180x180",
          },
          {
            src: "ios/192.webp",
            type: "image/webp",
            sizes: "192x192",
          },
          {
            src: "ios/256.webp",
            type: "image/webp",
            sizes: "256x256",
          },
          {
            src: "ios/512.webp",
            type: "image/webp",
            sizes: "512x512",
          },
          {
            src: "ios/1024.webp",
            type: "image/webp",
            sizes: "1024x1024",
          },
        ],
      },
    }),
  ],
});
