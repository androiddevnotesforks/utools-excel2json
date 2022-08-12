/**
 * 彩云小译
 * https://docs.caiyunapp.com/blog/2018/09/03/lingocloud-api/
 *  */

import axios from 'axios'
import { 返回状态码及信息 } from '../common'

const last = {
  optionsStr: '',
  result: ''
}

/**
 * 通用翻译
 * @param {String} options.q 请求翻译query(UTF-8编码)
 * @param {String} options.from 翻译源语言(可设置为auto)
 * @param {String} options.to 翻译目标语言 (可设置为auto)
 * @param {Object} options.keyConfig key配置
 */
export default function ({ q, from, to, keyConfig }) {
  const url = import.meta.env.VITE_CAIYUN_BASEURL

  // 翻译方式
  const direction = from + '2' + to
  const data = {
    source: q,
    trans_type: direction,
    request_id: 'demo',
    detect: true
  }

  const headers = {
    'content-type': 'application/json',
    'x-authorization': 'token ' + keyConfig.token
  }

  return axios
    .post(url, data, { headers })
    .then(res => {
      console.log('res:', res.data)
      const { target } = res.data
      let result
      if (target) {
        // 翻译成功
        result = 返回状态码及信息(200, { text: target })
      } else {
        // 翻译失败
        result = 返回状态码及信息(500)
      }
      last.result = result
      return result
    })
    .catch(err => {
      return 返回状态码及信息(500, null, err)
    })
}
