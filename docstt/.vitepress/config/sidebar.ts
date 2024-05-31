import coder from './coder'
import component from './component'
import guide from './guide'

export const sidebar = {
  [component.path]: component.mdList,
  [guide.path]: guide.mdList,
  [coder.path]: coder.mdList,
}
