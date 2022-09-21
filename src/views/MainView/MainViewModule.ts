// MainView用到的所有功能模块
export { useUtools } from '@MainView/useUtools'
export { 复制主函数 } from '@MainView/useCopy'
export { use命名模式模块 } from '@MainView/useNamingMode'
export { 判断快捷键, 当前按下的所有键 } from '@MainView/useShortcutKey'
export { 通用翻译 } from '@/apis/translation/index'
export { 获取级联的值 } from '@MainView/useCheckChinese'
export { 检查from和to是否兼容 } from '@MainView/useCheckFromTo'
export { 未配置服务引导, 首次引导 } from '@MainView/useGuide'
export {
  离线朗读主函数,
  离线朗读状态,
  初始化离线语音,
  离线朗读停止,
  支持离线朗读,
  离线loading,
} from '@MainView/useOutlineVoice'

export {
  在线朗读主函数,
  朗读loading,
  正在播放,
  重置音频,
  音频Url,
} from '@MainView/useVoice'
