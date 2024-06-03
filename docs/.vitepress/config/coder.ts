export const menu = {
  text: '技术',
  link: '/zh-CN/coder/',
  activeMatch: '/zh-CN/coder/',
}
const path = '/zh-CN/coder/'
const mdList = [
  {
    text: '组件库',
    items: [
      {
        text: '项目概述',
        link: '/zh-CN/coder/',
      },
      {
        text: '构建',
        link: '/zh-CN/coder/build',
      },
    ],
  },
  {
    text: '构建工具',
    items: [
      {
        text: 'Vite',
        link: '/zh-CN/coder/vite',
      },
    ],
  },
]
export const coder = {
  menu,
  path,
  mdList,
  config: { [path]: mdList },
}

export default coder
