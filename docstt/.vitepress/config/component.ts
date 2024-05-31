export const menu = {
  text: '组件',
  link: '/component/erm-form',
  activeMatch: '/component/',
}
const path = '/component/'
const mdList = [
  {
    text: '基础组件',
    items: [
      {
        text: 'ErmForm',
        link: '/component/erm-form',
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
