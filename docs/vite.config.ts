import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
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
  }
})
