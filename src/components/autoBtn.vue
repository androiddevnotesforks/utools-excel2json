<template>
  <cus-tooltip>
    <template #content>
      <p>智能切换语种「{{ props.modelValue ? '开' : '关' }}」</p>
    </template>
    <button class="btn_wrapper">
      <i
        i-simple-icons-adobeillustrator
        class="text-19px rounded-2px overflow-hidden transition-all !duration-100"
        :class="[props.modelValue ? 'active_auto_btn' : 'disabled_auto_btn']"
      />
    </button>
  </cus-tooltip>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
</script>

<style lang="scss" scoped>
.btn_wrapper {
  @apply select-none w-32px grid-c cursor-pointer rounded-t-4px transition-all overflow-hidden aspect-ratio-square hover:(bg-#f2f3f5 dark:bg-#3d3d3d);
}
</style>
