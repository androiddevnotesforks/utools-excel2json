import type { 级联值类型 } from '@MainView/MainViewTypes'
import { 汉字和汉字符号正则, 用户设置存储, 符号数字reg } from '@MainView/MainViewData'
import { replace } from 'lodash-es'

/**
 * @param str 要获取的字符串
 * @param num 获取几个字
 * @returns 返回传入字符串中，有效字符串（去除数字和英文符号）的前n个字符串
 */
function 获取字符串有效前n个字(str: string, num: number) {
  return 获取有效输入文字(str).substring(0, num)
}

/**
 * @param str 用户输入的全部字符串
 * @returns 去除掉符号和数字的字符串
 */
function 获取有效输入文字(str: string) {
  return replace(str, 符号数字reg, '')
}

export function 获取级联的值(用户输入: string) {
  let arr: 级联值类型
  const 存储 = 用户设置存储()
  const { defaultForeignLanguage: 默认目标外语语种 } = storeToRefs(存储)
  const 目标外语 = 默认目标外语语种.value
  const 有效输入 = 获取有效输入文字(用户输入)
  if (有效输入.length < 20) {
    const 第一个字是否汉字 = !!获取字符串有效前n个字(用户输入, 1).match(
      汉字和汉字符号正则
    )

    arr = ['auto', 第一个字是否汉字 ? 目标外语 : 'zh']
  } else {
    const 抽样数量 = 20
    const 比例 = 0.35
    const 抽样文字 = 获取字符串有效前n个字(用户输入, 抽样数量)
    const 一部分字包含汉字数 = 抽样文字.match(汉字和汉字符号正则)?.length ?? 0
    const 汉字占抽样文字的比例 = parseFloat((一部分字包含汉字数 / 抽样数量).toFixed(3))
    const 抽样文字大多汉字 = 汉字占抽样文字的比例 >= 比例
    arr = ['auto', 抽样文字大多汉字 ? 目标外语 : 'zh']
  }
  return arr
}
