<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  // return decodeURIComponent(props.source)
  return props.source
})
</script>

<template>
  <div class="example-source-wrapper">
    <!--    <highlightjs language="js" code="console.log('Hello World');" />-->
    <pre
      v-highlight
    ><code class="language-html" style="background-color: #f5f7fa;font-size: 13px">{{ decoded }}</code></pre>
  </div>
</template>

<style scoped>
.language-vue {
  margin: 0;
  border-radius: 0;
}
</style>
