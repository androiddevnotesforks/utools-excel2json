import { throttle } from 'lodash-es'

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
export const 离线loading = ref(false)
const 要读的文字 = ref('')
export const {
  isSupported: 支持离线朗读,
  speak: 开始离线朗读,
  status: 离线朗读状态,
} = useSpeechSynthesis(要读的文字, { voice })

export function 初始化离线语音() {
  if (支持离线朗读.value) {
    let synth: SpeechSynthesis
    setTimeout(() => {
      synth = window.speechSynthesis
      voice.value = synth.getVoices().filter(i => i.lang === 'en-US')[0]
    })
  }
}

const 离线朗读开始 = throttle(() => {
  离线朗读停止()
  开始离线朗读()
})

export function 离线朗读控制(str: string) {
  if (!str) {
    return
  }
  要读的文字.value = str
  离线朗读状态.value === 'play' ? 离线朗读停止() : 离线朗读开始()
}

export function 离线朗读停止() {
  window.speechSynthesis.cancel()
}

// 返回随机数
export function 来个随机数(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// function 离线朗读开始() {
//   if (离线朗读状态.value === 'pause') {
//     window.speechSynthesis.resume()
//   } else {
//     开始离线朗读()
//   }

//   // 离线loading.value = true
//   // setTimeout(() => {
//   //   离线loading.value = false
//   //   离线朗读停止()
//   //   开始离线朗读()
//   // }, 来个随机数(300, 1000))
// }
