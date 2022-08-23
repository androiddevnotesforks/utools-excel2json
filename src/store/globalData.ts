import { defineStore } from 'pinia'
import { getDbStorageItem, setDbStorageItem } from '@/utils/storage'

const utools = window.utools

const OSRules = [
  { condition: () => utools.isWindows(), OSName: 'Windows' },
  { condition: () => utools.isMacOs(), OSName: 'macOS' },
  { condition: () => utools.isLinux(), OSName: 'Linux' },
]

function getOS() {
  if (!utools) {
    return 'browser'
  }
  return OSRules.find(rule => rule.condition())?.OSName || 'unknown'
}

function getSettingSide() {
  const strData = getDbStorageItem('settingSide')
  return !!(strData === 'true' || strData === true)
}

export const useGlobalStore = defineStore('global', () => {
  const currentTheme = ref('')
  const currentOS = ref(getOS())
  const 侧边收起 = ref(getSettingSide())

  function 设置侧边收起() {
    侧边收起.value = !侧边收起.value
    setDbStorageItem('settingSide', 侧边收起.value)
  }

  return {
    currentTheme,
    currentOS,
    侧边收起,
    设置侧边收起,
  }
})
