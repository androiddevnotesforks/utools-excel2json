<template>
  <button
    border="~ #f2f3f4"
    :disabled="props.loading || props.disabled"
    class="mimicry_btn"
    :class="{ mimicry_btn_disabled: props.loading || props.disabled }"
  >
    <span class="text_inner">
      <i v-if="props.loading" i-line-md-loading-loop />

      <slot v-else>
        <i i-ep-more-filled />
      </slot>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean
  }
})
// 按钮点击放大的倍率
const 放大倍率 = ref(1.2)

// 按钮放大，文字同步缩小为14的倍率
const 缩小后的尺寸 = computed(() => {
  const after = (放大倍率.value * 14).toFixed(3)
  return (14 / after).toFixed(3)
})
</script>

<style lang="scss" scoped>
@property --houdini-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

@property --houdini-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

.mimicry_btn {
  background-image: linear-gradient(
    145deg,
    var(--houdini-colorA) 0%,
    var(--houdini-colorB) 100%
  );
  box-shadow: 5px 5px 12px #d9d9d9, -5px -5px 12px #fff;
  transition: 0.3s --houdini-colorA, 0.3s --houdini-colorB,
    0.1s transform linear, 0.2s box-shadow;
  .text_inner {
    @apply leading-0 transition-all duration-100 ease-linear;
  }
  &:hover,
  &:active {
    --houdini-colorA: #eee;
    --houdini-colorB: #fff;
  }
  &:active {
    box-shadow: 2px 2px 7px -2px #888, -5px -5px 12px #fff;
    transform: scale(v-bind(放大倍率));
    .text_inner {
      transform: scale(v-bind(缩小后的尺寸));
    }
  }
  @apply p-4px z-10 grid-c rounded-8px cursor-pointer text-slate-4 select-none;
}

// 禁用的样式
.mimicry_btn_disabled {
  @apply cursor-not-allowed;
  &:hover,
  &:active {
    --houdini-colorA: #fff;
    --houdini-colorB: #fff;
  }
  &:active {
    box-shadow: 5px 5px 12px #d9d9d9, -5px -5px 12px #fff;
    @apply scale-100;
    .text_inner {
      @apply scale-100;
    }
  }
}
</style>
