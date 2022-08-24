export const menu = { text: '技术', link: '/coder/', activeMatch: '/coder/' }
const path = '/coder/'
const mdList = [
  {
    text: '组件库',
    items: [
      {
        text: '项目概述',
        link: '/coder/',
      },
      {
        text: '构建',
        link: '/coder/build',
      },
    ],
  },
  {
    text: '构建工具',
    items: [
      {
        text: 'Vite',
        link: '/coder/vite',
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
