import { useGlobalStore } from '@/store/globalData'

export function 获取当前(str = ''): string {
  const globalStore = useGlobalStore()
  const { currentOS, currentTheme } = storeToRefs(globalStore)
  const m = new Map([
    ['系统', currentOS.value],
    ['主题', currentTheme.value],
  ])
  return m.get(str) || ''
}
