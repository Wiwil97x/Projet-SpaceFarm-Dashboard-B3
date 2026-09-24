import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages serves this project at /Projet-SpaceFarm-Dashboard-B3/, not the domain root,
// so every asset URL needs that prefix. Vite dev server ignores `base` and still runs at /.
export default defineConfig({
  base: '/Projet-SpaceFarm-Dashboard-B3/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
