/** 本地数据存储 */

const utools = window.utools

/** 数据读取某一项 */
export function getDbStorageItem(key: string, defaultValue?: any) {
  const fn = (tempKey: string): string => {
    if (utools) {
      return utools.dbStorage.getItem(tempKey) || ''
    } else {
      return window.localStorage.getItem(tempKey) || ''
    }
  }

  const tempStr: string = fn(key)
  if (!tempStr) {
    return defaultValue
  }

  // 根据默认值及类型处理
  let result: any
  try {
    const typeStr = typeof defaultValue
    if (typeStr === 'number') {
      result = Number.parseFloat(tempStr)
    } else if (typeStr === 'object') {
      result = JSON.parse(tempStr)
    } else if (typeStr === 'boolean') {
      result = !!(tempStr === 'true' || false)
    } else {
      result = tempStr
    }
  } catch (error) {
    //
    console.error('getDbStorageItem error', error)
  }

  return result || defaultValue
}

/** 数据存储某一项 */
export function setDbStorageItem(
  key: string,
  value: string | number | boolean | object | any[]
) {
  const fn = (tempKey: string, tempValue: string) => {
    if (utools) {
      utools.dbStorage.setItem(tempKey, tempValue)
    } else {
      window.localStorage.setItem(tempKey, tempValue)
    }
  }

  let localStr = ''
  if (typeof value === 'string') {
    localStr = value
  } else {
    localStr = JSON.stringify(value)
  }

  fn(key, localStr)
}

/** 移除数据 */
export function removeDbStorageItem(key: string) {
  if (utools) {
    return utools.dbStorage.removeItem(key)
  } else {
    return window.localStorage.removeItem(key)
  }
}
