/** 退出插件 */
import { useGlobalStore } from '@/store/globalData'
function 关闭当前窗口() {
  const utools = window?.utools
  if (!utools) {
    return
  }
  const { 是否mac } = storeToRefs(useGlobalStore())
  const 是mac系统 = 是否mac.value
  const 不是mac系统 = !是否mac.value
  if (不是mac系统) {
    utools.simulateKeyboardTap('f4', 'alt')
  } else if (是mac系统) {
    utools.simulateKeyboardTap('w', 'commond')
  }
}

onKeyStroke('Escape', () => {
  关闭当前窗口()
})
