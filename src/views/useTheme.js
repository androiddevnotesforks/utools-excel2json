/** 主题相关业务 */
import { setTheme } from '@/utils/setTheme.js'
import { storeToRefs } from 'pinia'
import { 用户设置存储 } from '@/store/userSetting'

export default function () {
  const { theme: 主题色 } = storeToRefs(用户设置存储())
  const 系统颜色 = usePreferredColorScheme()

  // 自动设置主题
  watchEffect(() => {
    const theme = 主题色.value === 'auto' ? 系统颜色.value : 主题色.value
    setTheme(theme)
  })
}
