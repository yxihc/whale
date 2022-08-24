import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
export const projRoot = resolve(__dirname, '..')
export const docsDirName = 'docs'
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      host: true,
      open: false,
      https: !!env.HTTPS,
      fs: {
        allow: [projRoot],
      },
    },
    plugins: [Inspect(), mkcert(), DefineOptions(), vueJsx()],
  }
})
