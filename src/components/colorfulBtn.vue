<template>
  <button
    ref="btnRef"
    ripple="ripple"
    border="~ #eee"
    shadow="lg hover:md active:sm dark:#181818"
    text="#333 dark:#ddd"
    bg="#fff dark:#222"
    class="colorful_btn_main flex-c transition-all duration-200 w-112px h-34px relative overflow-hidden rounded-4px dark:(text-shadow-xl)"
    @mousedown="显示波纹($event)"
    @mouseup="清除波纹()"
  >
    <div class="relative z-20 flex-c space-x-8px">
      <slot name="icon">
        <i :class="props.iconName" class="text-19px"></i>
      </slot>
      <div class="leading-none flex-c">
        <slot></slot>
      </div>
    </div>
    <div class="ripple_wrapper absolute top-0 right-0 bottom-0 left-0">
      <span
        v-for="item in 波纹数组"
        :key="item.key"
        dynamic="true"
        :style="{
          top: `${item.top}px`,
          left: `${item.left}px`,
          width: `${item.width}px`,
          height: `${item.height}px`,
        }"
      ></span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { delay } from 'lodash-es'
import { nanoid } from 'nanoid'
const props = defineProps({
  iconName: {
    type: String,
    default: 'i-ep-more-filled',
  },
})
const btnRef = ref() // 按钮的DOM

const 波纹数组 = ref<波纹数组Item[]>([]) // 波纹DOM数组
interface 波纹数组Item {
  key: string
  top: number
  left: number
  width: number
  height: number
}
// 生成波纹DOM
function 显示波纹(e: MouseEvent) {
  const 按钮Dom = btnRef.value
  const 按钮宽度 = 按钮Dom.offsetWidth
  const 按钮位置 = 按钮Dom.getBoundingClientRect()
  const obj: 波纹数组Item = {
    left: e.pageX - 按钮位置.left - 按钮宽度 / 2,
    top: e.pageY - 按钮位置.top - 按钮宽度 / 2,
    width: 按钮宽度,
    height: 按钮宽度,
    key: nanoid(),
  }
  波纹数组.value.push(obj)
}

// 鼠标抬起时，清除波纹
function 清除波纹(delayTime = 1100) {
  delay(() => 删除第一个波纹dom(), delayTime)
}

// 清除第一个波纹
function 删除第一个波纹dom() {
  波纹数组.value?.length && 波纹数组.value.shift()
}
</script>

<style lang="scss" scoped>
.colorful_btn_main {
  .ripple_wrapper {
    span[dynamic='true'] {
      transform: scale(0);
      border-radius: 50%;
      position: absolute;
      background: linear-gradient(45deg, #ff000080, #ffff0080, #00ffff80, #0000ff80);
      animation: ripple 1200ms ease;
    }
  }
}

@keyframes ripple {
  from {
    opacity: 0.5;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(2.5);
  }
}
</style>
