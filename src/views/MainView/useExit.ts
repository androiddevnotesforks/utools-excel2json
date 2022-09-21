/** 退出插件 */
import { 获取当前 } from '@/utils/getEnv'

function 关闭当前窗口() {
  const utools = window?.utools
  if (!utools) {
    return
  }
  const 系统 = 获取当前('系统')
  const 是mac系统 = 系统 === 'macOS'
  const 不是mac系统 = 系统 !== 'macOS'
  if (不是mac系统) {
    utools.simulateKeyboardTap('f4', 'alt')
  } else if (是mac系统) {
    utools.simulateKeyboardTap('w', 'commond')
  }
}

onKeyStroke('Escape', () => {
  关闭当前窗口()
})
