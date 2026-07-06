import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Wi-lern-hub/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Zwei unabhängige Seiten: der WI-Lern-Hub (index.html) und die
      // eigenständige Strategie-und-Führung-App (strategie.html) —
      // beide werden separat gebaut, teilen sich aber diesen Vite-Server.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        strategie: fileURLToPath(new URL('./strategie.html', import.meta.url)),
      },
    },
  },
})
