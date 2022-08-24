<template>
  <div id="test">{{ props.title }}</div>
</template>
<script lang="ts" setup>
import { formProps } from './form.ts'
// 组件注册名字 借助插件 unplugin-vue-define-options
// 通过这个插件就可以在 Vue 的 <script setup> 中使用 Options API 。
// 需要定义组件 name 属性，这个就可以避免两个 script 标签了。
// 这样写等价于
// <script>export default { name: "WlErmForm", };<script>
defineOptions({
  name: 'WlErmForm',
})

const props = defineProps(formProps)
</script>
