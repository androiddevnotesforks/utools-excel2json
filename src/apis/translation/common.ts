import 百度翻译 from './serve/baidu'
import 腾讯翻译 from './serve/tencent'
import 谷歌翻译 from './serve/google'
import 有道翻译 from './serve/youdao'
import 阿里翻译 from './serve/ali'
import 彩云翻译 from './serve/caiyun'
import 火山翻译 from './serve/huoshan'
import { getKeyByTag } from '@/store/userSetting'

const 翻译应用 = {
  baidu: {
    fn: 百度翻译,
    label: '百度翻译',
    keys: ['appid', 'token']
  },
  tencent: {
    fn: 腾讯翻译,
    label: '腾讯翻译',
    keys: ['secretId', 'secretKey']
  },
  google: {
    fn: 谷歌翻译,
    label: '谷歌翻译',
    keys: []
  },
  youdao: {
    fn: 有道翻译,
    label: '有道翻译',
    keys: ['appid', 'appkey']
  },
  ali: {
    fn: 阿里翻译,
    label: '阿里翻译',
    keys: ['accessKeyId', 'accessKeySecret']
  },
  caiyun: {
    fn: 彩云翻译,
    label: '彩云小译',
    keys: ['token']
  },
  huoshan: {
    fn: 火山翻译,
    label: '火山翻译',
    keys: ['accessKeyId', 'secretAccessKey']
  }
}

/** 根据tag获取翻译方法 */
export function 获取指定的翻译方法(tag) {
  return 翻译应用?.[tag]?.fn
}

/**
 * 返回信息对象
 * @param {Number} code[200,304,503,500,401,400,403,204] 状态码
 * @param {String} data 翻译返回值信息
 * @param {String} customMsg 自定义信息值
 * @returns
 */
export function 返回状态码及信息(code, data, customMsg) {
  const codeOptions = {
    200: '成功',
    304: '成功(上次返回结果)',
    503: '操作太快了，点击重试再试一次吧',
    500: '出现了一些问题，如果你确定服务信息填写无误，点击重试再试一次吧',
    400: '参数信息不正确',
    401: '未配置密钥或密钥信息不完整',
    403: '请使用utools来调用该接口',
    204: '请求已取消'
  }
  data = data || {}

  let message = codeOptions[code]
  if (code !== 200 && code !== 304) {
    // 翻译失败，将错误信息赋值给text
    message = `翻译失败：${customMsg || message}`
    if (code === 204) {
      message = ''
    }
    data.text = message
  }

  return {
    code,
    message,
    ...data
  }
}

/** 获取并检查key配置 */
export function 读取并检查密钥配置(tag) {
  const serve = 翻译应用[tag]
  const keyConfig = getKeyByTag(tag) || {}
  let flag = true
  let msg = ''
  if (serve) {
    for (let i = 0; i < serve.keys.length; i++) {
      if (!keyConfig[serve.keys[i]]) {
        flag = false
        msg = `没有配置服务哦🚨，我猜你大概率是没有填${serve.label}的信息，现在，你应该马不停蹄的点击右下角的设置按钮，去填写相关信息🖊️`
      }
    }
  }
  return { flag, keyConfig, msg }
}
