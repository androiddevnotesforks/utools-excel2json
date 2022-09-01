/** 快捷键 */
import { 获取当前 } from '@/utils/getEnv'

interface 快捷键方法Type {
  语音朗读快捷键方法?: Function
  复制快捷键方法?: Function
}

export function use快捷键监听(funObj: 快捷键方法Type) {
  const 组合键 = useMagicKeys()
  const 系统 = 获取当前('系统')
  const windows和linux系统 = ref(['Windows', 'Linux', 'browser'].includes(系统))
  const mac系统 = ref(['macOS', 'browser'].includes(系统))

  // 监听朗读快捷键
  watchEffect(() => {
    const windows和linux朗读条件 = windows和linux系统 && 组合键['ctrl+shift+s']
    const mac朗读条件 = mac系统 && 组合键['command+shift+s']
    if (windows和linux朗读条件.value || mac朗读条件.value) {
      // 快捷键复制()
      funObj.语音朗读快捷键方法 && funObj.语音朗读快捷键方法()
    }
  })

  // 监听复制快捷键
  watchEffect(() => {
    const windows和linux复制条件 = windows和linux系统 && 组合键['ctrl+shift+c']
    const mac复制条件 = mac系统 && 组合键['command+shift+c']
    if (windows和linux复制条件.value || mac复制条件.value) {
      funObj.复制快捷键方法 && funObj.复制快捷键方法()
    }
  })
}
