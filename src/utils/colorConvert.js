const 验证Hex合法性 = hex => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)
function 分割hex(st, chunkSize) {
  const 动态正则 = new RegExp(`.{${chunkSize}}`, 'g')
  return st.match(动态正则)
}
const hex转256 = hexStr => parseInt(hexStr.repeat(2 / hexStr.length), 16)
export function hex转rgb(hex) {
  if (!验证Hex合法性(hex)) throw new Error('hex值有误')
  const 每组长度 = Math.floor((hex.length - 1) / 3)
  const 去掉井的hex = hex.slice(1)
  const 分割后的数组 = 分割hex(去掉井的hex, 每组长度)
  const [r, g, b] = 分割后的数组.map(hex转256)
  return `${r}, ${g}, ${b}`
}
