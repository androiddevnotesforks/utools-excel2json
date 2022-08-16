/**
 * 阿里翻译接口
 * https://help.aliyun.com/document_detail/97592.html
 *  */

import 谷歌翻译 from '../serve/google'
import { 返回状态码及信息 } from '../common'

/**
 * 机器翻译
 * @param {String} options.q 请求翻译query(UTF-8编码)
 * @param {String} options.from 翻译源语言(可设置为auto)
 * @param {String} options.to 翻译目标语言(不可设置为auto)
 * @param {Object} options.keyConfig key配置
 */
export default async function ({ q, from, to, keyConfig }) {
  const params = {
    Action: 'TranslateGeneral',
    SourceText: encodeURIComponent(q),
    SourceLanguage: from,
    TargetLanguage: to,
    FormatType: 'text',
    Scene: 'general',
  }

  if (window.servers) {
    return window.servers
      .aliTextTranslate(params, keyConfig)
      .then(async res => {
        const { Code, Data, Message } = res
        if (Code === '200') {
          return 返回状态码及信息(200, { text: Data.Translated })
        } else {
          // return 返回状态码及信息(500, null, Message)
          const { code: gCode, text: gText } = await 谷歌翻译({
            q: Message,
            from: 'auto',
            to: 'zh-CN',
          })
          return 返回状态码及信息(
            500,
            null,
            gCode === 200 && gText ? gText : Message
          )
        }
      })
      .catch(async err => {
        console.error(err)
        return 返回状态码及信息(500)
      })
  } else {
    return 返回状态码及信息(403)
  }
}
