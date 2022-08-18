/** utools 业务逻辑 */
import { delay } from 'lodash-es'
import type { Ref } from 'vue'
import { 获取当前 } from '@/utils/getEnv'

interface utoolsPluginEnter {
  code: string // plugin.json 配置的 feature.code
  type: string // plugin.json 配置的 feature.cmd.type，可以为 "text"、"img"、 "files"、 "regex"、 "over"、"window"
  payload: any // feature.cmd.type 对应匹配的数据(String | Object | Array)
}

export function useUtools(
  设置弹框Ref: Ref<any>,
  用户输入: Ref<string>,
  改变命名模式类型: Function
) {
  const utools = window?.utools

  // 初始化utools
  function utools初始化() {
    // 每当插件从后台进入到前台时，uTools 将会主动调用这个方法
    utools.onPluginEnter(({ code, payload }: utoolsPluginEnter) => {
      设置弹框Ref.value.关闭弹窗()
      let value = ''
      const reg = /^anyword__/
      if (reg.test(code)) {
        // 任意文本关键字
        const 任意文本过滤关键字 = ['翻译', 'fjyi']
        if (!任意文本过滤关键字.includes(payload)) {
          value = payload
        }
      }
      用户输入.value = value
      改变命名模式类型(code)
    })
    utools.subInputBlur()
  }

  // 粘贴
  async function 粘贴() {
    const 系统 = 获取当前('系统')
    if (!utools) {
      return
    }
    const key = 系统 === 'macOS' ? 'command' : 'ctrl'
    await utools.simulateKeyboardTap('v', key)
  }

  // 延迟时间关闭utools
  function 延迟关闭utools(delayTime = 300) {
    if (!utools) {
      return
    }
    return new Promise<void>(resolve => {
      delay(function () {
        utools.hideMainWindow()
        resolve()
      }, delayTime)
    })
  }

  return {
    utools,
    utools初始化,
    粘贴,
    延迟关闭utools,
  }
}
