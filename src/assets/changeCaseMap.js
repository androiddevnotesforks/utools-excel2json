import {
  camelCase,
  paramCase,
  pascalCase,
  snakeCase,
  constantCase,
  capitalCase,
  dotCase,
  headerCase,
  noCase,
  pathCase
} from 'change-case'

export const 切换类型数组 = [
  { name: 'camelCase', handle: camelCase, label: '驼峰(小)' },
  { name: 'pascalCase', handle: pascalCase, label: '驼峰(大)' },
  { name: 'snakeCase', handle: snakeCase, label: '下划线' },
  { name: 'paramCase', handle: paramCase, label: '中划线(小)' },
  { name: 'headerCase', handle: headerCase, label: '中划线(大)' },
  { name: 'noCase', handle: noCase, label: '分词(小)' },
  { name: 'capitalCase', handle: capitalCase, label: '分词(大)' },
  { name: 'dotCase', handle: dotCase, label: '对象属性' },
  { name: 'pathCase', handle: pathCase, label: '文件路径' },
  { name: 'constantCase', handle: constantCase, label: '常量' }
]
