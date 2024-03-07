import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/catcoin/",
  server: {
    port: 443,
    host: "0.0.0.0",
    hmr: {
      host: 'catcoin.local',
      port: 443,
    },
  }
})
