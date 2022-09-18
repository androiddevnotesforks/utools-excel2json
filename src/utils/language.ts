/** 整合的语言修正options */

interface 语言集合Type {
  [key: string]: {
    name: string
    datas: { [key: string]: string }
  }
}

export interface 语音标识参数Type {
  from: string // 翻译源语言
  to: string // 翻译目标语言
}

const 语音集合: 语言集合Type = {
  // 简体中文
  zh: {
    name: '简体中文',
    datas: {
      baidu: 'zh',
      tencent: 'zh',
      ali: 'zh',
      youdao: 'zh-CHS',
      google: 'zh-CN',
      caiyun: 'zh',
      huoshan: 'zh',
      xiaoniu: 'zh',
    },
  },
  // 繁体中文
  cht: {
    name: '繁体中文',
    datas: {
      baidu: 'cht',
      tencent: 'zh-TW',
      ali: 'zh-tw',
      youdao: 'zh-CHT',
      google: 'zh-TW',
      caiyun: '',
      huoshan: 'zh-Hant',
      xiaoniu: 'cht',
    },
  },
  // 文言文
  wyw: {
    name: '文言文',
    datas: {
      baidu: 'wyw',
      tencent: '',
      ali: '',
      youdao: '',
      google: '',
      caiyun: '',
      huoshan: '',
      xiaoniu: '',
    },
  },
  // 粤语
  yue: {
    name: '粤语',
    datas: {
      baidu: 'yue',
      tencent: '',
      ali: 'yue',
      youdao: 'yue',
      google: '',
      caiyun: '',
      huoshan: '',
      xiaoniu: 'yue',
    },
  },
  // 英语
  en: {
    name: '英语',
    datas: {
      baidu: 'en',
      tencent: 'en',
      ali: 'en',
      youdao: 'en',
      google: 'en',
      caiyun: 'en',
      huoshan: 'en',
      xiaoniu: 'en',
    },
  },
  // 日语
  jp: {
    name: '日语',
    datas: {
      baidu: 'jp',
      tencent: 'ja',
      ali: 'ja',
      youdao: 'ja',
      google: 'ja',
      caiyun: 'ja',
      huoshan: 'ja',
      xiaoniu: 'ja',
    },
  },
  // 俄语
  ru: {
    name: '俄语',
    datas: {
      baidu: 'ru',
      tencent: 'ru',
      ali: 'ru',
      youdao: 'ru',
      google: 'ru',
      caiyun: 'ru',
      huoshan: 'ru',
      xiaoniu: 'ru',
    },
  },
  // 德语
  de: {
    name: '德语',
    datas: {
      baidu: 'de',
      tencent: 'de',
      ali: 'de',
      youdao: 'de',
      google: 'de',
      caiyun: '',
      huoshan: 'de',
      xiaoniu: 'de',
    },
  },
  // 法语
  fra: {
    name: '法语',
    datas: {
      baidu: 'fra',
      tencent: 'fr',
      ali: 'fr',
      youdao: 'fr',
      google: 'fr',
      caiyun: '',
      huoshan: 'fr',
      xiaoniu: 'fr',
    },
  },
  // 韩语
  kor: {
    name: '韩语',
    datas: {
      baidu: 'kor',
      tencent: 'ko',
      ali: 'ko',
      youdao: 'ko',
      google: 'ko',
      caiyun: '',
      huoshan: 'ko',
      xiaoniu: 'ko',
    },
  },
  // 泰语
  th: {
    name: '泰语',
    datas: {
      baidu: 'th',
      tencent: 'th',
      ali: 'th',
      youdao: 'th',
      google: 'th',
      caiyun: 'th',
      huoshan: 'th',
      xiaoniu: 'th',
    },
  },
  // 西班牙语
  spa: {
    name: '西班牙语',
    datas: {
      baidu: 'spa',
      tencent: 'es',
      ali: 'es',
      youdao: 'es',
      google: 'es',
      caiyun: 'es',
      huoshan: 'es',
      xiaoniu: 'es',
    },
  },
  // 葡萄牙语
  pt: {
    name: '葡萄牙语',
    datas: {
      baidu: 'pt',
      tencent: 'pt',
      ali: 'pt',
      youdao: 'pt',
      google: 'pt',
      caiyun: 'pt',
      huoshan: 'pt',
      xiaoniu: 'pt',
    },
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
      return options.datas[tag] || 目标语言
    } catch (error) {
      console.error(`语言标识错误: ${tag} - ${目标语言}`)
      return 目标语言
    }
  }

  return {
    from: fn(from),
    to: fn(to),
  }
}

/**
 * 获取推断语言名称
 * @param api
 * @param 推测的语言
 * @returns
 */
export function 获取推断语言名称(api: string, 推测的语言: string) {
  for (const key in 语音集合) {
    const item = 语音集合[key]
    if (item.datas[api] === 推测的语言) {
      return item.name
    }
  }
}
