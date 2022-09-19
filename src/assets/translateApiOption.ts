import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
export const apiOptions = [
  { label: '谷歌翻译', value: 'google' },
  { label: '百度翻译', value: 'baidu' },
  { label: '腾讯翻译', value: 'tencent' },
  { label: '阿里翻译', value: 'ali' },
  { label: '有道翻译', value: 'youdao' },
  { label: '彩云小译', value: 'caiyun' },
  { label: '火山翻译', value: 'huoshan' },
  { label: '小牛翻译', value: 'xiaoniu' },
]
export type 语种 =
  | 'zh'
  | 'en'
  | 'jp'
  | 'ru'
  | 'kor'
  | 'de'
  | 'fra'
  | 'spa'
  | 'pt'
  | 'th'
  | 'cht'
  | 'yue'
  | 'wyw'

const onlyChinese: Exclude<语种, 'zh'>[] = [
  'en',
  'jp',
  'ru',
  'kor',
  'de',
  'fra',
  'spa',
  'pt',
  'th',
  'cht',
  'yue',
  'wyw',
]

interface 不支持对象 {
  auto: 语种[]
  zh: 语种[]
  en: 语种[]
  jp: 语种[]
  ru: 语种[]
  kor?: 语种[]
  de?: 语种[]
  fra?: 语种[]
  spa?: 语种[]
  pt?: 语种[]
  th?: 语种[]
  yue?: 语种[]
  cht?: 语种[]
}

interface 大对象item基础类型 {
  from不支持: string[]
  to不支持: string[] | undefined
  自定义不支持: 不支持对象 | undefined
}

interface 大对象item类型 {
  [key: string]: 大对象item基础类型
}

export const api不支持的大对象: 大对象item类型 = {
  google: {
    from不支持: ['yue', 'wyw'],
    to不支持: ['yue', 'wyw'],
    自定义不支持: undefined,
  },
  baidu: {
    from不支持: [],
    to不支持: [],
    自定义不支持: undefined,
  },
  tencent: {
    from不支持: ['yue', 'wyw'],
    自定义不支持: {
      auto: ['yue', 'wyw'],
      zh: ['yue', 'wyw'],
      en: ['yue', 'wyw'],
      jp: ['ru', 'de', 'fra', 'spa', 'pt', 'th', 'yue', 'wyw'],
      ru: ['jp', 'kor', 'th', 'yue', 'wyw'],
      kor: ['ru', 'de', 'fra', 'spa', 'pt', 'th', 'yue', 'wyw'],
      de: ['jp', 'kor', 'th', 'yue', 'wyw'],
      fra: ['jp', 'kor', 'th', 'yue', 'wyw'],
      pt: ['jp', 'kor', 'th', 'yue', 'wyw'],
      spa: ['jp', 'kor', 'th', 'yue', 'wyw'],
      th: ['ru', 'de', 'jp', 'kor', 'fra', 'pt', 'spa', 'th', 'yue', 'wyw'],
      cht: ['yue', 'wyw'],
    },
    to不支持: undefined,
  },
  ali: {
    from不支持: ['wyw'],
    自定义不支持: {
      auto: ['wyw', 'yue'],
      zh: ['wyw'],
      en: ['cht', 'wyw', 'yue'],
      jp: ['cht', 'wyw', 'yue'],
      ru: ['cht', 'wyw', 'yue'],
      kor: ['cht', 'wyw', 'yue'],
      de: ['cht', 'wyw', 'yue'],
      fra: ['cht', 'wyw', 'yue'],
      spa: ['cht', 'wyw', 'yue'],
      pt: ['cht', 'wyw', 'yue'],
      th: ['cht', 'wyw', 'yue'],
      yue: ['en', 'jp', 'ru', 'kor', 'de', 'fra', 'spa', 'th', 'cht', 'wyw'],
      cht: ['jp', 'ru', 'kor', 'de', 'fra', 'spa', 'th', 'wyw', 'yue'],
    },
    to不支持: undefined,
  },
  youdao: {
    from不支持: ['wyw'],
    to不支持: ['wyw'],
    自定义不支持: undefined,
  },
  caiyun: {
    from不支持: ['kor', 'de', 'fra', 'spa', 'th', 'cht', 'yue', 'wyw'],
    自定义不支持: {
      auto: ['kor', 'de', 'fra', 'pt', 'spa', 'th', 'cht', 'yue', 'wyw'],
      zh: ['zh', 'kor', 'de', 'fra', 'pt', 'spa', 'th', 'cht', 'yue', 'wyw'],
      en: onlyChinese, // 只支持中文
      jp: onlyChinese, // 只支持中文
      ru: onlyChinese, // 只支持中文
    },
    to不支持: undefined,
  },
  huoshan: {
    from不支持: ['yue', 'wyw'],
    to不支持: ['yue', 'wyw'],
    自定义不支持: undefined,
  },
  xiaoniu: {
    from不支持: ['wyw'],
    to不支持: ['wyw'],
    自定义不支持: undefined,
  },
}
export interface 语种类型 {
  label: string
  value: string
  disabled: boolean
  id: string
  children?: 语种类型[]
}
const translateFromOptions: 语种类型[] = [
  { label: '自动检测', value: 'auto', disabled: false, id: nanoid() },
  { label: '中文-简', value: 'zh', disabled: false, id: nanoid() },
  { label: '英语', value: 'en', disabled: false, id: nanoid() },
  { label: '日语', value: 'jp', disabled: false, id: nanoid() },
  { label: '俄语', value: 'ru', disabled: false, id: nanoid() },
  { label: '韩语', value: 'kor', disabled: false, id: nanoid() },
  { label: '德语', value: 'de', disabled: false, id: nanoid() },
  { label: '法语', value: 'fra', disabled: false, id: nanoid() },
  { label: '西班牙语', value: 'spa', disabled: false, id: nanoid() },
  { label: '葡萄牙语', value: 'pt', disabled: false, id: nanoid() },
  { label: '泰语', value: 'th', disabled: false, id: nanoid() },
  { label: '粤语', value: 'yue', disabled: false, id: nanoid() },
  { label: '中文-繁', value: 'cht', disabled: false, id: nanoid() },
  { label: '文言文', value: 'wyw', disabled: false, id: nanoid() },
]

export function 语种树(arr = translateFromOptions) {
  const tmpArr = cloneDeep(arr)
  tmpArr.forEach(i => {
    i.children = arr
      .filter(r => r.value !== 'auto')
      .map(j => {
        return {
          ...j,
          id: nanoid(),
        }
      })
  })
  return tmpArr
}
