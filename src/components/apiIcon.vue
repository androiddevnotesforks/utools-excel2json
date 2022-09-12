<template>
  <div
    class="inline-flex w-20px aspect-ratio-square relative"
    :class="[发光显示条件 && 'shadow_wrapper', api的值 === 'huoshan' && 'mb-2px']"
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
    type: [Object, String],
    required: true,
  },
  current: {
    type: String,
    default: '',
  },
})

const api的值 = computed(() => {
  if (typeof props.data === 'string') {
    return props.data
  } else {
    return props.data.value
  }
})

const 发光显示条件 = computed(() => {
  return props.current === api的值.value && 获取当前('主题') === 'dark'
})

const 当前图片Url = computed(() => {
  const 所有文件对象: any = import.meta.glob('@imgs/api图标/*', { eager: true })
  const 文件名arr = Object.keys(所有文件对象)
  const 当前图片在对象中的key = 文件名arr.find(key => key.includes(api的值.value)) || ''
  return 所有文件对象?.[当前图片在对象中的key]?.default || ''
})

const 图片尺寸映射 = new Map([
  ['google', 16],
  ['baidu', 16],
  ['huoshan', 15],
])

const 图片大小 = computed(() => {
  return 图片尺寸映射.get(api的值.value) || 17
})
</script>

<style lang="scss" scoped>
.shadow_wrapper {
  &::after {
    content: '';
    position: absolute;
    bottom: 5%;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0.85);
    z-index: -1;
    background: inherit;
    background-size: 100% 100%;
    will-change: filter;
    filter: blur(7px) contrast(160%) opacity(0.8);
  }
}
</style>
