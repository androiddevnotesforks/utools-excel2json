<template>
  <a-tooltip
    attrs
    mini
    :background-color="获取当前('主题') === 'light' ? '#333' : '#555'"
  >
    <template #content>
      <slot name="content"></slot>
    </template>
    <slot></slot>
  </a-tooltip>
</template>

<script setup>
import { 获取当前 } from '@/components/SettingModal/SettingsUtils'
const attrs = useAttrs()
</script>

<style lang="scss" scoped></style>
