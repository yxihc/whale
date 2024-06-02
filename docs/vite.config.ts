import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    plugins: [
      mkcert(),
      Components({
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
        ],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }),
    ],
  }
})
