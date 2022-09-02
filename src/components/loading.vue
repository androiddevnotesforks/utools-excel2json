<template>
  <div
    bg="#fff dark:#272728"
    class="flex-c flex-col w-full h-full dark:(border-transparent)"
  >
    <LoadingIcon03 />
    <p class="mt-20px text-16px text-gray-500">{{ loadingText }}</p>
  </div>
</template>

<script setup lang="ts">
const { counter: duration } = useInterval(1000, { controls: true })

const loadingText = computed<string>(() => {
  const time = duration.value
  if (time > 13) {
    return '我还在努力，但是你可以检查一下网络连接是否正常'
  } else if (time > 9) {
    return '马上就翻译出来了！'
  } else if (time > 6) {
    return '网络稍微有点慢，请再等一下吧~'
  } else if (time > 3) {
    return '正在努力翻译~'
  } else {
    return '翻译中...'
  }
})
</script>

<style lang="scss" scoped></style>
