import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: assets must resolve beneath /ajan-portfolio/.
export default defineConfig({
  base: '/ajan-portfolio/',
  plugins: [react()],
})
