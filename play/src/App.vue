<script setup type="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import WlErmForm  from "@whale/components/erm-form";
import { onMounted, ref } from 'vue'
import Prism from 'prismjs';
import HelloWorld from "./components/HelloWorld.vue";

const codes = ref(`
 height: 6em;
`)

onMounted(() => {
  Prism.highlightAll(); // 切换更新内容则重新调用这个方法
});
</script>

<template>
  <div>
    <pre><code class="language-js line-numbers">{{ codes }}</code></pre>

    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <wl-erm-form title="测试" />
  <!--  <erm-form :title="c测试" />-->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
