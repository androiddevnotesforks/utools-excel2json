// MainView用到的所有功能模块
export { useUtools } from '@MainView/useUtools'
export { use语音朗读模块 } from '@MainView/useVoice'
export { use复制模块 } from '@MainView/useCopy'
export { use命名模式模块 } from '@MainView/useNamingMode'
export { use主题 } from '@MainView/useTheme'
export { use快捷键 } from '@MainView/useShortcutKey'
export { 关闭窗口 } from '@MainView/useExit'
export { 通用翻译 } from '@/apis/translation/index'
export { 获取级联的值 } from '@MainView/useCheckChinese'
export { 检查from和to是否兼容 } from '@MainView/useCheckFromTo'
export { 未配置服务引导, 首次引导 } from '@MainView/useGuide'
export {
  离线朗读控制,
  离线朗读状态,
  初始化离线语音,
  离线朗读停止,
  支持离线朗读,
} from '@MainView/useOutlineVoice'
