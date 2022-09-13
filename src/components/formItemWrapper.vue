<template>
  <section :class="动态宽度类名">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/components/SettingModal/SettingsModules'
const 全局存储 = useGlobalStore()
const 侧边收起 = computed(() => 全局存储.侧边收起)
const 动态宽度类名 = computed(() => {
  return 侧边收起.value ? 'w-80%' : 'w-full'
})
</script>

<style lang="scss" scoped></style>
