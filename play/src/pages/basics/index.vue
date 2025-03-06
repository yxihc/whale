<template>
  <div>
    测试
    <div>{{ loading }}</div>
    <div>{{ data }}</div>
    <div>{{ params }}</div>
    <button @click="debounceFn">防抖</button>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus'

const debounceFn = debounce(
  () => {
    console.log('debounce')
  },
  1000,
  true
)

function debounce(fn: Function, delay: number, immediate: boolean = false) {
  let timer: any = null

  let isInvoke = false //记录立即执行是否已执行过

  const _debounce = function (...args: any[]) {
    if (timer) clearTimeout(timer)

    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        //没有这个步骤时，只有第一次输入是立即执行，即使后面延迟执行后再输入也是延迟执行；
        // 有这个步骤时，第一次输入时立即执行，后面延迟执行后再输入也会有立即执行
        isInvoke = false
        timer = null
      }, delay)
    }
  }

  return _debounce
}

const { loading, data, params } = useRequest(getList)

function getList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: 'success',
      })
    }, 1000)
  })
}
</script>

<style scoped></style>
