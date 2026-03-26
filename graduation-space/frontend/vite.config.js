import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set base to repo name for GitHub Pages deployment
  base: process.env.VITE_BASE_URL || '/',
})
