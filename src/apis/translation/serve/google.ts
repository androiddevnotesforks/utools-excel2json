/**
 * 谷歌翻译接口
 * https://github.com/vitalets/google-translate-api
 *  */
import { 返回状态码及信息 } from '../common'
import type { 翻译参数Type } from '../common'

/**
 * 机器翻译
 * @param {String} options.q 请求翻译query
 * @param {String} options.from 翻译源语言(可设置为auto)
 * @param {String} options.to 翻译目标语言(不可设置为auto)
 * @param {Object} options.keyConfig key配置
 */
export default function ({ q, from, to }: 翻译参数Type) {
  if (window.servers) {
    return window.servers
      .googleTextTranslate({
        q,
        from,
        to,
      })
      .then((res: any) => {
        return 返回状态码及信息(200, { text: res.text })
      })
      .catch((err: any) => {
        return 返回状态码及信息(500, null, err)
      })
  } else {
    return 返回状态码及信息(403)
  }
}
