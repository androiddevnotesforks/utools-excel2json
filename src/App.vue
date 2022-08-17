<template>
  <MainView />
</template>

<script setup lang="ts">
import MainView from '@/views/MainView.vue'
import '@/utils/setTheme'

// 虽然深色浅色的主题色一致，但是Arco主题色设置过后，深色模式下会对主题色进行一个偏移，这里强制指定深色下主题色的颜色值
import { primaryColor } from '@/config/colorConfig'
import { hex转rgb } from '@/utils/toolsFn'
import { useGlobalStore } from '@/store/globalData'
const globalStore = useGlobalStore()
const { currentTheme } = storeToRefs(globalStore)
const cssStr = ref('')
const darkStyleStr = `body[arco-theme='dark'] {--arcoblue-6: ${hex转rgb(primaryColor)};}`
const { css } = useStyleTag(cssStr)

// 此处不用load和unload处理，而是直接动态改变<style>中的内容
// 因为css内容不多
watchEffect(() => {
  css.value = currentTheme.value === 'light' ? '' : darkStyleStr
})
</script>
