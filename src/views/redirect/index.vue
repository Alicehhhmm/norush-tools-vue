<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router';
  // 重定向路由过渡页,实现平滑的页面切换效果
  const router = useRouter();
  const route = useRoute();

  const gotoPath = route.params.path as string;
  // 使用router.replace方法可以避免将新的路由添加到历史记录栈中，而直接替换当前的路由记录。当用户返回上一页时，不会再回到过渡页，而是直接回到上一页的前一个页面。
  router.replace({ path: gotoPath });
</script>

