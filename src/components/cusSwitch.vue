<template>
  <input
    id="switch"
    class="cus_switch transition-all"
    type="checkbox"
    :checked="props.modelValue"
    @input="changeVal($event)"
  />
  <label class="cus_switch_label bg-gray dark:bg-#3c3c3f" for="switch"> 切换 </label>
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
  width: 0;
  height: 0;
  visibility: hidden;
  user-select: none;
  &:checked {
    & + .cus_switch_label {
      background-color: var(--primary-color);
      &:after {
        left: calc(100% - 4px);
        transform: translate(-100%, -50%);
      }
    }
  }
}

.cus_switch_label {
  cursor: pointer;
  text-indent: 9999px;
  overflow: hidden;
  width: 40px;
  height: 24px;
  display: block;
  border-radius: 9999px;
  position: relative;
  user-select: none;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 4px;
    height: 70%;
    aspect-ratio: 1/1;
    background-color: #fff;
    border-radius: 9999px;
    transition: all 0.15s ease;
  }
  // 点击时的样式
  // &:active:after {
  //   aspect-ratio: 4/3;
  // }
}
</style>
