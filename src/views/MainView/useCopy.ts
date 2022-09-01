/** 复制相关业务 */
import { storeToRefs } from 'pinia'
import { throttle } from 'lodash-es'
import { Message as 提示 } from '@arco-design/web-vue'
import { use快捷键监听 } from '@MainView/MainViewModule'
import { 用户设置存储 } from '@/store/userSetting'

export function use复制模块(
  结果对象: any,
  utools: any,
  粘贴: Function,
  延迟关闭utools: Function
) {
  const { copyBtnBehavior: 复制按钮行为 } = storeToRefs(用户设置存储())
  const { copy: 复制 } = useClipboard() // 复制结果功能

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
    await 复制(结果对象.结果文字)
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
    return 结果对象.结果文字?.trim() && 结果对象.状态码 === 200
  })

  use快捷键监听({
    复制快捷键方法: () => {
      if (要显示复制按钮.value) {
        快捷键复制()
      }
    },
  })

  return {
    要显示复制按钮,
    复制按钮事件,
  }
}
