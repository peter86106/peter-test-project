import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // This is necessary to allow process.env.API_KEY to work in the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})