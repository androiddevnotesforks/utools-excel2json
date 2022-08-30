/**
 * 用户设置存储业务
 */
import { cloneDeep } from 'lodash-es'
import Rabbit from 'crypto-js/rabbit'
import encUtf8 from 'crypto-js/enc-utf8'
import { 用户设置存储 } from '@/store/userSetting'

export function 设置存储(formData: any) {
  // 从pinia读取设置
  const settingStore = 用户设置存储()

  // 获取设置
  function 获取设置() {
    const tempFormData = settingStore.getSetingFormData
    填写表单(tempFormData)
  }

  function 填写表单(value: any) {
    Object.keys(formData).forEach(key => {
      formData[key] = value[key]
    })
  }

  function 保存设置() {
    // 密钥格式转换
    const keyDatas = {
      baidu: {
        appid: formData.appid,
        token: formData.token,
      },

      tencent: {
        secretId: formData.secretId,
        secretKey: formData.secretKey,
      },

      youdao: {
        appid: formData.youdaoId,
        appkey: formData.youdaoSecret,
      },

      ali: {
        accessKeyId: formData.accessKeyId,
        accessKeySecret: formData.accessKeySecret,
      },

      caiyun: {
        token: formData.caiyunToken,
      },

      huoshan: {
        accessKeyId: formData.huoshanAccessKeyId,
        secretAccessKey: formData.huoshanSecretAccessKey,
      },
    }
    settingStore.setHomeOption(formData.homeHasApi)
    settingStore.setDefaultStorage(formData.defaultApi)
    settingStore.setKeyConfig(keyDatas)
    settingStore.setFontSize(formData.textFont)
    settingStore.setCopyBtnBehavior(formData.copyBtnBehavior)
    settingStore.setCopyBtnShow(formData.copyBtnShow)
    settingStore.setCopyBtnShow(formData.copyBtnShow)
    settingStore.setReadAloud(formData.readAloud)
    settingStore.setReadingPreference(formData.readingPreference)
    settingStore.setTheme(formData.theme)
    settingStore.setDefaultForeignLanguage(formData.defaultForeignLanguage)
  }

  function 重置设置() {
    settingStore.reset()
  }

  function 加密(文本: string, 密码: string) {
    return Rabbit.encrypt(文本, 密码).toString()
  }

  function 解密(文本: string, 密码: string) {
    const decrypted = Rabbit.decrypt(文本, 密码)
    if (decrypted) {
      return decrypted.toString(encUtf8)
    } else {
      return ''
    }
  }

  function 导出设置(密码: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const tempFormData = cloneDeep(settingStore.getSetingFormData)
        const json = JSON.stringify(tempFormData)
        const 密文 = 加密(json, 密码)
        resolve(密文)
      } catch (error) {
        reject(error)
      }
    })
  }

  function 导入配置(文本: string, 密码: string) {
    return new Promise((resolve, reject) => {
      const json = 解密(文本, 密码)
      if (json) {
        try {
          const tempFormData = JSON.parse(json)
          填写表单(tempFormData)
          resolve(tempFormData)
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('期望转化结果为JSON'))
      }
    })
  }

  return {
    获取设置,
    保存设置,
    重置设置,
    导出设置,
    导入配置,
  }
}
