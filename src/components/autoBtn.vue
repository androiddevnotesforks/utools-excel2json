<template>
  <a-tooltip
    content=""
    position="top"
    mini
    :background-color="currentTheme === 'light' ? '#333' : '#555'"
  >
    <template #content>
      <p>智能切换语种「{{ props.modelValue ? '开' : '关' }}」</p>
    </template>
    <div class="btn_wrapper">
      <i
        i-simple-icons-adobeillustrator
        class="text-19px rounded-2px overflow-hidden"
        :class="[props.modelValue ? 'active_auto_btn' : 'disabled_auto_btn']"
      />
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/globalData'
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
const globalStore = useGlobalStore()
const { currentTheme } = storeToRefs(globalStore)
</script>

<style lang="scss" scoped>
.btn_wrapper {
  @apply select-none w-32px grid-c cursor-pointer rounded-t-4px transition-all overflow-hidden aspect-ratio-square hover:(bg-[#f2f3f5] dark:bg-[#3d3d3d]);
}
</style>
