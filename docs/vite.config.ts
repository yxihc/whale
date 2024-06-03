import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import prismjsPlugin from 'vite-plugin-prismjs'
import DefineOptions from 'unplugin-vue-define-options/vite'
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
      DefineOptions(),
      prismjsPlugin({
        languages: 'all', // 语言
        plugins: ['line-numbers', 'copy-to-clipboard', 'show-language'], //官网有其他功能,这里开启行数和复制按钮功能
        theme: 'default', // 主题
        css: true,
      }),
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
