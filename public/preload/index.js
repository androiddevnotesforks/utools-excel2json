/** 涉及node业务 */

const google = require('./googleTranslateApi')
const ali = require('./alicloudApi')
const mstts = require('./mstts')

const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})

// 提供给web的方法
window.servers = {
  // 谷歌翻译
  googleTextTranslate: params => {
    try {
      const { q, from, to } = params
      return google.textTranslate(q, { from, to })
    } catch (error) {
      return error
    }
  },

  // 阿里翻译
  aliTextTranslate: (params, credential) => {
    return ali.textTranslate(params, credential)
  },

  // 语音朗读
  voiceReading: async options => {
    const defaultOptions = {
      text: '', // 文本
      voice: 'zh-CN-YunjianNeural', // 发音角色
      role: '',
      express: 'general', // 发音风格
      rate: 1, // 语速
      pitch: 1 // 语调
    }

    const params = {
      ...defaultOptions,
      ...options
    }

    const { text, voice, role, express, rate, pitch } = params

    const mp3buffer = await mstts.getTTSData(
      text,
      voice,
      express,
      role,
      (rate - 1) * 100,
      ((pitch - 1) / 2) * 100
    )
    return mp3buffer
  }
}
