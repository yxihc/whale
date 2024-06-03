<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="dynamicComponent" :demo="dynamicComponent" />
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip :content="locale['copy-code']" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="copyCode">
            <CopyDocument />
          </ElIcon>
        </ElTooltip>
        <ElTooltip :content="locale['view-source']" :show-arrow="false">
          <ElIcon :size="16" @click="toggleSourceVisible()">
            <i-ri-code-line />
          </ElIcon>
          <!--          <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">-->
          <!--            <Filter />-->
          <!--          </ElIcon>-->
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          @click="toggleSourceVisible(false)"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ locale['hide-source'] }}</span>
        </div>
      </Transition>
    </div>
    <textarea id="inputCopy" style="width: 1px; height: 1px" />
  </ClientOnly>
</template>

<script setup type="ts">
import { onMounted, ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

// const source = fs.readFileSync(
//   `../../../examples/${props.path}`,
//   'utf-8',
// )


const dynamicComponent = ref('')
const decodedDescription = ref('')
const locale = {
  'view-source': '查看源代码',
  'hide-source': '隐藏源代码',
  'edit-in-editor': 'Edit in Playground',
  'edit-on-github': 'Edit on GitHub',
  'edit-in-codepen': 'Edit in Codepen.io',
  'copy-code': '复制代码',
  'switch-button-option-text': 'Switch to Options API',
  'switch-button-setup-text': 'Switch to Composition API',
  'copy-success': 'Copied!',
  'copy-error': 'This browser does not support automatic copy！'
}
const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const [sourceVisible, toggleSourceVisible] = useToggle()
// const vm = getCurrentInstance()
const copyCode = async () => {
  const input = document.querySelector('#inputCopy')
  input.value = source.value
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    ElMessage({
      message: '代码复制成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '代码复制成功',
      type: 'success'
    })
  }
}

const source = ref('')
onMounted(() => {
  /* @vite-ignore */
  import(`../../../examples/${props.path}`).then((module) => {
    dynamicComponent.value = module.default
  })
  decodedDescription.value = decodeURIComponent(props.description)
  getSourceCode()
})


async function getSourceCode() {

  // dynamicComponent.value = await import(`../../../examples/${props.path}`).default

  const isDev = import.meta.env.MODE === 'development'
  if (isDev) {
    source.value = (
      await import(
        /* @vite-ignore */ `../../../examples/${props.path}?raw`
        )
    ).default
  } else {
    source.value = await fetch(
      `../../../examples/${props.path}`
    ).then((res) => res.text())
  }
}
</script>

<style scoped lang="scss">
.example {
  border: 1px solid #dcdfe6;
  border-radius: 5px;

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
