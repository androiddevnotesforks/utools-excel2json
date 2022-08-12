import { useGlobalStore } from '@/store/globalData'
const bodyDom = document.body // body的dom

function setPiniaData(params) {
  const globalStore = useGlobalStore()
  const { currentTheme } = storeToRefs(globalStore)
  currentTheme.value = params
}

/**
 * 设置主题
 * @param {String} val 'dark': 深色，'light': 浅色
 */
export function setTheme(val: 'dark' | 'light') {
  setPiniaData(val)
  const 是否黑色 = val === 'dark'
  document.documentElement.classList.toggle('dark', 是否黑色)
  val === 'dark'
    ? bodyDom.setAttribute('arco-theme', 'dark')
    : bodyDom.removeAttribute('arco-theme')
}
