/** 快捷键 */
import { cloneDeep, debounce } from 'lodash-es'
import { 复制主函数 } from '@MainView/useCopy'
import { 离线朗读主函数 } from '@MainView/useOutlineVoice'
import { 在线朗读主函数 } from '@MainView/useVoice'
import { 用户设置存储 } from '@/store/userSetting'
import { 获取当前 } from '@/utils/getEnv'
import type { 系统类型 } from '@/types/index'
import type { 语种 } from '@/assets/translateApiOption'

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

const 朗读主函数 = debounce((str: string, 译文语言标识: 语种) => {
  const { readingModel } = storeToRefs(用户设置存储())
  if (readingModel.value === '在线') {
    在线朗读主函数(str, 译文语言标识)
  } else if (readingModel.value === '离线') {
    离线朗读主函数(str)
  }
}, 400)

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

/**
 * 快捷键主函数
 * @param str 要复制或者要读的文字
 */
export function 判断快捷键(str: string, 译文语言标识: 语种) {
  const 系统 = 获取当前('系统') as 系统类型
  const 按键合规 = 检查按下快捷键与定义的长度(系统)
  // 首先判断当前按下的按键个数，在对应的系统里有没有定义一样长度的快捷键
  if (!按键合规) {
    return
  }

  // 创建互斥变量用于区分mac与非mac
  const 是macOS = 系统 === 'macOS'
  const mac快捷键条件 = 是macOS
  const 其他快捷键条件 = !是macOS
  // 将当前按下的所有按键，转换为字符串
  const 排序后按下的键str = cloneDeep(当前按下的所有键.value).sort().join()
  // 根据系统，创建该系统下的所有快捷键字符串与方法的映射，并尝试执行该方法
  if (mac快捷键条件) {
    switch (排序后按下的键str) {
      case 快捷键集合.macOS.复制.join():
        复制主函数('快捷键', str)
        break
      case 快捷键集合.macOS.朗读.join():
        朗读主函数(str, 译文语言标识)
        break
    }
  } else if (其他快捷键条件) {
    switch (排序后按下的键str) {
      case 快捷键集合.other.复制.join():
        复制主函数('快捷键', str)
        break
      case 快捷键集合.other.朗读.join():
        朗读主函数(str, 译文语言标识)
        break
    }
  }
}
