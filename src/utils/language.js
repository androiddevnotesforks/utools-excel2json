/** 整合的语言修正options */
// 百度：泰语：th，西班牙语：spa
// 腾讯：泰语：th，西班牙语：es
// 谷歌：同上
// 阿里：同上
// 有道：同上
// 火山：同上
// 彩云：-
export const optionsData = {
  tencent: {
    zh: 'zh',
    en: 'en',
    jp: 'ja',
    ru: 'ru',
    de: 'de',
    fra: 'fr',
    cht: 'zh-TW',
    kor: 'ko'
  },
  ali: {
    zh: 'zh',
    en: 'en',
    jp: 'ja',
    ru: 'ru',
    de: 'de',
    fra: 'fr',
    cht: 'zh-tw',
    kor: 'ko',
    yue: 'yue'
  },
  youdao: {
    zh: 'zh-CHS',
    en: 'en',
    jp: 'ja',
    ru: 'ru',
    de: 'de',
    fra: 'fr',
    cht: 'zh-CHT',
    kor: 'ko',
    yue: 'yue'
  },
  google: {
    zh: 'zh-CN',
    en: 'en',
    jp: 'ja',
    ru: 'ru',
    de: 'de',
    fra: 'fr',
    cht: 'zh-TW',
    kor: 'ko'
  },
  caiyun: {
    zh: 'zh',
    en: 'en',
    jp: 'ja'
  },
  huoshan: {
    zh: 'zh',
    en: 'en',
    jp: 'ja',
    ru: 'ru',
    de: 'de',
    fra: 'fr',
    cht: 'zh-Hant',
    kor: 'ko'
  }
}

/**
 * 语言标识修正 —— 根据tag自动确认options
 * 注：因为各家的语言标识不完全相同，为保持前端传入参数的一致性，将所有的语言标识以百度翻译为标准，再由各翻译模块修正
 * @param {*} tag 修正选项 例：tencent
 * @param {*} param {form,to}
 * @returns
 */
export function languageCorrectionByTag(tag, { from, to }) {
  const options = optionsData[tag] || {}
  const fn = target => {
    return options[target] || target
  }

  return {
    from: fn(from),
    to: fn(to)
  }
}
