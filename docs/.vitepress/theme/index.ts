import './style.css'
import theme from 'vitepress/theme'
import DefaultTheme from 'vitepress/theme'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VPDemo from './../vitepress/components/vp-demo.vue'
import 'element-plus/dist/index.css'
import WhaleTeam from './../vitepress/components/WhaleTeam.vue'
import type { Theme } from 'vitepress'
export default <Theme>{
  // Layout() {
  //   return h(theme.Layout, null, {})
  // },
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    // globals.forEach(([name, Comp]) => {
    //   app.component(name, Comp)
    // })
    app.component('Demo', VPDemo)
    app.component('WhaleTeam', WhaleTeam)
    app.use(NProgress)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // app.mixin({
    //   mounted() {
    //     NProgress.start()
    //   },
    //   updated() {
    //     NProgress.done()
    //   },
    // })
  },
}
