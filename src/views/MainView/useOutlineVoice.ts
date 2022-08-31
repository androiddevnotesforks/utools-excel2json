const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)

const text = ref(`hello world`)
const speech = useSpeechSynthesis(text, {
  voice,
})
let synth: SpeechSynthesis
const voices = ref<SpeechSynthesisVoice[]>([])
onMounted(() => {
  if (speech.isSupported.value) {
    console.log('初始化了语音')
    setTimeout(() => {
      synth = window.speechSynthesis
      voices.value = synth.getVoices()
      voice.value = voices.value[0]
    })
  }
})

export const 开始 = () => {
  if (speech.status.value === 'pause') {
    console.log('resume')
    window.speechSynthesis.resume()
  } else {
    speech.speak()
  }
}

export const 暂停 = () => {
  window.speechSynthesis.pause()
}

export const 停止 = () => {
  window.speechSynthesis.cancel()
}
