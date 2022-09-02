import { useGlobalStore } from '@/store/globalData'
import type { 主题类型, 系统类型 } from '@/types/index'
type 获取当前入参 = '系统' | '主题'
type FuncType<T extends 获取当前入参> = T extends '系统'
  ? 系统类型
  : T extends '主题'
  ? 主题类型
  : never
export function 获取当前(value: 获取当前入参): FuncType<获取当前入参> {
  const globalStore = useGlobalStore()
  const { currentOS, currentTheme } = storeToRefs(globalStore)
  const m = new Map([
    ['系统', currentOS.value],
    ['主题', currentTheme.value],
  ])
  return m.get(value) as FuncType<获取当前入参>
}
