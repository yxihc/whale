<script lang="ts" setup>
import { formProps } from './form';
defineOptions({
  name: 'WlErmForm',
});
const props = defineProps(formProps);
</script>
<template>
  <div id="test">{{ props.title }}</div>
</template>
