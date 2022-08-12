/**
 * 谷歌翻译
 */
const google = require('./googleTranslateApi')
// const google = require('@vitalets/google-translate-api')

module.exports = {
  textTranslate: function (text, opts) {
    opts.to = opts.to || 'zh'
    opts.tld = 'cn'
    return google(text, opts)
  }
}
