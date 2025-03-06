<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import WlDialog from '../src/components/wl-dialog/src/wlDialog'
WlDialog.alert('asds')
// import { ElMessage, ElMessageBox } from 'element-plus'
// ElMessageBox.alert('hello world', 'title', {
//   confirmButtonText: '确定',
//   callback: action => {
//     ElMessage({
//       type: 'info',
//       message: `action: ${action}`
//     })
//   }
// })
</script>

<style scoped></style>
