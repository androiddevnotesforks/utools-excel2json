/** 复制相关业务 */
import { storeToRefs } from 'pinia'
import { throttle } from 'lodash-es'
import { useClipboard } from '@vueuse/core'
import { Message as 提示 } from '@arco-design/web-vue'
import { 用户设置存储 } from '@/store/userSetting'
import { 获取当前 } from '@/utils/getEnv'

export function use复制模块(
  结果对象: any,
  utools: any,
  粘贴: Function,
  延迟关闭utools: Function
) {
  const { copyBtnBehavior: 复制按钮行为 } = storeToRefs(用户设置存储())
  const { copy: 复制 } = useClipboard() // 复制结果功能
  const 组合键 = useMagicKeys()
  // 快捷键复制结果
  const 快捷键复制 = throttle(async () => {
    await 仅复制()
    if (!utools) {
      return
    }
    const 行为 = 复制按钮行为.value
    if (行为 === 'close') {
      await 延迟关闭utools()
    } else if (行为 === 'closeInput') {
      await 延迟关闭utools()
      await 粘贴()
    }
  }, 300)

  // 复制按钮事件
  const 复制按钮事件 = throttle((val = 1) => {
    switch (val) {
      case 1:
        仅复制()
        break
      case 2:
        复制并隐藏()
        break
      case 3:
        复制并输入()
        break
    }
  }, 300)

  // 仅复制
  async function 仅复制() {
    await 复制(结果对象.数据.结果文字)
    提示.success({ content: '复制成功', duration: 2500 })
  }

  // 复制并隐藏
  async function 复制并隐藏() {
    await 仅复制()
    await 延迟关闭utools()
  }

  // 复制并输入
  async function 复制并输入() {
    await 复制并隐藏()
    await 粘贴()
  }

  // 是否应该显示复制按钮
  const 要显示复制按钮 = computed(() => {
    return 结果对象.数据.结果文字?.trim() && 结果对象.数据.结果码 === 200
  })

  const 系统 = 获取当前('系统')
  const windows和linux系统 = ref(['Windows', 'Linux', 'browser'].includes(系统))
  const mac系统 = ref(['macOS', 'browser'].includes(系统))

  // 监听复制快捷键
  watchEffect(() => {
    const windows和linux复制条件 = windows和linux系统 && 组合键['ctrl+shift+c']
    const mac复制条件 = mac系统 && 组合键['command+shift+c']
    if ((windows和linux复制条件.value || mac复制条件.value) && 要显示复制按钮.value) {
      快捷键复制()
    }
  })

  return {
    要显示复制按钮,
    复制按钮事件,
  }
}
