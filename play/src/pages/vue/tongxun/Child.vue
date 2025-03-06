<script setup lang="ts">
import { toRef, defineModel, inject } from 'vue'

const props = defineProps({
  data: {
    type: Number,
  },
})

// const show = defineEmits('show')
const show = defineModel()

const data = toRef(props, 'data')
console.log(props.data)

const detail = inject('detail')


</script>

<template>
  <div class="card">



    <div>这是父组件传过来的数据：{{ data }}</div>
    <button @click.stop="data = 12">修改data(无法修改)</button>

    <div>v-model数据：{{ show }}</div>
    <button @click.stop="show = !show">修改show</button>

    <div>provide数据：{{ detail }}</div>
    <button @click.stop="detail = 'sadasdsad'">provide数据</button>

  </div>
</template>

<style scoped>
.card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  overflow: hidden;
  padding: 20px;
}
</style>
