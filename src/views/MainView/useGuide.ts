import { 显示引导, 清除引导 } from '@MainView/MainViewUtils'
import type { 引导options类型 } from '@MainView/MainViewTypes'

export function 首次引导() {
  const option: 引导options类型 = {
    id: 'firstUseMain',
    title: '欢迎使用易翻😁',
    text: '初次使用，应该点击这里去配置一下服务哦~',
    attachTo: {
      element: '#setting-wrapper',
      on: 'left',
    },
    classes: 'guide_wrapper',
  }

  显示引导(option, 'firstUseMain')
}

export function 未配置服务引导() {
  const option: 引导options类型 = {
    id: 'missingParameter',
    title: '未配置服务',
    text: '你应该点击这里去配置一下服务哦~🖊️',
    attachTo: {
      element: '#setting-wrapper',
      on: 'left',
    },
    classes: 'guide_wrapper',
  }
  清除引导()
  显示引导(option, 'firstUseMain')
}
