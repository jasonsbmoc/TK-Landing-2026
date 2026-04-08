import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TK-Landing-2026/',
  build: {
    target: ['es2015', 'safari13'],
  },
})
