<template>
  <img class="inline-flex" :width="图片大小" :src="当前图片Url" alt="" />
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
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

<style lang="scss" scoped></style>
