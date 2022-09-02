<template>
  <div
    class="inline-flex w-20px aspect-ratio-square relative"
    :class="[发光显示条件 && 'shadow_wrapper', data.value === 'huoshan' && 'mb-2px']"
    :style="{
      background: `url(${当前图片Url}) no-repeat center center`,
      backgroundSize: `${图片大小}px auto`,
    }"
    alt=""
  ></div>
</template>

<script setup lang="ts">
import { 获取当前 } from '@/utils/getEnv'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  current: {
    type: String,
    default: '',
  },
})
const 发光显示条件 = computed(() => {
  return props.current === props.data.value && 获取当前('主题') === 'dark'
})
const 当前api的value = props.data.value
const 当前图片Url = computed(() => {
  const 所有文件对象: any = import.meta.glob('@imgs/api图标/*', { eager: true })
  const 文件名arr = Object.keys(所有文件对象)
  const 当前图片在对象中的key = 文件名arr.find(key => key.includes(当前api的value)) || ''
  return 所有文件对象?.[当前图片在对象中的key]?.default || ''
})

const 图片尺寸映射 = new Map([
  ['google', 16],
  ['baidu', 16],
  ['huoshan', 15],
  ['youdao', 18],
])

const 图片大小 = computed(() => {
  return 图片尺寸映射.get(当前api的value) || 17
})
</script>

<style lang="scss" scoped>
.shadow_wrapper {
  &::after {
    content: '';
    @apply absolute bottom-5% left-0 w-full h-full scale-85 -z-1;
    background: inherit;
    background-size: 100% 100%;
    will-change: filter;
    filter: blur(7px) contrast(160%) opacity(0.8);
  }
}
</style>
