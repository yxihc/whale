export const menu = {
  text: '组件',
  link: '/zh-CN/component/erm-form',
  activeMatch: '/zh-CN/component/',
}
const path = '/zh-CN/component/'
const mdList = [
  {
    text: '基础组件',
    items: [
      {
        text: 'ErmForm',
        link: '/zh-CN/component/erm-form',
      },
      {
        text: 'Button',
        link: '/zh-CN/component/button',
      },
    ],
  },
]
const component = {
  menu,
  path,
  mdList,
  config: { [path]: mdList },
}

export default component
