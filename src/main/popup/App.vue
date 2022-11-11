<template>
  <n-config-provider :theme="darkTheme">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { defineComponent, h, resolveComponent } from 'vue'
const routerView = defineComponent({
  render: () => h(resolveComponent('router-view')),
})
const component = defineComponent({
  render: () => h(resolveComponent('component')),
})
</script>
<style lang="scss" scoped></style>
