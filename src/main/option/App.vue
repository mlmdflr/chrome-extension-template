<template>
  <div id="app">
    <h3>{{ msg }}</h3>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('hello AFT')
</script>
<style lang="scss" scoped>
.chrome_container {
  width: 300px;
  background-color: white;
}
</style>
