/**
 * 腾讯翻译接口
 * https://cloud.tencent.com/document/api/551/15619
 *  */
import SHA256 from 'crypto-js/sha256'
import encHex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import axios from 'axios'
import dayjs from 'dayjs'
import { 返回状态码及信息 } from '../common'

const 错误信息 = {
  ActionOffline: '接口已下线。',
  'AuthFailure.InvalidAuthorization':
    '请求头部的 Authorization 不符合腾讯云标准。',
  'AuthFailure.InvalidSecretId': '密钥非法（不是云 API 密钥类型）。',
  'AuthFailure.MFAFailure': 'MFA 错误。',
  'AuthFailure.SecretIdNotFound':
    '密钥不存在。请在 控制台 检查密钥是否已被删除或者禁用，如状态正常，请检查密钥是否填写正确，注意前后不得有空格。',
  'AuthFailure.SignatureExpire':
    '签名过期。Timestamp 和服务器时间相差不得超过五分钟，请检查本地时间是否和标准时间同步。',
  'AuthFailure.SignatureFailure':
    '签名错误。签名计算错误，请对照调用方式中的签名方法文档检查签名计算过程。',
  'AuthFailure.TokenFailure': 'token 错误。',
  'AuthFailure.UnauthorizedOperation':
    '请求未授权。请参考 CAM 文档对鉴权的说明。',
  DryRunOperation:
    'DryRun 操作，代表请求将会是成功的，只是多传了 DryRun 参数。',
  // FailedOperation: '操作失败。',
  // InternalError: '内部错误。',
  InvalidAction: '接口不存在。',
  InvalidParameter: '参数错误（包括参数格式、类型等错误）。',
  InvalidParameterValue: '参数取值错误。',
  InvalidRequest: '请求 body 的 multipart 格式错误。',
  IpInBlacklist: 'IP地址在黑名单中。',
  IpNotInWhitelist: 'IP地址不在白名单中。',
  LimitExceeded: '超过配额限制。',
  MissingParameter: '缺少参数。',
  NoSuchProduct: '产品不存在',
  NoSuchVersion: '接口版本不存在。',
  // RequestLimitExceeded: '请求的次数超过了频率限制。',
  // 'RequestLimitExceeded.GlobalRegionUinLimitExceeded': '主账号超过频率限制。',
  // 'RequestLimitExceeded.IPLimitExceeded': 'IP限频。',
  // 'RequestLimitExceeded.UinLimitExceeded': '主账号限频。',
  RequestSizeLimitExceeded: '请求包超过限制大小。',
  // ResourceInUse: '资源被占用。',
  // ResourceInsufficient: '资源不足。',
  ResourceNotFound: '资源不存在。',
  ResourceUnavailable: '资源不可用。',
  ResponseSizeLimitExceeded: '返回包超过限制大小。',
  ServiceUnavailable: '当前服务暂时不可用。',
  UnauthorizedOperation: '未授权操作。',
  UnknownParameter: '未知参数错误，用户多传未定义的参数会导致错误。',
  UnsupportedOperation: '操作不支持。',
  UnsupportedProtocol: 'http(s) 请求协议错误，只支持 GET 和 POST 请求。',
  UnsupportedRegion: '接口不支持所传地域。',
  'FailedOperation.NoFreeAmount':
    '本月免费额度已用完，如需继续使用您可以在机器翻译控制台升级为付费使用。',
  'FailedOperation.ServiceIsolate':
    '账号因为欠费停止服务，请在腾讯云账户充值。',
  'FailedOperation.UserNotRegistered':
    '服务未开通，请在腾讯云官网机器翻译控制台开通服务。',
  'InternalError.BackendTimeout': '后台服务超时，请稍后重试。',
  // 'InternalError.ErrorUnknown': '未知错误。',
  // 'InternalError.RequestFailed': '请求失败。',
  'InvalidParameter.DuplicatedSessionIdAndSeq': '重复的SessionUuid和Seq组合。',
  'InvalidParameter.MissingParameter': '参数错误。',
  'InvalidParameter.SeqIntervalTooLarge': 'Seq之间的间隙请不要大于2000。',
  // 'LimitExceeded.LimitedAccessFrequency': '超出请求频率。',
  'UnauthorizedOperation.ActionNotFound': '请填写正确的Action字段名称。',
  'UnsupportedOperation.AudioDurationExceed':
    '音频分片长度超过限制，请保证分片长度小于8s。',
  'UnsupportedOperation.TextTooLong':
    '单次请求text超过长度限制，请保证单次请求⻓度低于2000。',
  'UnsupportedOperation.UnSupportedTargetLanguage':
    '不支持的目标语言，请参照语言列表。',
  'UnsupportedOperation.UnsupportedLanguage': '不支持的语言，请参照语言列表。',
  'UnsupportedOperation.UnsupportedSourceLanguage':
    '不支持的源语言，请参照语言列表。',
}

/**
 * 机器翻译
 * @param {String} options.q 请求翻译query(UTF-8编码)
 * @param {String} options.from 翻译源语言(可设置为auto)
 * @param {String} options.to 翻译目标语言(不可设置为auto)
 * @param {Object} options.keyConfig key配置
 */
export default async function ({ q, from, to, keyConfig }) {
  const url = import.meta.env.VITE_TENCENT_BASEURL

  const params = {
    SourceText: q,
    Source: from,
    Target: to,
    ProjectId: 0,
  }

  const { authorization, timestamp } = toSign(params, keyConfig)
  const headers = {
    'X-TC-Action': 'TextTranslate',
    'X-TC-Version': '2018-03-21',
    'X-TC-Region': 'ap-guangzhou',
    'X-TC-Timestamp': timestamp,
    Authorization: authorization,
    'Content-Type': 'application/json; charset=utf-8',
  }

  try {
    const res = await axios.post(url, params, { headers })
    const { TargetText, Error } = res.data?.Response
    let result
    if (Error) {
      // 翻译失败
      result = 返回状态码及信息(500, null, 错误信息[Error.Code])
    } else {
      result = 返回状态码及信息(200, { text: TargetText })
    }
    return result
  } catch (err) {
    console.error(err)
    return 返回状态码及信息(500)
  }
}

/** 根据时间戳(unix)获取UTC时间 */
function getDateToTimestamp(timestamp) {
  const date = new Date(timestamp * 1000)
  const year = date.getUTCFullYear()
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  const day = `0${date.getUTCDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}

/** 生成签名 */
function toSign(params, keyConfig) {
  // console.log('toSign()')
  const timestamp = dayjs().unix().toString()
  const date = getDateToTimestamp(timestamp)
  const payload = JSON.stringify(params)
  const { secretId, secretKey } = keyConfig
  const service = 'tmt'
  const host = 'tmt.tencentcloudapi.com'
  // /** 1. 拼接规范请求串 */
  // console.log('1. 拼接规范请求串 ')
  const HTTPRequestMethod = 'POST'
  const CanonicalURI = '/'
  const CanonicalQueryString = ''
  const CanonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\n`
  const SignedHeaders = 'content-type;host'
  // const HashedRequestPayload = SHA256(body).toString(encHex).toLowerCase()
  const HashedRequestPayload = SHA256(payload).toString(encHex).toLowerCase()

  const CanonicalRequest = `${HTTPRequestMethod}\n${CanonicalURI}\n${CanonicalQueryString}\n${CanonicalHeaders}\n${SignedHeaders}\n${HashedRequestPayload}`
  // console.log('CanonicalRequest:', CanonicalRequest)
  /** 2. 拼接待签名字符串 */
  // console.log('2. 拼接待签名字符串')
  const Algorithm = 'TC3-HMAC-SHA256'
  const RequestTimestamp = timestamp // 时间戳
  const CredentialScope = `${date}/${service}/tc3_request` // 需与时间戳的日期保持一致
  const HashedCanonicalRequest = SHA256(CanonicalRequest)
    .toString(encHex)
    .toLowerCase()

  const StringToSign = `${Algorithm}\n${RequestTimestamp}\n${CredentialScope}\n${HashedCanonicalRequest}`

  // console.log('StringToSign:', StringToSign)
  /** 3. 计算签名 */
  // console.log(' 3. 计算签名')

  const SecretDate = hmacSHA256(date, `TC3${secretKey}`)
  const SecretService = hmacSHA256(service, SecretDate)
  const SecretSigning = hmacSHA256('tc3_request', SecretService)
  const Signature = hmacSHA256(StringToSign, SecretSigning).toString(encHex)
  // console.log('Signature:', Signature)

  // /** 4. 拼接 Authorization */
  // console.log(' 拼接 Authorization')
  const authorization =
    `${Algorithm} ` +
    `Credential=${secretId}/${CredentialScope}, ` +
    `SignedHeaders=${SignedHeaders}, ` +
    `Signature=${Signature}`

  // console.log('authorization:', authorization)
  return { authorization, timestamp }
}
