/** 复制相关业务 */
import { storeToRefs } from 'pinia'
import { throttle } from 'lodash-es'
import { 延迟关闭utools, 粘贴 } from '@MainView/useUtools'
import { Message as 提示 } from '@arco-design/web-vue'
import { 用户设置存储 } from '@/store/userSetting'
const { copy: 复制 } = useClipboard() // 复制结果功能
const utools = window?.utools

const 要复制的文字 = ref('')
// 是否应该显示复制按钮
const 要显示复制按钮 = computed(() => {
  return 要复制的文字.value?.trim()
  // && 结果对象.状态码 === 200
  // TODO:处理这里
})
async function 仅复制() {
  if (!要显示复制按钮.value) {
    return
  }
  await 复制(要复制的文字.value)
  提示.success({ content: '复制成功', duration: 2500 })
}

async function 复制并隐藏() {
  await 仅复制()
  await 延迟关闭utools()
}

async function 复制并输入() {
  await 复制并隐藏()
  await 粘贴()
}

const 复制按钮事件 = throttle((val = 1) => {
  switch (val) {
    case 1:
      仅复制()
      break
    case 2:
      复制并隐藏()
      break
    case 3:
      复制并输入()
      break
  }
}, 300)

const 快捷键复制 = throttle(async () => {
  await 仅复制()
  if (!utools) {
    return
  }
  const { copyBtnBehavior: 复制按钮行为 } = storeToRefs(用户设置存储())
  const 行为 = 复制按钮行为.value
  if (行为 === 'close') {
    await 延迟关闭utools()
  } else if (行为 === 'closeInput') {
    await 延迟关闭utools()
    await 粘贴()
  }
}, 300)

/**
 *
 * @param type 需要点击的为’手动‘快捷键为’快捷键‘
 * @param str 要复制的文字
 * @param val ’手动‘才会有的值
 */
export function 复制主函数(type: '手动' | '快捷键', str: string, val?: number) {
  // 所有复制都走这个函数，保证“要复制的文字”有值
  要复制的文字.value = str
  if (type === '手动') {
    复制按钮事件(val)
  } else if (type === '快捷键') {
    快捷键复制()
  }
}
