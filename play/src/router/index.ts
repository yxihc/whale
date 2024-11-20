//生长路由配置
import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [{ path: '/', redirect: '/home' }]

const pages = import.meta.glob('../pages/**/page.ts', {
  eager: true,
  import: 'default',
})

console.log(pages)
const router = createRouter({
  history: createWebHashHistory(), //createWebHashHistory(), //createWebHistory(),
  routes: constantRoutes, //mapTwoLevelRouter(constantRoutes)
})

export default router
