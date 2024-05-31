// import VPApp, { NotFound, globals } from '../vitepress'
// import 'uno.css'
import './style.css'
import { h } from 'vue'
import theme from 'vitepress/theme'
import DefaultTheme from 'vitepress/theme'
import NProgress from 'nprogress'
import type { Theme } from 'vitepress'
import 'nprogress/nprogress.css'
import VPDemo from './../vitepress/components/vp-demo.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

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
    app.use(NProgress)
    app.use(ElementPlus)
    app.mixin({
      mounted() {
        NProgress.start()
      },
      updated() {
        NProgress.done()
      },
    })
  },
}
