import Shepherd from 'shepherd.js'
import { getDbStorageItem, setDbStorageItem } from '@/utils/storage.js'

let tour

export function 显示引导(params, localName) {
  tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: false, // 显示步骤的时候是不是要自己滚过去
      modalOverlayOpeningPadding: 2, // 高亮元素四周要填充的空白像素
      modalOverlayOpeningRadius: 4, // 空白像素的圆角
      canClickTarget: false // 引导的时候不能点击dom
    }
  })
  tour.addStep({
    id: params.id,
    title: params.title,
    text: params.text,
    attachTo: {
      element: params.attachTo.element,
      on: params.attachTo.on
    },
    classes: params.classes,
    buttons: [
      {
        action() {
          // 如果传了localName且存储中不存在，则存储
          if (localName && !getDbStorageItem(localName)) {
            setDbStorageItem(localName, new Date().getTime())
          }
          return this.cancel()
        },
        text: '关闭'
      }
    ]
  })
  tour.start()
}

export function 清除引导() {
  tour?.cancel()
}

export function resetGuide() {
  tour = undefined
}
