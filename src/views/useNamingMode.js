/** 命名翻译模式相关业务 */
import { 用户设置存储 } from '@/store/userSetting'
import { 切换类型数组 } from '@/assets/changeCaseMap.js'

export default function (结果对象) {
  const 存储 = 用户设置存储()
  const 是命名模式 = computed(() => 存储.codeMode) // 命名翻译模式
  const 命名模式类型 = ref('camelCase') // 命名模式要转换的类型

  // 切换命名翻译模式的方式select
  function 命名模式切换类型() {
    const result = 返回命名模式对应结果(
      结果对象.数据.结果文字,
      命名模式类型.value
    )
    结果对象.数据.结果文字 = result
  }

  // 获取命名翻译模式的翻译结果
  function 返回命名模式对应结果(文字 = '', type = 'camelCase') {
    const 当前模式对象 = 切换类型数组.find(item => item.name === type)
    if (!文字) return 文字
    if (!当前模式对象) return 文字
    return 当前模式对象.handle(文字)
  }

  /** 根据关键字切换命名翻译模式 */
  function 改变命名模式类型(code) {
    console.log('改变命名模式类型:', code)
    // codeMode&xx
    const reg = /^codeMode__/
    if (reg.test(code)) {
      存储.setCodeMode(true)
      const modeName = code.split('__')[1]
      命名模式类型.value = modeName
    } else {
      存储.setCodeMode(false)
    }
  }

  return {
    是命名模式,
    命名模式类型,
    切换类型数组,
    命名模式切换类型,
    改变命名模式类型,
    返回命名模式对应结果
  }
}
