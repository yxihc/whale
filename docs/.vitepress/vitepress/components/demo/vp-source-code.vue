<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" />

    <pre
      v-highlight
    ><code class="language-html" style="background-color: #f5f7fa;font-size: 13px">{{ source }}</code></pre>
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
</style>
