/**
 * 替换字符串中的占位符
 * @param str 要替换的字符串
 * @param replace [要替换的字符串，替换后的字符串]
 * @returns 替换后的字符串
 */
export function 替换字符串(str: string, replace: [string, string]) {
  return str.replaceAll(replace[0], replace[1])
}

const 验证Hex合法性 = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)
function 分割hex(st: string, chunkSize: number): string[] {
  const 动态正则 = new RegExp(`.{${chunkSize}}`, 'g')
  return st.match(动态正则) || []
}
function hex转256(hexStr: string) {
  return parseInt(hexStr.repeat(2 / hexStr.length), 16)
}

/**
 * hex转rgb
 * @param hex 要转换的hex值,如#333、#5b61ff
 * @returns rgb值，如 '91, 97, 255'
 */
export function hex转rgb(hex: string) {
  if (!验证Hex合法性(hex)) {
    throw new Error('hex值有误')
  }
  const 每组长度 = Math.floor((hex.length - 1) / 3)
  const 去掉井的hex = hex.slice(1)
  const 分割后的数组 = 分割hex(去掉井的hex, 每组长度)
  const [r, g, b] = 分割后的数组.map(hex转256)
  return `${r}, ${g}, ${b}`
}

/**
 *
 * @param min 最小值
 * @param max 最大值
 * @returns 返回一个在min和max之间的随机[整]数(不包含min和max)
 */
export function 来个随机数(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
