// import VPApp, { NotFound, globals } from '../vitepress'
// import 'uno.css'
import './style.css'
import { h } from 'vue'
import theme from 'vitepress/theme'
import DefaultTheme from 'vitepress/theme'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementPlus from 'element-plus'
import hljs from 'highlight.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VPDemo from './../vitepress/components/vp-demo.vue'
import 'element-plus/dist/index.css'
import ReadTest from './../vitepress/components/ReadTest.vue'

// 如果您正在使用CDN引入，请删除下面一行。
import type { Theme } from 'vitepress'

hljs.configure({
  ignoreUnescapedHTML: true,
  languages: [
    'javascript',
    'css',
    'python',
    'html',
    'bash',
    'java',
    'sql',
    'json',
    'http',
    'go',
    'c++',
    'c#',
    '',
  ],
})

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
    app.component('ReadTest', ReadTest)
    app.use(NProgress)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.mixin({
      mounted() {
        NProgress.start()
      },
      updated() {
        NProgress.done()
      },
    })

    app.directive('highlight', (el) => {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    })
  },
}
