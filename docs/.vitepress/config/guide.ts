export const menu = {
  text: '指南',
  link: '/zh-CN/guide/',
  activeMatch: '/zh-CN/guide/',
}
const path = '/zh-CN/guide/'
const mdList = [
  {
    text: '基础',
    items: [
      {
        text: '设计之初',
        link: '/zh-CN/guide/why',
      },
      {
        text: '快速开始',
        link: '/zh-CN/guide/',
      },
      {
        text: '安装',
        link: '/zh-CN/guide/installation',
      },
    ],
  },
  {
    text: '进阶',
    items: [
      {
        text: '更新日志',
        link: '/zh-CN/guide/changelog',
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
