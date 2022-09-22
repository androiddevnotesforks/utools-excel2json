/** utools 业务逻辑 */
import { delay } from 'lodash-es'
import type { Ref } from 'vue'
import { useGlobalStore } from '@/store/globalData'

interface utoolsPluginEnter {
  code: string // plugin.json 配置的 feature.code
  type: string // plugin.json 配置的 feature.cmd.type，可以为 "text"、"img"、 "files"、 "regex"、 "over"、"window"
  payload: any // feature.cmd.type 对应匹配的数据(String | Object | Array)
}
const utools = window?.utools

/**
 * 为了防止突然关闭utools太突兀，所以延迟一小段时间关闭
 * @param delayTime 延迟时间
 * @returns
 */
export function 延迟关闭utools(delayTime = 300) {
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

export async function 粘贴() {
  if (!utools) {
    return
  }
  const { 是否mac } = storeToRefs(useGlobalStore())
  const key = 是否mac.value ? 'command' : 'ctrl'
  await utools.simulateKeyboardTap('v', key)
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

  return {
    utools,
    utools初始化,
  }
}
