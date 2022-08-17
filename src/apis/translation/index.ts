import { 上传日志 } from '../log'
import { 获取指定的翻译方法, 读取并检查密钥配置, 返回状态码及信息 } from './common'
import type { 翻译参数Type } from './common'
import { 语音标识修正 } from '@/utils/language'

/**
 *
 * @param tag 翻译标识
 * @param options 翻译参数
 * @returns
 */
export async function 通用翻译(tag: string, options: 翻译参数Type): Promise<any> {
  const { q } = options
  // let last
  // 空值优化
  if (!q) {
    return 返回状态码及信息(400)
  }

  // 重复值优化
  // TODO: 因为重复性验证操作提到了翻译服务之前，所以对于切换翻译方式来说每次参数都不一样，原有方法没用了
  // TODO: 考虑将不同tag翻译结果整合，针对tag来做判断是否与上次相同
  // const optionsStr = JSON.stringify({ tag, ...options })
  // console.log('optionsStr:', optionsStr)
  // console.log('last:', last.optionsStr)
  // if (!isRefresh && optionsStr === last.optionsStr) {
  //   return last.result
  // }

  // 语言修正
  // const { from, to } = 语音标识修正(tag, options)
  const { from, to } = 语音标识修正(tag, options)

  // 读取密钥信息
  const checkKey = 读取并检查密钥配置(tag)
  if (!checkKey.flag) {
    return 返回状态码及信息(401, undefined, checkKey.msg)
  }

  const keyConfig = checkKey.keyConfig

  const fn = 获取指定的翻译方法(tag)
  if (!fn) {
    return 返回状态码及信息(400, undefined, '这个功能还在建设中哦')
  }

  const result = await fn({ q, from, to, keyConfig })
  if (result.code === 503) {
    // 访问频率受限，再次发起翻译
    return await 通用翻译(tag, options)
  }
  上传日志(tag)

  // last.result = result
  // last.optionsStr = optionsStr
  return result
}
