import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'
// const result = dotenv.config({ path: '../../.env' })

dotenv.config()
// if (result.error) {
//   throw result.error
// }

console.log('process.env.SERVER_PORT = ', process.env.SERVER_PORT)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_HOST__: process.env.SERVER_HOST,
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      api: path.resolve(__dirname, './src/api'),
      pages: path.resolve(__dirname, './src/pages'),
      layouts: path.resolve(__dirname, './src/layouts'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      static: path.resolve(__dirname, './src/static'),
      hoks: path.resolve(__dirname, './src/hoks'),
      hooks: path.resolve(__dirname, './src/hooks'),
      store: path.resolve(__dirname, './src/store'),
      storeRoles: path.resolve(__dirname, './src/store/slices/roles/'),
      storeAuth: path.resolve(__dirname, './src/store/slices/auth/'),
      storeStructure: path.resolve(__dirname, './src/store/slices/structure/'),
      themes: path.resolve(__dirname, './src/themes/'),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
    },
  },
})
