import { defineConfig,DefaultTheme} from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Whale'
const ogUrl = 'https://vitejs.dev'

// netlify envs
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

export default defineConfig({
  title: `${ogTitle}`,
  description: '一个快速的开发框架',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#646cff' }]
  ],
  vue: {
    reactivityTransform: true
  },
  themeConfig: {
    logo: '/logo.png',
    editLink: {
      pattern: 'https://github.com/yxihc/whale/main/docs/:path',
      text: '在 Github 上编辑此页'
    },
    socialLinks: [
      // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/yxihc/whale' }
    ],
    lastUpdatedText:'最后更新时间',
    localeLinks: {
      text: '简体中文',
      items: [
        { text: 'English', link: 'https://cn.vitejs.dev' },
      ]
    },
    footer: {
      message: `页尾标题. (${commitRef})`,
      copyright: 'Copyright © 20222-'
    },
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '组件', link: '/component/button', activeMatch: '/component/' },
      { text: '技术', link: '/config/', activeMatch: '/config/' },
      { text: '插件', link: '/plugins/', activeMatch: '/plugins/' },
      { text: '团队', link: '/team', activeMatch: '/team' },
      {
        text: '相关资源',
        items: [
          {
            items: [
              {
                text: 'Vite',
                link: 'https://cn.vitejs.dev/'
              },
              {
                text: 'Vue',
                link: 'https://chat.vitejs.dev'
              },
              {
                text: 'Awesome Vite',
                link: 'https://github.com/vitejs/awesome-vite'
              },
              {
                text: 'DEV Community',
                link: 'https://dev.to/t/vite'
              },
              {
                text: 'Rollup Plugins Compat',
                link: 'https://vite-rollup-plugins.patak.dev/'
              },
              {
                text: '更新日志',
                link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md'
              }
            ]
          }
        ]
      },
      {
        text: 'Version',
        items: [
          {text:'1.0',link:'/team'}
        ]
      }
    ],

    sidebar: {
      '/component/': [
        {
          text:'基础组件',
          items:[
            {
              text: 'button',
              link: '/component/button',
            },
          ]
        }
      ],
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '设计之初',
              link: '/guide/why',
            },
            {
              text: '快速开始',
              link: '/guide/'
            },
            {
              text: '安装',
              link: '/guide/installation'
            },
          ]
        },
        {
          text: '进阶',
          items: [
            {
              text: '更新日志',
              link: '/guide/changelog'
            },
          ]
        }
      ],
      '/config/': [
        {
          text: '组件库',
          items: [
            {
              text: 'Element-plus',
              link: '/config/'
            },
          ]
        },
        {
          text: '构建工具',
          items: [
            {
              text: 'Vite',
              link: '/config/vite'
            },
          ]
        }
      ]
    }
  }
})
