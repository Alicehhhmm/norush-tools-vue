
<script setup>

</script>

<template>
  <a-space>
    <a-button type="primary" size="mini">Mini</a-button>
    <a-button type="primary" size="small">Small</a-button>
    <a-button type="primary">Medium</a-button>
    <a-button type="primary" size="large">Large</a-button>
  </a-space>

  <!-- 不使用import直接使用组件测试 -->
  <HelloWorld />
  <Layout />

  <!-- 使用unoCSS -->
  <button 
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
  >
    Button
  </button>
</template>
