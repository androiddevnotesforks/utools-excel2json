/** 主题相关业务 */
import { storeToRefs } from 'pinia'
import { setTheme } from '@/utils/setTheme'
import { 用户设置存储 } from '@/store/userSetting'

watchEffect(() => {
  const { theme: 主题色 } = storeToRefs(用户设置存储())
  const 系统颜色 = usePreferredColorScheme()
  const theme = 主题色.value === 'auto' ? 系统颜色.value : 主题色.value
  setTheme(theme)
})
