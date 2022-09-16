/** 快捷键 */
import { cloneDeep } from 'lodash-es'
import { 获取当前 } from '@/utils/getEnv'
import type { 系统类型 } from '@/types/index'
interface 快捷键方法Type {
  语音朗读快捷键方法?: Function
  复制快捷键方法?: Function
}

type 快捷键映射类型 = {
  [key in 'macOS' | 'other']: {
    readonly 复制: string[]
    readonly 朗读: string[]
  }
}
const { current } = useMagicKeys()
const 快捷键集合: 快捷键映射类型 = {
  other: {
    复制: ['control', 'shift', 'x'].sort(),
    朗读: ['control', 'shift', 's'].sort(),
  },
  macOS: {
    复制: ['meta', 'shift', 'c'].sort(),
    朗读: ['meta', 'shift', 's'].sort(),
  },
}
export const 当前按下的所有键 = computed(() => {
  return Array.from(current)
})

/**
 * 检查按下快捷键与该系统下所有快捷键定义的长度
 * @param os 系统
 * @returns 当前按下的快捷键个数，与当前系统下的所有定义的快捷键，是否有长度一样的
 */
function 检查按下快捷键与定义的长度(os: 系统类型) {
  const obj = os === 'macOS' ? 快捷键集合.macOS : 快捷键集合.other
  const 当前系统全部快捷键arr: string[][] = Object.values(obj)
  const 当前系统下所有快捷键长度arr = 当前系统全部快捷键arr.map(item => item.length)
  const 按下的按键个数 = 当前按下的所有键.value.length
  return 当前系统下所有快捷键长度arr.includes(按下的按键个数)
}

function 判断按键(fn: 快捷键方法Type, os: 系统类型) {
  const 按键合规 = 检查按下快捷键与定义的长度(os)
  if (!按键合规) {
    return
  }
  const mac快捷键条件 = os === 'macOS' && 按键合规
  const 其他快捷键条件 = os !== 'macOS' && 按键合规
  const 排序后按下的键str = cloneDeep(当前按下的所有键.value).sort().join()

  if (mac快捷键条件) {
    const macMap = new Map([
      [快捷键集合.macOS.复制.join(), fn.复制快捷键方法],
      [快捷键集合.macOS.朗读.join(), fn.语音朗读快捷键方法],
    ])
    macMap.get(排序后按下的键str)?.()
  } else if (其他快捷键条件) {
    const otherMap = new Map([
      [快捷键集合.other.复制.join(), fn.复制快捷键方法],
      [快捷键集合.other.朗读.join(), fn.语音朗读快捷键方法],
    ])
    otherMap.get(排序后按下的键str)?.()
  }
}

export function use快捷键监听(funObj: 快捷键方法Type) {
  watchEffect(() => {
    const 系统 = 获取当前('系统') as 系统类型
    判断按键(funObj, 系统)
  })
}
