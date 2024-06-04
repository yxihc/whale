import './style.css'
import DefaultTheme from 'vitepress/theme'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import WhaleTeam from './components/WhaleTeam.vue'
import type { Theme } from 'vitepress'

export default <Theme>{
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('WhaleTeam', WhaleTeam)
    app.use(NProgress)
    app.component('DemoPreview', ElementPlusContainer)
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
