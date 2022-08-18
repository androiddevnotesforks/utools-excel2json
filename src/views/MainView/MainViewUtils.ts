// MainView用到的所有工具函数
import { nanoid } from 'nanoid'
import { debounce, replace, throttle } from 'lodash-es'
import { noCase } from 'change-case'
import { Message as 提示 } from '@arco-design/web-vue'
import { getDbStorageItem as 获取存储项 } from '@/utils/storage'
import { 显示引导, 清除引导 } from '@/utils/showGuide'
import { 获取当前 } from '@/utils/getEnv'

export const 主页工具 = {
  获取存储项,
  显示引导,
  清除引导,
  获取当前,
  nanoid,
  debounce,
  replace,
  throttle,
  noCase,
  提示,
}
