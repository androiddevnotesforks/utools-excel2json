// MainView用到的所有数据
export { api不支持的大对象, 语种树 } from '@/assets/translateApiOption'
export { 用户设置存储 } from '@/store/userSetting'
export const 汉字和汉字符号正则 =
  /\p{Script=Han}|[\u3002|\uFF1F|\uFF01|\uFF0C|\u3001|\uFF1B|\uFF1A|\u201C|\u201D|\u2018|\u2019|\uFF08|\uFF09|\u300A|\u300B|\u3008|\u3009|\u3010|\u3011|\u300E|\u300F|\u300C|\u300D|\uFE43|\uFE44|\u3014|\u3015|\u2026|\u2014|\uFF5E|\uFE4F|\uFFE5]/gu
export const 符号数字reg = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E\s\d]/g
