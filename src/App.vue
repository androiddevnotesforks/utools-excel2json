<template>
  <MainView />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MainView from '@MainView/index.vue'
import { primaryColor } from '@/config/colorConfig'
import { setTheme } from '@/utils/setTheme'
import { hex转rgb } from '@/utils/toolsFn'
import { 获取当前 } from '@/utils/getEnv'
import { 用户设置存储 } from '@/store/userSetting'
import '@MainView/useExit.ts'
const cssStr = ref('')
const darkStyleStr = `body[arco-theme='dark'] {--arcoblue-6: ${hex转rgb(primaryColor)};}`
const { css } = useStyleTag(cssStr)
// 虽然深色浅色的主题色一致，但是Arco主题色设置过后，深色模式下会对主题色进行一个偏移，这里强制指定深色下主题色的颜色值
// 此处不用load和unload处理，而是直接动态改变<style>中的内容
// 因为css内容不多
watchEffect(() => {
  css.value = 获取当前('主题') === 'light' ? '' : darkStyleStr
})

watchEffect(() => {
  const { theme: 主题色 } = storeToRefs(用户设置存储())
  const 系统颜色 = usePreferredColorScheme()
  const theme = 主题色.value === 'auto' ? 系统颜色.value : 主题色.value
  setTheme(theme)
})
</script>
