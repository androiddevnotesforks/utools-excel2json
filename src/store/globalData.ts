import { defineStore } from 'pinia'

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

export const useGlobalStore = defineStore('global', () => {
  const currentTheme = ref('')
  const currentOS = ref(getOS())

  return {
    currentTheme,
    currentOS,
  }
})
