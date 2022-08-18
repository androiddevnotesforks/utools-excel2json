// MainView用到的所有功能模块
// TODO:直接导出这些，MainView里面直接import{...} from 这个文件 用
import useUtools from '@/views/MainView/useUtools'
import use语音朗读模块 from '@/views/MainView/useVoice'
import use复制模块 from '@/views/MainView/useCopy'
import use命名模式模块 from '@/views/MainView/useNamingMode'
import use主题 from '@/views/MainView/useTheme'
import 关闭窗口 from '@/views/MainView/useExit'
import { 通用翻译 } from '@/apis/translation/index'

export const 主页功能 = {
  useUtools,
  use语音朗读模块,
  use复制模块,
  use命名模式模块,
  use主题,
  关闭窗口,
  通用翻译,
}
