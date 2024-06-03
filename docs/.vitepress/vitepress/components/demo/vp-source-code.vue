<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Prism from 'prismjs'
import { highlight } from '../../../utils/highlight'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})
const decoded = computed(() => {
  return highlight(props.source, 'vue')
})
onMounted(() => {
  Prism.highlightAll() // 切换更新内容则重新调用这个方法
})
</script>

<template>
  <div class="example-source-wrapper">
    <!--    <pre><code class="language-js line-numbers">{{ source }}</code></pre>-->
    <div class="example-source language-vue" v-html="decoded" />
    <!--    <pre-->
    <!--      v-highlight-->
    <!--    ><code class="language-html language-vue" style="background-color: #f5f7fa;font-size: 13px">{{ source-->
    <!--      }}</code></pre>-->
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
</style>
