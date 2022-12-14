/** 语音朗读相关业务 */
import { Message as 提示 } from '@arco-design/web-vue'
import type { 语种 } from '@/assets/translateApiOption'
import { 用户设置存储 } from '@/store/userSetting'
import { 语音朗读生成ArrayBuffer, 语音朗读生成base64 } from '@/apis/mstts/index'
import { 声音映射 } from '@/apis/mstts/data'
import { 上传日志 } from '@/apis/log'
export type 级联值类型 = [语种 | 'auto', 语种]

const 朗读性别偏好 = computed(() => {
  return 用户设置存储().readingPreference
})

const audio本体 = ref(new Audio())
export const 音频Url = ref('')
export const 朗读loading = ref(false) // 译文发音按钮的Loading
export const { playing: 正在播放 } = useMediaControls(audio本体, { src: 音频Url })

// 重置音频
export function 重置音频() {
  正在播放.value = false
  音频Url.value = ''
}

// 播放语音
async function 播放音频(朗读文本: string, 声音: string, 语速: number) {
  const params = {
    voice: 声音,
    rate: 语速,
    text: 朗读文本,
  }
  const 原始文件流 = await 语音朗读生成base64(params)
  if (原始文件流.type === 'audio/mp3') {
    音频Url.value = window.URL.createObjectURL(原始文件流)
    正在播放.value = true
  } else {
    提示.error('啊哦，播放出错了，请再试一次吧！')
  }

  上传日志('朗读')
}

// 播放语音
async function 播放音频V2(朗读文本: string, 声音: string, 语速: number) {
  const params = {
    voice: 声音,
    rate: 语速,
    text: 朗读文本,
  }
  const arrayBuffer = await 语音朗读生成ArrayBuffer(params)
  const file = new File([arrayBuffer], 'temp.mp3')
  音频Url.value = window.URL.createObjectURL(file)
  正在播放.value = true
}

export async function 在线朗读主函数(str: string, 译文语言标识: 语种) {
  if (朗读loading.value) {
    提示.warning({ content: '加载音频中，请稍等', duration: 1500 })
    return
  }
  重置音频()
  const 声音对象: any = 声音映射[译文语言标识] || 声音映射.zh!
  // 读取发音配置
  const 声音 = 声音对象[朗读性别偏好.value]
  const 语速 = 声音对象?.rate || 1

  朗读loading.value = true
  if (window.utools) {
    await 播放音频V2(str, 声音, 语速)
  } else {
    await 播放音频(str, 声音, 语速)
  }
  朗读loading.value = false
}
