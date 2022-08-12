/**
 * 阿里云翻译
 */
const crypto = require('crypto')
const https = require('https')

/** 签名 */
function toSign(body, credential) {
  const date = new Date().toGMTString()
  const { accessKeyId, accessKeySecret } = credential

  // 1.对body做MD5+BASE64加密
  const bodyMd5 = crypto.createHash('md5').update(body).digest('base64')
  const uuid = Math.random().toString().split('.')[1]
  const stringToSign =
    'POST\n' +
    'application/json\n' +
    bodyMd5 +
    '\n' +
    'application/json;chrset=utf-8\n' +
    date +
    '\n' +
    'x-acs-signature-method:HMAC-SHA1\n' +
    'x-acs-signature-nonce:' +
    uuid +
    '\n' +
    'x-acs-version:2019-01-02\n' +
    '/api/translate/web/general'

  // 2.计算 HMAC-SHA1
  const signature = crypto
    .createHmac('sha1', accessKeySecret)
    .update(stringToSign)
    .digest('base64')
  // 打开和URL之间的连接
  const authHeader = 'acs ' + accessKeyId + ':' + signature
  return { date, bodyMd5, uuid, authHeader }
}

function translate(params, credential) {
  let postBody = JSON.stringify(params)

  let signature = toSign(postBody, credential)
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;chrset=utf-8',
    'Content-MD5': signature.bodyMd5,
    'Content-Length': postBody.length,
    Date: signature.date,
    Host: 'mt.cn-hangzhou.aliyuncs.com',
    Authorization: signature.authHeader,
    'x-acs-signature-nonce': signature.uuid,
    'x-acs-signature-method': 'HMAC-SHA1',
    'x-acs-version': '2019-01-02'
  }

  return new Promise(resolve => {
    // 发起请求
    let req = https.request(
      {
        hostname: 'mt.cn-hangzhou.aliyuncs.com',
        port: 443,
        path: '/api/translate/web/general',
        method: 'POST',
        headers: headers
      },
      res => {
        let response = ''
        res.on('data', chunk => {
          response += chunk
        })

        res.on('end', () => {
          let data = JSON.parse(response)
          resolve(data)
        })
      }
    )
    req.write(postBody)
    req.end()
  })
}

module.exports = {
  textTranslate: translate
}
