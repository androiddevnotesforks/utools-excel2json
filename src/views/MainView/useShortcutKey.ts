/** 快捷键 */
import { isEqual } from 'lodash-es'
import { 获取当前 } from '@/utils/getEnv'

interface 快捷键方法Type {
  语音朗读快捷键方法?: Function
  复制快捷键方法?: Function
}

interface 快捷键映射类型 {
  [key: string]: {
    readonly 复制: string[]
    readonly 朗读: string[]
  }
}
const { current } = useMagicKeys()

const 当前按下的所有键 = computed(() => {
  return Array.from(current)
})

const 快捷键集合: 快捷键映射类型 = {
  windows和linux: {
    复制: ['control', 'shift', 'x'],
    朗读: ['control', 'shift', 's'],
  },
  mac: {
    复制: ['command', 'shift', 'c'],
    朗读: ['command', 'shift', 's'],
  },
}

/**
 * @param 定义的快捷键arr 要按什么组合键
 * @returns  是否是当前按下的快捷键
 */
function 按下了定义的快捷键(定义的快捷键arr: string[]) {
  // 全都执行相同的排序算法再判断是否相等,防止顺序不一致导致的不相等
  return isEqual(定义的快捷键arr.sort(), 当前按下的所有键.value.sort())
}

/**
 * 为了防止每次按下按键都执行判断快捷键
 * @param win和lin的快捷键
 * @param mac的快捷键
 * @returns 是否应该阻断 true:应该阻断 false:不应该阻断
 */
function 获取是否应该阻断(win和lin的快捷键: string[], mac的快捷键: string[]): boolean {
  const 按下按键数 = 当前按下的所有键.value?.length
  // 没按键，直接返回false
  if (!按下按键数) {
    return true
  }
  // 根据系统判断，按下的快捷键和定义的快捷键长度是否相等
  const 系统 = 获取当前('系统')
  const 是windows和linux系统 = ['Windows', 'Linux', 'browser'].includes(系统)
  const 是mac系统 = ['macOS', 'browser'].includes(系统)
  if (是windows和linux系统) {
    const win和lin按键数不匹配 = win和lin的快捷键?.length !== 按下按键数
    return win和lin按键数不匹配
  } else if (是mac系统) {
    const mac按键数不匹配 = mac的快捷键?.length !== 按下按键数
    return mac按键数不匹配
  } else {
    // 不知道是啥系统，直接返回true表示阻断
    return true
  }
}

function 符合win和lin或mac条件(win和lin的keys: string[], mac的keys: string[]) {
  // 为了防止每次按下按键都执行判断快捷键
  if (获取是否应该阻断(win和lin的keys, mac的keys)) {
    return false
  }
  const 系统 = 获取当前('系统')
  const 是windows和linux系统 = ['Windows', 'Linux', 'browser'].includes(系统)
  const 是mac系统 = ['macOS', 'browser'].includes(系统)
  const win和lin复制条件 = 是windows和linux系统 && 按下了定义的快捷键(win和lin的keys)
  const mac复制条件 = 是mac系统 && 按下了定义的快捷键(mac的keys)
  return win和lin复制条件 || mac复制条件
}

export function use快捷键监听(funObj: 快捷键方法Type) {
  // 监听朗读快捷键
  watchEffect(() => {
    const win和lin的keys = 快捷键集合.windows和linux.朗读
    const mac的keys = 快捷键集合.mac.朗读
    const 是否符合系统任意条件 = 符合win和lin或mac条件(win和lin的keys, mac的keys)
    if (是否符合系统任意条件) {
      funObj.语音朗读快捷键方法 && funObj.语音朗读快捷键方法()
    }
  })

  watchEffect(() => {
    const win和lin的keys = 快捷键集合.windows和linux.复制
    const mac的keys = 快捷键集合.mac.复制
    const 是否符合任意系统条件 = 符合win和lin或mac条件(win和lin的keys, mac的keys)
    if (是否符合任意系统条件) {
      funObj.复制快捷键方法 && funObj.复制快捷键方法()
    }
  })
}
