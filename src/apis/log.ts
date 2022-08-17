import axios from 'axios'

/**
 * 上传日志
 * @param tag 日志标识
 */
export function 上传日志(tag: string) {
  const baseUrl = import.meta.env.VITE_UNIAPI_BASEURL
  if (!import.meta.env.DEV) {
    axios(`${baseUrl}/log`, { params: { tag } })
  }
}
