
<template>
  
  <!-- 使用unoCSS -->
  <button 
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
  >
    Button 使用unoCSS
  </button>

  <br>
  <a-button type="primary" @click="addCout">coutnt++</a-button>
  <h5>{{ 'count:'+count }}</h5>
</template>

<script lang="ts" setup>
import { reactive,ref } from "vue";
const name = reactive({a:1})
const count = ref(0)
const addCout = ()=> count.value ++

</script>

<style scoped lang="scss">
</style>