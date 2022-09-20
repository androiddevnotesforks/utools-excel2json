/** 复制相关业务 */
import { storeToRefs } from 'pinia'
import { throttle } from 'lodash-es'
import { 延迟关闭utools, 粘贴 } from '@MainView/useUtools'
import { Message as 提示 } from '@arco-design/web-vue'
import { 用户设置存储 } from '@/store/userSetting'
import { useGlobalStore } from '@/store/globalData'
const { copy: 复制 } = useClipboard() // 复制结果功能

const 要复制的文字 = ref('')

const 要显示复制按钮 = computed(() => {
  const { 当前翻译状态码 } = storeToRefs(useGlobalStore())
  return 要复制的文字.value?.trim() && 当前翻译状态码.value === 200
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
  const m = new Map([
    [1, 仅复制],
    [2, 复制并隐藏],
    [3, 复制并输入],
  ])
  m.get(val)?.()
}, 300)

/**
 * 复制的主函数
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
    const m = new Map([
      ['open', 1],
      ['close', 2],
      ['closeInput', 3],
    ])
    const { copyBtnBehavior: 复制按钮行为 } = storeToRefs(用户设置存储())
    const value = m.get(复制按钮行为.value) || 1
    复制按钮事件(value)
  }
}
