import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        // eslint-disable-next-line consistent-return
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  plugins: [react(), commonjs()],
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  server: {
    host: true,
    origin: 'http://0.0.0.0:3000',
    port: 3000,
    strictPort: true,
  },
})
