
<script setup>
const name = reactive('alice')
const count = ref(0)
const addCout = ()=> count.value ++

</script>

<template>
  <div class="bg-red">hello {{ name }}, this is helloworld components</div>

  <br>
  <el-button type="primary" @click="addCout">coutnt++</el-button>
  <h5>{{ 'count:'+count }}</h5>
</template>

<style scoped lang="scss">
</style>