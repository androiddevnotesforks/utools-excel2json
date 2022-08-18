import { Message as 提示 } from '@arco-design/web-vue'
import { cloneDeep } from 'lodash-es'
import { useClipboard } from '@vueuse/core'
import { 获取当前 } from '@/utils/getEnv'
import { 显示引导, 清除引导 } from '@/utils/showGuide'
import { 替换字符串 } from '@/utils/toolsFn'

export const 设置页工具 = {
  提示,
  cloneDeep,
  useClipboard,
  获取当前,
  显示引导,
  清除引导,
  替换字符串,
}
