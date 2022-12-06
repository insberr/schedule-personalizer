import { defineConfig } from 'vite'
const path = require('path')
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { VitePWA } from 'vite-plugin-pwa'
import wasmPack from 'vite-plugin-wasm-pack';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  resolve:{
    alias:{
      'backend' : path.resolve(__dirname, './backend/pkg')
    },
  },
  esbuild: {
    jsx: "automatic"
  }, 
  plugins: [
    
    wasm(),
    topLevelAwait(),
      wasmPack('./backend'),
      chunkSplitPlugin({
        strategy: 'single-vendor',
        customSplitting: {
          // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
          'react-vendor': ['react', 'react-dom'],
        }
      }),
      VitePWA({
        name: "Schedule Personalizer",
        short_name: "Schedule",
        theme_color: "#272727"
      }),

  ]
}))