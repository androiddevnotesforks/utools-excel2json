import { api不支持的大对象 } from '@MainView/MainViewData'
import type { 级联值类型 } from '@MainView/MainViewTypes'

export function 检查from和to是否兼容(arr: 级联值类型, 当前api: string) {
  const 当前api规则 = api不支持的大对象?.[当前api]
  if (!当前api规则) {
    return 'from不兼容'
  }
  const 非互翻_自定义不支持: any = 当前api规则?.自定义不支持 // 不支持互翻的才会有这个obj
  const 互翻_to不支持的数组 = 当前api规则?.to不支持 // 支持互翻的会有这个数组
  const 源语言 = arr[0]
  const 目标语言 = arr[1]

  // 判断from是否不支持
  // 如果当前的翻译from，在当前api的源语言不支持中不存在，就恢复默认
  if (当前api规则?.from不支持.includes(源语言)) {
    return 'from不兼容'
  }

  // 判断to是否不支持
  // 如果是不支持互翻的api，且当前from的对应to为不支持的，就恢复默认
  if (非互翻_自定义不支持 && 非互翻_自定义不支持[源语言].includes(目标语言)) {
    return 'to不兼容'
  }

  // 如果是支持互翻的，则取目标语言不支持数组中进行判断
  if (互翻_to不支持的数组 && 互翻_to不支持的数组.includes(目标语言)) {
    return 'to不兼容'
  }
  return '兼容'
}
