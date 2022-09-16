/** 快捷键 */
import { cloneDeep } from 'lodash-es'
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
 * 将当前按下按键的个数，与该系统下所有快捷键长度进行对比
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

export function 判断快捷键(fn: 快捷键方法Type, os: 系统类型) {
  const 按键合规 = 检查按下快捷键与定义的长度(os)
  // 首先判断当前按下的按键个数，在对应的系统里有没有定义一样长度的快捷键
  if (!按键合规) {
    return
  }
  // 创建互斥变量用于区分mac与非mac
  const 是macOS = os === 'macOS'
  const mac快捷键条件 = 是macOS && 按键合规
  const 其他快捷键条件 = !是macOS && 按键合规
  // 将当前按下的所有按键，转换为字符串
  const 排序后按下的键str = cloneDeep(当前按下的所有键.value).sort().join()
  // 根据系统，创建该系统下的所有快捷键字符串与方法的映射，并尝试执行该方法
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
