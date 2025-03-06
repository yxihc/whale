<template>
  <div>
    <h1>导航菜单</h1>
    <ul>
      <li v-for="(item, index) in hierarchicalRoutes" :key="index">
        <span>{{ item.title }}</span>
        <ul v-if="item.children && item.children.length">
          <li v-for="child in item.children" :key="child.path">
            <button @click="goToRoute(child.path)">
              {{ child.title  }}({{child.path}})
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

// 获取所有非隐藏的路由 (假设你想过滤掉某些路由)
const flatRoutes = computed(() => {
  return router.getRoutes().filter(r => !r.meta || !r.meta.hidden);
});

// 构建层级结构
const buildHierarchy = (routes) => {
  const hierarchy = {};

  routes.forEach(route => {
    const pathParts = route.path.split('/').filter(part => part); // 去除空字符串
    let currentLevel = hierarchy;

    pathParts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = index === pathParts.length - 1 ?
          { title: route.meta?.title || part, path: route.path } :
          { title: part, children: {} };
      }

      if (index !== pathParts.length - 1) {
        currentLevel = currentLevel[part].children;
      }
    });
  });

  return hierarchy;
};

const hierarchicalRoutes = computed(() => {
  const hierarchy = buildHierarchy(flatRoutes.value);

  // 将对象转换为数组以便于渲染
  function objectToArray(obj) {
    return Object.keys(obj).map(key => ({
      ...obj[key],
      children: obj[key].children ? objectToArray(obj[key].children) : undefined
    }));
  }

  return objectToArray(hierarchy);
});

function goToRoute(path) {
  router.push(path);
}
</script>

<style scoped>
/* Add your styles here */
</style>
