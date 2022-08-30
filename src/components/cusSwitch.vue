<template>
  <input
    id="switch"
    class="cus_switch"
    type="checkbox"
    :checked="props.modelValue"
    @input="changeVal($event)"
  />
  <label class="cus_switch_label" for="switch"> 切换 </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
const emit = defineEmits(['update:modelValue'])

function changeVal(e: any) {
  emit('update:modelValue', e.target.checked)
}
</script>

<style lang="scss" scoped>
.cus_switch {
  @apply h-0 w-0 invisible select-none transition-all;
  &:checked {
    & + .cus_switch_label {
      @apply bg-primary;
      &:after {
        left: calc(100% - 4px);
        transform: translate(-100%, -50%);
      }
    }
  }
}

.cus_switch_label {
  @apply cursor-pointer -indent-999 w-40px h-24px block rounded-full relative
    bg-gray select-none dark:bg-#3c3c3f;
  &::after {
    content: '';
    @apply absolute-y-center left-4px h-70% aspect-ratio-square bg-white rounded-full
      transition-all;
  }
  // 点击时的样式
  // &:active:after {
  //   aspect-ratio: 4/3;
  // }
}
</style>
