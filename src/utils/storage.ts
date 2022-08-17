/** 本地数据存储 */

const utools = window.utools

/** 数据读取某一项 */
export function getDbStorageItem(key: string) {
  if (utools) {
    return utools.dbStorage.getItem(key)
  } else {
    return window.localStorage.getItem(key)
  }
}

/** 数据存储某一项 */
export function setDbStorageItem(key: string, value: any) {
  if (utools) {
    return utools.dbStorage.setItem(key, value)
  } else {
    return window.localStorage.setItem(key, value)
  }
}

/** 移除数据 */
export function removeDbStorageItem(key: string) {
  if (utools) {
    return utools.dbStorage.removeItem(key)
  } else {
    return window.localStorage.removeItem(key)
  }
}
