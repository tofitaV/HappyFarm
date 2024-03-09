import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/happyfarmer/",
  server: {
    port: 443,
    host: "0.0.0.0",
    hmr: {
      host: 'HappyFarm.local',
      port: 443,
    },
  }
})
