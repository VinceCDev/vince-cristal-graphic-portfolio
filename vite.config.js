import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production is served from https://vincecdev.github.io/vince-cristal-graphic-portfolio/
// (GitHub Pages project site), so the build needs that sub-path as its base.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/vince-cristal-graphic-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
