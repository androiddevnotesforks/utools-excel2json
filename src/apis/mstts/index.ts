import { pickBy } from 'lodash-es'
const baseUrl = import.meta.env.VITE_UNIAPI_BASEURL

interface 朗读参数 {
  // 要朗读的文本
  text: string
  // 朗读文本的角色信息 不传默认zh-CN-YunjianNeural
  voice: string
  // 语速 0.5 ~ 3.0 不传默认1
  rate?: number
  // 语调 0 ~ 2 不传默认1
  pitch?: number
}

/**
 * 语音朗读 直接生成base64
 * @param 朗读参数
 * @returns
 */
export async function 语音朗读生成base64(朗读参数: 朗读参数) {
  const res = await fetch(`${baseUrl}/mstts/base64`, {
    method: 'POST',
    body: JSON.stringify(朗读参数),
  })
  return res.blob()
}

/**
 * 语音朗读 直接生成ArrayBuffer
 * @param 朗读参数
 * @returns
 */
export async function 语音朗读生成ArrayBuffer(朗读参数: 朗读参数) {
  if (window.servers) {
    const options = pickBy(朗读参数, val => {
      return val !== null && val !== undefined
    })

    return window.servers.voiceReading(options)
  }
}
