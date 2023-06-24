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
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "tapshare.png"],
      manifest: {
        name: "TapShare",
        short_name: "TapShare",
        description:
          "TapShare is a platform that enables users to transfer files, including zip files, to email and phone number in a tap",
        theme_color: "#c3C486B",
        start_url: "/",
        icons: [
          {
            src: "tapshare.png",
            type: "image/png",
            sizes: "196x196",
            purpose: "any maskable",
          },
          {
            src: "tapshare192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "tapshare512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "tapshare256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "tapshare384.png",
            type: "image/png",
            sizes: "384x384",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api");
            },
            handler: "NetworkOnly",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      onUpdateReady: () => {
        // Prompt the user to update the app
        const result = window.confirm(
          "A new version of the app is available. Do you want to update?"
        );
        if (result) {
          // Skip waiting for the user to explicitly reload the app
          window.location.reload();
        }
      },
      onUpdated: () => {
        // Notify the user that the app has been updated
        alert(
          "The app has been updated. Please reload to see the latest version."
        );
      },
    }),
  ],
});
