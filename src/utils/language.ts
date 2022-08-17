/** 整合的语言修正options */

interface 语言集合Type {
  [key: string]: any
}

export interface 语音标识参数Type {
  from: string // 翻译源语言
  to: string // 翻译目标语言
}

const 语音集合: 语言集合Type = {
  // 简体中文
  zh: {
    baidu: 'zh',
    tencent: 'zh',
    ali: 'zh',
    youdao: 'zh-CHS',
    google: 'zh-CN',
    caiyun: 'zh',
    huoshan: 'zh',
  },
  // 繁体中文
  cht: {
    baidu: 'cht',
    tencent: 'zh-TW',
    ali: 'zh-tw',
    youdao: 'zh-CHT',
    google: 'zh-TW',
    caiyun: '',
    huoshan: 'zh-Hant',
  },
  // 文言文
  wyw: {
    baidu: 'wyw',
    tencent: '',
    ali: '',
    youdao: '',
    google: '',
    caiyun: '',
    huoshan: '',
  },
  // 粤语
  yue: {
    baidu: 'yue',
    tencent: '',
    ali: 'yue',
    youdao: 'yue',
    google: '',
    caiyun: '',
    huoshan: '',
  },
  // 英语
  en: {
    baidu: 'en',
    tencent: 'en',
    ali: 'en',
    youdao: 'en',
    google: 'en',
    caiyun: 'en',
    huoshan: 'en',
  },
  // 日语
  jp: {
    baidu: 'jp',
    tencent: 'ja',
    ali: 'ja',
    youdao: 'ja',
    google: 'ja',
    caiyun: 'ja',
    huoshan: 'ja',
  },
  // 俄语
  ru: {
    baidu: 'ru',
    tencent: 'ru',
    ali: 'ru',
    youdao: 'ru',
    google: 'ru',
    caiyun: 'ru',
    huoshan: 'ru',
  },
  // 德语
  de: {
    baidu: 'de',
    tencent: 'de',
    ali: 'de',
    youdao: 'de',
    google: 'de',
    caiyun: '',
    huoshan: 'de',
  },
  // 法语
  fra: {
    baidu: 'fra',
    tencent: 'fr',
    ali: 'fr',
    youdao: 'fr',
    google: 'fr',
    caiyun: '',
    huoshan: 'fr',
  },
  // 韩语
  kor: {
    baidu: 'kor',
    tencent: 'ko',
    ali: 'ko',
    youdao: 'ko',
    google: 'ko',
    caiyun: '',
    huoshan: 'ko',
  },
  // 泰语
  th: {
    baidu: 'th',
    tencent: 'th',
    ali: 'th',
    youdao: 'th',
    google: 'th',
    caiyun: 'th',
    huoshan: 'th',
  },
  // 西班牙语
  spa: {
    baidu: 'spa',
    tencent: 'es',
    ali: 'es',
    youdao: 'es',
    google: 'es',
    caiyun: 'es',
    huoshan: 'es',
  },
}

/**
 * 语言标识修正 —— 根据tag自动确认options
 * 注：因为各家的语言标识不完全相同，为保持前端传入参数的一致性，将所有的语言标识以百度翻译为标准，再由各翻译模块修正
 * @param {*} tag 修正选项 例：tencent
 * @param {*} param {form,to}
 * @returns
 */

/**
 *
 * @param tag 修正的翻译标识
 * @param 翻译参数 语音标识参数
 * @returns 修正后的语音标识参数
 */
export function 语音标识修正(tag: string, 翻译参数: 语音标识参数Type): 语音标识参数Type {
  const { from, to } = 翻译参数
  const fn = (目标语言: string) => {
    if (目标语言 === 'auto') {
      return 目标语言
    }
    try {
      const options = 语音集合[目标语言]
      return options[tag] || 目标语言
    } catch (error) {
      console.error(`语言标识错误: ${tag} - ${目标语言}`)
    }
  }

  return {
    from: fn(from),
    to: fn(to),
  }
}
