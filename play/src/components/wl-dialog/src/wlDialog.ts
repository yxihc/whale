import wlDialog from './index.vue'
import { createVNode, render } from 'vue'

function getContainer() {
  // 创建容器
  const container = document.createElement('div')
  return container
}
function alert(message: string) {
  // 创建容器
  const container = getContainer()
  // 创建虚拟节点
  const vnode = createVNode(wlDialog)
  // 渲染到DOM
  render(vnode, container)
  // 将容器添加到body
  document.body.appendChild(container)
}
const WlDialog = {
  alert,
}
export default WlDialog
