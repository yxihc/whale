import coder from './coder'
import component from './component'
import guide from './guide'
export const nav = [
  guide.menu,
  component.menu,
  { text: '插件', link: '/plugins/', activeMatch: '/plugins/' },
  coder.menu,
  { text: '团队', link: '/team', activeMatch: '/team' },
  {
    text: '相关资源',
    items: [
      {
        items: [
          {
            text: 'Vite',
            link: 'https://cn.vitejs.dev/',
          },
          {
            text: 'Vue',
            link: 'https://chat.vitejs.dev',
          },
          {
            text: 'Rollup Plugins Compat',
            link: 'https://vite-rollup-plugins.patak.dev/',
          },
          {
            text: '更新日志',
            link: 'https://github.com/yxihc/whale',
          },
        ],
      },
    ],
  },
  {
    text: 'Version',
    items: [{ text: '1.0', link: '/guide/' }],
  },
]
