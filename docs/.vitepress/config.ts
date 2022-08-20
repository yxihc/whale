import { defineConfig, DefaultTheme } from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs.dev'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
  switch (deployURL) {
    case 'https://main--vite-docs-main.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()
const versionLinks = ((): DefaultTheme.NavItemWithLink[] => {
  switch (deployType) {
    case 'main':
    case 'local':
      return [
        {
          text: 'Vite 3 Docs (release)',
          link: 'https://vitejs.dev'
        },
        {
          text: 'Vite 2 Docs',
          link: 'https://v2.vitejs.dev'
        }
      ]
    case 'release':
      return [
        {
          text: 'Vite 2 Docs',
          link: 'https://v2.vitejs.dev'
        }
      ]
  }
})()

export default defineConfig({
  title: `yxhc${additionalTitle}`,
  description: '一个快速的开发框架',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
      text: '在 Github 上编辑此页'
    },

    socialLinks: [
      // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/vitejs/vite' }
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
        items: versionLinks
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
