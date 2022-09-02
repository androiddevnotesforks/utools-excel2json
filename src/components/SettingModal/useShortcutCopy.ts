// 快捷键文案
import type { 系统类型 } from '@/types/index'
import { 获取当前 } from '@/utils/getEnv'
type 快捷键类型 = {
  [key in 系统类型]: {
    copy: string
    read: string
  }
}

export const 快捷键文案 = computed(() => {
  const 系统 = 获取当前('系统') as 系统类型
  const m: 快捷键类型 = {
    macOS: {
      copy: 'Command+Shift+C',
      read: 'Command+Shift+S',
    },
    Windows: {
      copy: 'Ctrl+Shift+C',
      read: 'Ctrl+Shift+S',
    },
    Linux: {
      copy: 'Ctrl+Shift+C',
      read: 'Ctrl+Shift+S',
    },
    browser: {
      copy: 'Command+Shift+C / Ctrl+Shift+C',
      read: 'Command+Shift+S / Ctrl+Shift+S',
    },
    unknown: {
      copy: '我也不知道你是什么设备，随便按吧',
      read: '我也不知道你是什么设备，随便按吧',
    },
  }
  return m?.[系统] || ''
})
