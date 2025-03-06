<script setup lang="ts">
import Child from './Child.vue'
import { provide, ref } from 'vue'

const data = ref(0)
const show = ref(false)
const detail = ref('ccccccc')
provide('detail', detail)
</script>

<template>
  <div>
    <div>data:{{ data }}</div>
    <div>show:{{ show }}</div>
    <div>provide:{{ detail }}</div>
    <child :data="data" v-model="show"></child>
    <button @click="data++">+</button>
    <button @click="show = !show">v-model修改</button>
  </div>
</template>

<style scoped></style>
