import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由类型
interface RouteConfig {
  path: string
  name: string
  component: () => Promise<any>

}
// vue路由配置

const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect:'/home'
  },
]

// 自动导入 `index.vue` 和 `page.ts/js` 文件
const indexPages = import.meta.glob('../pages/**/index.vue')
const pageScripts = import.meta.glob('../pages/**/page.{ts,js}', {
  eager: true,
})

// 匹配目录中同时存在 `index.vue` 和 `page.ts/js` 的文件
const routes: RouteConfig[] = Object.keys(pageScripts)
  .filter((scriptPath) => {
    const dirPath = scriptPath
      .replace('/page.ts', '/index.vue')
      .replace('/page.js', '/index.vue')
    return dirPath in indexPages // 确保对应的 `index.vue` 文件存在
  })
  .map((scriptPath) => {
    const name = scriptPath
      .replace('../pages/', '') // 去掉目录前缀
      .replace('/page.ts', '') // 去掉文件后缀
      .replace('/page.js', '')
    const pageConfig = pageScripts[scriptPath]?.default
    const title = pageConfig?.title ? pageConfig.title : ''
    return {
      path: `/${name.toLowerCase()}`, // 生成路由路径
      name, // 使用目录名作为路由名称
      meta: {
        title,
      },
      component:
        indexPages[
          scriptPath
            .replace('/page.ts', '/index.vue')
            .replace('/page.js', '/index.vue')
        ], // 使用对应的 `index.vue` 作为组件
    }
  })

// 添加生成的路由到常量路由
constantRoutes.push(...routes)

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式的路由
  routes: constantRoutes,
})

export default router
