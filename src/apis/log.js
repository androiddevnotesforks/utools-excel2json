import axios from 'axios'

export function updateLog(tag) {
  const baseUrl = import.meta.env.VITE_UNIAPI_BASEURL
  if (!import.meta.env.DEV) {
    axios(baseUrl + '/log', { params: { tag } })
  }
}
