const baseUrl = import.meta.env.VITE_UNIAPI_BASEURL

/**
 * 语音朗读 生成mp3文件
 * 暂未找到较合适的文件删除方案,会导致云存储空间浪费;文件到云函数解析后再次经过上传，加长了请求周期
 * @deprecated 请使用【语音朗读生成base64】来替代
 * @param {*} 文本 要朗读的文本
 * @param {*} 角色声音 朗读文本的角色信息
 * @param {*} 上次发音 上一次的语音id
 * @returns
 */
export async function 语音朗读生成mp3(文本, 角色声音, 上次发音) {
  const res = await fetch(baseUrl + '/mstts/file', {
    method: 'POST',
    body: JSON.stringify({
      text: 文本,
      voice: 角色声音,
      lastAudioId: 上次发音
    })
  }).then(res => res.json())
  return res
}

/**
 * 语音朗读 直接生成base64
 * @param {*} text 要朗读的文本
 * @param {*} voice 朗读文本的角色信息 不传默认zh-CN-YunjianNeural
 * @param {*} rate 语速 0.5 ~ 3.0 不传默认1
 * @param {*} pitch 语调 0 ~ 2 不传默认1
 * @returns
 */
export async function 语音朗读生成base64({ text, voice, rate, pitch }) {
  const res = await fetch(baseUrl + '/mstts/base64', {
    timeout: 300000,
    method: 'POST',
    responseType: 'blob',
    body: JSON.stringify({
      text,
      voice,
      rate,
      pitch
    })
  })

  return res.blob()
}

/**
 * 语音朗读 直接生成base64
 * @param {*} text 要朗读的文本
 * @param {*} voice 朗读文本的角色信息 不传默认zh-CN-YunjianNeural
 * @param {*} rate 语速 0.5 ~ 3.0 不传默认1
 * @param {*} pitch 语调 0 ~ 2 不传默认1
 * @returns
 */
export async function 语音朗读生成ArrayBuffer({ text, voice, rate, pitch }) {
  if (window.servers) {
    const options = pickBy(
      {
        text,
        voice,
        rate,
        pitch
      },
      val => {
        return val !== null && val !== undefined
      }
    )

    return window.servers.voiceReading(options)
  }
}
