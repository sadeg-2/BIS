import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative paths so the build works from any folder or sub-path on a static host.
  base: './',
  server: { port: 5180 },
  preview: { port: 4180 },
  build: {
    rollupOptions: {
      output: {
        // Keep React and the curriculum data in their own files so browsers cache them separately.
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react'
          if (id.includes('curriculum.json')) return 'curriculum'
        },
      },
    },
  },
})
