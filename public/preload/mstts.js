var got = require('got')
const { v4: uuidv4 } = require('uuid')
const ws = require('nodejs-websocket')

async function getAuthToken() {
  const url =
    'https://azure.microsoft.com/en-gb/services/cognitive-services/text-to-speech/'

  // const res = await axios.get(url)

  const res = await got(url)

  const reg = /token: "(.*?)"/

  if (reg.test(res.body)) {
    const token = RegExp.$1
    return token
  }
}

function getXTime() {
  return new Date().toISOString()
}

function wssSend(connect, msg) {
  return new Promise(resolve => {
    connect.send(msg, resolve)
  })
}

function wssConnect(url) {
  return new Promise(resolve => {
    const connect = ws.connect(url, function () {
      resolve(connect)
    })
  })
}

async function getTTSData(
  text,
  voice = 'zh-CN-Yunxi',
  express = 'general',
  role = '',
  rate = 0,
  pitch = 0
) {
  if (!express) express = 'general'
  const SSML = `
    <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <mstts:express-as style="${express}" ${role !== '' ? 'role="' + role + '"' : ''
    }>
                <prosody rate="${rate}%" pitch="${pitch}%">
                ${text}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `
  console.log('SSML:', SSML)

  console.log('获取Token...')
  const Authorization = await getAuthToken()
  const XConnectionId = uuidv4().toUpperCase()

  console.log('创建webscoket连接...1')
  // const connect = await wssConnect(`wss://eastus.tts.speech.microsoft.com/cognitiveservices/websocket/v1?Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`)
  const connect = await wssConnect(`wss://eastus.api.speech.microsoft.com/cognitiveservices/websocket/v1?TrafficType=AzureDemo&Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`);


  console.log('第1次上报...')
  const message_1 = `Path: speech.config\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.19.0","build":"JavaScript","lang":"JavaScript","os":{"platform":"Browser/Linux x86_64","name":"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0","version":"5.0 (X11)"}}}}`
  await wssSend(connect, message_1)

  console.log('第2次上报...')
  const message_2 = `Path: synthesis.context\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"synthesis":{"audio":{"metadataOptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":false},"outputFormat":"audio-24khz-160kbitrate-mono-mp3"}}}`
  await wssSend(connect, message_2)

  console.log('第3次上报...')
  const message_3 = `Path: ssml\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/ssml+xml\r\n\r\n${SSML}`
  await wssSend(connect, message_3)

  return new Promise(resolve => {
    let final_data = Buffer.alloc(0)
    console.log('正在接收数据...')
    connect.on('text', data => {
      if (data.indexOf('Path:turn.end') >= 0) {
        console.log('已完成')
        connect.close()
        resolve(final_data)
      }
    })
    connect.on('binary', function (response) {
      // console.log("正在接收数据...");
      let data = Buffer.alloc(0)
      response.on('readable', function () {
        const newData = response.read()
        if (newData)
          data = Buffer.concat([data, newData], data.length + newData.length)
      })
      response.on('end', function () {
        const index = data.toString().indexOf('Path:audio') + 10
        const cmbData = data.slice(index + 2)
        final_data = Buffer.concat([final_data, cmbData])
      })
    })
  })
}

exports.getTTSData = getTTSData
