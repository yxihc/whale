import { defineConfig } from 'vitepress'
// import { mdPlugin } from './utils/plugins'

import { nav } from './config/nav'
import { sidebar } from './config/sidebar'

const ogDescription = '一个快速开发的组件库'
const ogImage = 'https://www.yxihc.com'
const ogTitle = 'Whale'
const ogUrl = 'https://www.yxihc.com'
// netlify envs
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

export default defineConfig({
  title: `${ogTitle}`,
  base: '/docs/dist',
  description: '一个快速的开发框架',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],
  // vue: {
  //   reactivityTransform: true
  // },
  // markdown: {
  //   config: (md) => mdPlugin(md),
  // },
  // vue: {
  //   template: {
  //     ssr: true,
  //     compilerOptions: {
  //       directiveTransforms: buildTransformers(),
  //     },
  //   },
  // },
  themeConfig: {
    logo: '/logo.png',
    editLink: {
      pattern: 'https://github.com/yxihc/whale/main/docs/:path',
      text: '在 Github 上编辑此页',
    },
    socialLinks: [
      // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://www.yxihc.com' },
      { icon: 'github', link: 'https://github.com/yxihc/whale' },
    ],
    lastUpdatedText: '最后更新时间',
    localeLinks: {
      text: '简体中文',
      items: [{ text: 'English', link: 'https://cn.vitejs.dev' }],
    },
    footer: {
      message: `🐳Whale🐳. (${commitRef})`,
      copyright: 'Copyright © 2022-2022',
    },
    nav,
    sidebar,
  },
})
