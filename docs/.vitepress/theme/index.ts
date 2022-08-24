import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hljs from 'highlight.js'
// import 'highlight.js/styles/color-brewer.css'

// 代码风格
import './styles/codetheme.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import WhaleTeam from './components/WhaleTeam.vue'
import VPDemo from './components/vp-demo.vue'

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

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // 'home-features-after': () => h(HomeSponsors),
      // 'aside-ads-before': () => h(AsideSponsors)
    })
  },
  enhanceApp({ app }) {
    app.component('WhaleTeam', WhaleTeam)
    app.component('Demo', VPDemo)
    app.use(ElementPlus)

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.directive('highlight', (el) => {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    })
  },
}
