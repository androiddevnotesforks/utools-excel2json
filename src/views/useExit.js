/** 退出插件 */
import { 获取当前 } from '@/utils/getEnv.js'

export default function (utools) {
  const 组合键 = useMagicKeys()

  function 关闭当前窗口() {
    const 系统 = 获取当前('系统')
    if (['Windows', 'Linux'].includes(系统)) {
      utools.simulateKeyboardTap('f4', 'alt')
    } else if (系统 === 'macOS') {
      utools.simulateKeyboardTap('w', 'commond', 'shfit')
    }
  }

  // 监听esc快捷键TODO:应当再加限定条件首页才可以关闭
  watchEffect(() => {
    const windows快捷键 = 组合键['Escape']
    if (windows快捷键.value) {
      关闭当前窗口()
    }
  })
}
