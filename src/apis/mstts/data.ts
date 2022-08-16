import type { 语种 } from '@/assets/translateApiOption'
const 发音角色Map = new Map([
  ['云健', 'zh-CN-YunjianNeural'],
  ['晓秋', 'zh-CN-XiaoqiuNeural'],
  ['云龙', 'zh-HK-WanLungNeural'],
  ['晓佳', 'zh-HK-HiuGaaiNeural'],
  ['Jenny', 'en-US-JennyNeural'],
  ['Guy', 'en-US-GuyNeural'],
  ['圭太', 'ja-JP-KeitaNeural'],
  ['七海', 'ja-JP-NanamiNeural'],
  ['Svetlana', 'ru-RU-SvetlanaNeural'],
  ['Dmitry', 'ru-RU-DmitryNeural'],
  ['inJoon', 'ko-KR-InJoonNeural'],
  ['Sun-Hi', 'ko-KR-SunHiNeural'],
  ['Conrad', 'de-DE-ConradNeural'],
  ['Elke', 'de-DE-ElkeNeural'],
  ['Maurice', 'fr-FR-MauriceNeural'],
  ['Denise', 'fr-FR-DeniseNeural'],
  ['Alvaro', 'es-ES-AlvaroNeural'],
  ['Elvira', 'es-ES-ElviraNeural'],
  ['Achara', 'th-TH-AcharaNeural'],
  ['Niwat', 'th-TH-NiwatNeural'],
])

function 获取发音人(str = '') {
  return 发音角色Map.get(str) || 'zh-CN-XiaoxiaoNeural'
}

interface 声音映射item {
  male: string
  female: string
  default: string
  rate?: number
}

export type 声音映射Type = {
  [key in 语种]?: 声音映射item
}

export const 声音映射: 声音映射Type = {
  zh: {
    male: 获取发音人('云健'),
    female: 获取发音人('晓秋'),
    default: 获取发音人('晓秋'),
  },
  en: {
    male: 获取发音人('Guy'),
    female: 获取发音人('Jenny'),
    default: 获取发音人('Jenny'),
  },
  jp: {
    male: 获取发音人('圭太'),
    female: 获取发音人('七海'),
    default: 获取发音人('圭太'),
  },
  ru: {
    male: 获取发音人('Dmitry'),
    female: 获取发音人('Svetlana'),
    default: 获取发音人('Svetlana'),
  },
  de: {
    male: 获取发音人('Conrad'),
    female: 获取发音人('Elke'),
    default: 获取发音人('Conrad'),
  },
  fra: {
    male: 获取发音人('Maurice'),
    female: 获取发音人('Denise'),
    default: 获取发音人('Maurice'),
  },
  spa: {
    male: 获取发音人('Alvaro'),
    female: 获取发音人('Elvira'),
    default: 获取发音人('Elvira'),
  },
  th: {
    male: 获取发音人('Niwat'),
    female: 获取发音人('Achara'),
    default: 获取发音人('Niwat'),
  },
  yue: {
    male: 获取发音人('云龙'),
    female: 获取发音人('晓佳'),
    default: 获取发音人('云龙'),
    rate: 1.1,
  },
  cht: {
    male: 获取发音人('云健'),
    female: 获取发音人('晓秋'),
    default: 获取发音人('云健'),
  },
  kor: {
    male: 获取发音人('inJoon'),
    female: 获取发音人('Sun-Hi'),
    default: 获取发音人('inJoon'),
  },
}
