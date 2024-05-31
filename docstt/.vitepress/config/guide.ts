export const menu = { text: '指南', link: '/guide/', activeMatch: '/guide/' }
const path = '/guide/'
const mdList = [
  {
    text: '基础',
    items: [
      {
        text: '设计之初',
        link: '/guide/why',
      },
      {
        text: '快速开始',
        link: '/guide/',
      },
      {
        text: '安装',
        link: '/guide/installation',
      },
    ],
  },
  {
    text: '进阶',
    items: [
      {
        text: '更新日志',
        link: '/guide/changelog',
      },
    ],
  },
]
const guide = {
  menu,
  path,
  mdList,
  config: { [path]: mdList },
}

export default guide
