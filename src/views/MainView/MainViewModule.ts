// MainView用到的所有功能模块
// 直接导出这些，MainView里面直接import{...} from 这个文件 用
export { default as useUtools } from '@/views/MainView/useUtools'
export { default as use语音朗读模块 } from '@/views/MainView/useVoice'
export { default as use复制模块 } from '@/views/MainView/useCopy'
export { default as use命名模式模块 } from '@/views/MainView/useNamingMode'
export { default as use主题 } from '@/views/MainView/useTheme'
export { default as 关闭窗口 } from '@/views/MainView/useExit'
export { 通用翻译 } from '@/apis/translation/index'
