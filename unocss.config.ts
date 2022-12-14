import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { primaryColor } from './src/config/colorConfig'
export default defineConfig({
  shortcuts: [
    {
      'flex-c': 'flex items-center justify-center',
      'flex-y-c': 'flex items-center',
      'grid-c': 'grid place-items-center',
      'absolute-x-center': 'absolute left-1/2 -translate-x-1/2',
      'absolute-y-center': 'absolute top-1/2 -translate-y-1/2',
      'absolute-center': 'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
    },
    [/^horizontal-place-(.*)$/, ([, c]) => `flex items-center space-x-${c}`],
  ],
  presets: [
    presetWind(),
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        'margin-top': '-1px',
      },
    }),
  ],
  theme: {
    colors: {
      primary: primaryColor,
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  variants: [
    // 因为.scss文件里面,uno不能写"!xxx"去表示 !importannt ,会报错
    // 这里为important写一种变体，让以"I_"开头的class也是important，兼容scss文件
    matcher => {
      if (!matcher.startsWith('I_')) {
        return matcher
      }
      return {
        matcher: matcher.slice(2),
        body: body => {
          body.forEach(v => {
            if (v[1]) {
              v[1] += ' !important'
            }
          })
          return body
        },
      }
    },
  ],
  safelist: ['mt-6px', 'mt-16px'],
})
