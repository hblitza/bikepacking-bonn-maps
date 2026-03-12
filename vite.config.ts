// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/bikepacking-bonn-maps/',
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),  // Slidev's entry — must be named 'index'
        map: path.resolve(__dirname, 'map/map.html')
      }
    }
  }
})