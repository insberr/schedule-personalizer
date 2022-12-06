import { defineConfig } from 'vite'
const path = require('path')
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  resolve:{
    alias: {
      'backend' : path.resolve(__dirname, './backend/pkg/backend_bg.js')
    },

  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
      chunkSplitPlugin({
        strategy: 'single-vendor',
        customSplitting: {
          // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
          'react-vendor': ['react', 'react-dom'],
          'mui': ["@mui/material", "@mui/icons-material"]
        }
      }),
      wasm(),
    topLevelAwait(),
      VitePWA({
        name: "Schedule Personalizer",
        short_name: "Schedule",
        theme_color: "#272727"
      }),

  ]
}))