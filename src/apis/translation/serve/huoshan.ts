/**
 * 火山翻译接口
 * https://www.volcengine.com/docs/4640/62099
 *  */
import SHA256 from 'crypto-js/sha256'
import encHex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import { 返回状态码及信息 } from '../common'
import type { 翻译参数Type } from '../common'

const 错误信息: Record<string, string> = {
  // UndefinedError: '一般不出现这个问题，这是系统开发兜底的错误提示',
  MissingParameter: '关键参数缺失，例如Action, Version参数',
  MissingAuthenticationToken: '缺少身份认证的必要信息，例如Auth信息',
  MissingRequestInfo: '缺少请求必要信息，例如：Accesskey，service，region等',
  MissingSignature: '缺少签名结果',
  InvalidTimestamp: '请求过期或请求的签名时间来自未来',
  ServiceUnavailable: '请求的服务不存在',
  InvalidActionOrVersion: '请求接口不存在',
  InvalidClientTokenId: '请求的AK不合法',
  SignatureDoesNotMatch: '签名结果不正确',
  ServiceShouldCallSelfApi:
    '使用service aksk访问请求，仅能访问自己的接口和公共服务的接口。公共服务例如：iam',
  LackPolicy: '子用户请求缺少权限（默认是deny的）',
  AccessDenied: '子用户拥有的权限不支持当前操作',
  InternalError: '业务服务存在故障，这里的业务一般指具体的imagex、vod。故障不来自TOP',
  FailToConnect: '业务服务连接不上，这里的业务一般指具体的imagex、vod。',
  InternalServiceTimeout: '内部服务执行超时，请查看服务在TOP上配置的超时时间。',
  InnerApiNeedAccountInfo: 'Service aksk请求内部服务时缺少了账号信息',
  // FlowLimitExceeded: '请求过于频繁，超出了基本限速',
  ServiceUnavailableTemp: '处于熔断状态的服务暂时不可访问，稍后重试',
  MethodNotAllowed: 'HTTP method不合法',
  LackProjectPolicy: '请求需要验证Project的权限，当前Project权限验证不合法',
  ServiceNotFound: '请求的服务不存在。',
  InvalidAccessKey: '请求的Access Key不合法。',
  // InternalServiceError: '服务存在故障。',
  InvalidAuthorization: 'Authorization头格式错误，检查Authorization。',
  InvalidCredential: 'Authorization头中的Credential格式错误，检查Credential。',
  InvalidSecretToken: '错误的STS or STS2，可能是多种错误，例如签名错误、过期等。',
  '-400': '请求参数错误，具体错误可参考Message信息',
  '-415': '不支持的翻译',
  // '-429': '请求过于频繁',
  // '-500': '翻译服务内部错误'
}

/**
 * 机器翻译
 * @param {String} options.q 请求翻译query(UTF-8编码)
 * @param {String} options.from 翻译源语言(可设置为auto)
 * @param {String} options.to 翻译目标语言(不可设置为auto)
 * @param {Object} options.keyConfig key配置
 */
export default async function ({ q, from, to, keyConfig }: 翻译参数Type) {
  const url = import.meta.env.VITE_HUOSHAN_BASEURL
  const query = 'Action=TranslateText&Version=2020-06-01'

  if (from === 'auto') {
    from = ''
  }
  const bodyData = {
    TextList: [q],
    SourceLanguage: from,
    TargetLanguage: to,
  }

  const headers = toSign(query, bodyData, keyConfig)

  try {
    // const res = await axios.post(url + `?${query}`, bodyData, { headers })
    const resData = await fetch(`${url}?${query}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData),
    }).then(res => {
      return res.json()
    })
    const { TranslationList } = resData
    const ResponseMetadata = resData.ResponseMetadata || resData.ResponseMetaData
    let result
    const apiError = ResponseMetadata?.Error?.Code
    if (apiError) {
      return 返回状态码及信息(500, null, 错误信息[apiError])
    } else {
      const text = TranslationList[0].Translation
      result = 返回状态码及信息(200, { text })
    }
    return result
  } catch (err: any) {
    const apiError = err?.response?.data?.ResponseMetadata?.Error?.Code
    if (apiError) {
      return 返回状态码及信息(500, null, 错误信息[apiError])
    } else {
      return 返回状态码及信息(500)
    }
  }
}

/** 获取规范化header数组 */
function getCanonicalHeadersArr(headers: any) {
  const result: any[] = []
  Object.keys(headers).forEach(key => {
    result.push({
      key: key.toLowerCase(),
      value: headers[key],
    })
  })
  result.sort((h1, h2) => {
    return h1.key.charCodeAt() - h2.key.charCodeAt()
  })
  return result
}

/** 获取UTC时间 */
function getUtcDate() {
  const date = new Date()
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')
  return `${year + month + day}T${hours}${minutes}${seconds}Z`
}

/** 生成签名 */
function toSign(query: string, bodyData: object, keyConfig: any) {
  const payload = JSON.stringify(bodyData)
  // const payload = bodyData
  const { accessKeyId, secretAccessKey } = keyConfig
  // const nowTime = dayjs().add('-8', 'h')
  // const xDate = nowTime.format('YYYYMMDDTHHmmss[Z]')
  const xDate = getUtcDate()
  // const xDate = iso8601().replace(/[:\-]|\.\d{3}/g, '')
  const date = xDate.slice(0, 8)

  const headers: any = {
    Host: 'open.volcengineapi.com',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Sha256': SHA256(payload).toString(encHex),
    'X-Date': xDate,
  }

  const headerArr = getCanonicalHeadersArr(headers)
  const headerKeys = headerArr.map(item => item.key)
  const region = 'cn-north-1'
  const service = 'translate'
  /** 1. 创建一个正规化请求  */
  const HTTPRequestMethod = 'POST'
  const CanonicalURI = '/'
  const CanonicalQueryString = query
  let CanonicalHeaders = ''
  headerArr.forEach(item => {
    CanonicalHeaders += `${item.key}:${item.value}\n`
  })
  const SignedHeaders = headerKeys.join(';')

  const CanonicalRequest = `${HTTPRequestMethod}\n${CanonicalURI}\n${CanonicalQueryString}\n${CanonicalHeaders}\n${SignedHeaders}\n${SHA256(
    payload
  ).toString(encHex)}`

  /** 2. 创建签名字符串 */
  //
  const Algorithm = 'HMAC-SHA256'
  const RequestDate = xDate
  const CredentialScope = `${date}/${region}/${service}/request`
  const StringToSign = `${Algorithm}\n${RequestDate}\n${CredentialScope}\n${
    // HexEncode(Hash(CanonicalRequest))
    SHA256(CanonicalRequest).toString(encHex)
  }`
  //

  /** 3：构建签名 */
  //
  // const Signingkey = HMAC(HMAC(HMAC(HMAC(kSecret,"20201230"),"cn-north-1"),"iam"),"request");

  const kDate = hmacSHA256(date, secretAccessKey)
  const kRegion = hmacSHA256(region, kDate)
  const kService = hmacSHA256(service, kRegion)
  const kSigning = hmacSHA256('request', kService)
  const signature = hmacSHA256(StringToSign, kSigning).toString(encHex)
  //

  /** 4：将签名添加到请求当中 */
  //
  const authorization = `HMAC-SHA256 Credential=${accessKeyId}/${CredentialScope}, SignedHeaders=${SignedHeaders}, Signature=${signature}`
  //
  headers.Authorization = authorization
  //
  return headers
}
