/** 用户设置信息 */
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import {
  getDbStorageItem,
  setDbStorageItem,
  removeDbStorageItem
} from '@/utils/storage'
import { apiOptions } from '@/assets/translateApiOption'

/** 获取默认的首页api */
const getDefaultHomeApi = () => {
  return apiOptions.slice(0, 4).map(i => i.value)
}

const CONFIG = {
  // 密钥配置
  KEY_SETTING: {
    key: 'keyConfig',
    type: Object,
    defaultState: {}
  },
  // 首页选择
  HOME_OPTION: {
    key: 'homeOption',
    type: Array,
    defaultState: getDefaultHomeApi()
  },
  // 默认使用api
  DEFAULT_API: {
    key: 'defaultApi',
    type: String,
    defaultState: getDefaultHomeApi()[0]
  },
  // 输入框文本大小
  FONT_SIZE: {
    key: 'fontSize',
    type: Number,
    defaultState: 16
  },
  // 复制快捷键行为
  COPY_BTN_BEHAVIOR: {
    key: 'copyBtnBehavior',
    type: String,
    defaultState: 'open'
  },
  // 显示的复制按钮
  COPY_BTN_SHOW: {
    key: 'copyBtnShow',
    type: Array,
    defaultState: [1, 2, 3]
  },
  // 命名翻译模式
  CODE_MODE: {
    key: 'codeMode',
    type: Boolean,
    defaultState: false
  },
  // 语音朗读
  READ_ALOUD: {
    key: 'readAloud',
    type: Boolean,
    defaultState: false
  },
  // 朗读偏好
  READING_PREFERENCE: {
    key: 'readingPreference',
    type: String,
    defaultState: 'default'
  },
  // 插件主题
  THEME: {
    key: 'theme',
    type: String,
    defaultState: 'auto'
  },
  // 默认目标外语语种
  DEFAULT_FOREIGN_LANGUAGE: {
    key: 'defaultForeignLanguage',
    type: String,
    defaultState: 'en'
  }
}

/** 获取初始化初始值 */
function getInitState() {
  // 获取存储的数据
  const getStorageData = config => {
    const { key, type, defaultState } = config
    const strData = getDbStorageItem(key)
    // if (defaultState === null || defaultState === undefined) {
    //   return strData
    // }

    // 根据默认值类型尝试对获取到的值做反序列化处理
    let result
    try {
      if (type === Number) {
        result = Number.parseFloat(strData)
      } else if (type === Object || type === Array) {
        result = JSON.parse(strData)
      } else if (type === Boolean) {
        result = strData === 'true' || strData === true ? true : false
      } else {
        result = strData
      }
    } catch (error) {
      //
    }

    return result || defaultState
  }

  return {
    homeOption: getStorageData(CONFIG.HOME_OPTION),
    defaultApi: getStorageData(CONFIG.DEFAULT_API),
    keyConfig: getStorageData(CONFIG.KEY_SETTING),
    fontSize: getStorageData(CONFIG.FONT_SIZE),
    copyBtnBehavior: getStorageData(CONFIG.COPY_BTN_BEHAVIOR),
    codeMode: false,
    copyBtnShow: getStorageData(CONFIG.COPY_BTN_SHOW),
    readAloud: getStorageData(CONFIG.READ_ALOUD),
    readingPreference: getStorageData(CONFIG.READING_PREFERENCE),
    theme: getStorageData(CONFIG.THEME),
    defaultForeignLanguage: getStorageData(CONFIG.DEFAULT_FOREIGN_LANGUAGE)
  }
}

export const 用户设置存储 = defineStore('settings', {
  state: () => getInitState(),

  getters: {
    /** 获取首页api选择 */
    getHomeApiOptions: state => {
      return cloneDeep(apiOptions).filter(
        i => state.homeOption.indexOf(i.value) !== -1
      )
    },

    getHomeFontSize: state => {
      return `${state.fontSize}px`
    },

    /** 获取设置页表单 */
    getSetingFormData: state => {
      const {
        homeOption,
        defaultApi,
        keyConfig,
        fontSize,
        copyBtnBehavior,
        codeMode,
        copyBtnShow,
        readAloud,
        readingPreference,
        theme,
        defaultForeignLanguage
      } = state

      return {
        homeHasApi: homeOption, // 首页展示的翻译方式
        defaultApi: defaultApi, // 默认翻译方式
        textFont: fontSize, // 文本框字号
        appid: keyConfig.baidu?.appid, // 百度
        token: keyConfig.baidu?.token, // 百度
        secretId: keyConfig.tencent?.secretId, // 腾讯
        secretKey: keyConfig.tencent?.secretKey, // 腾讯
        accessKeyId: keyConfig.ali?.accessKeyId, // 阿里
        accessKeySecret: keyConfig.ali?.accessKeySecret, // 阿里
        youdaoId: keyConfig.youdao?.appid, // 有道
        youdaoSecret: keyConfig.youdao?.appkey, // 有道
        caiyunToken: keyConfig.caiyun?.token, // 彩云
        huoshanAccessKeyId: keyConfig.huoshan?.accessKeyId, // 火山
        huoshanSecretAccessKey: keyConfig.huoshan?.secretAccessKey, // 火山
        copyBtnBehavior, // 复制快捷键行为 (open:仅复制|close:复制并隐藏|closeInput:复制隐藏并输入)
        copyBtnShow, // 首页显示复制按钮 []
        codeMode, // 命名翻译模式
        readAloud, // 语音朗读
        readingPreference, // 朗读偏好
        theme, // 主题
        defaultForeignLanguage
      }
    }
  },

  actions: {
    /** 设置首页可见翻译 */
    setHomeOption(data) {
      this.homeOption = data
      setDbStorageItem(CONFIG.HOME_OPTION.key, JSON.stringify(data))
    },

    /** 设置默认翻译 */
    setDefaultStorage(data) {
      this.defaultApi = data
      setDbStorageItem(CONFIG.DEFAULT_API.key, data)
    },

    /** 设置密钥 */
    setKeyConfig(data) {
      this.keyConfig = data
      setDbStorageItem(CONFIG.KEY_SETTING.key, JSON.stringify(data))
    },

    /** 设置字体大小 */
    setFontSize(data) {
      this.fontSize = data
      setDbStorageItem(CONFIG.FONT_SIZE.key, data)
    },

    /** 设置复制快捷键行为 */
    setCopyBtnBehavior(data) {
      this.copyBtnBehavior = data
      setDbStorageItem(CONFIG.COPY_BTN_BEHAVIOR.key, data)
    },

    /** 设置复制按钮 */
    setCopyBtnShow(data) {
      this.copyBtnShow = data
      setDbStorageItem(CONFIG.COPY_BTN_SHOW.key, JSON.stringify(data))
    },

    /** 设置命名翻译模式 */
    setCodeMode(data) {
      this.codeMode = data
      // setDbStorageItem(CONFIG.CODE_MODE.key.key, data)
    },

    /** 设置语音朗读开启 */
    setReadAloud(data) {
      this.readAloud = data
      setDbStorageItem(CONFIG.READ_ALOUD.key, data)
    },

    /** 设置语音朗读偏好 */
    setReadingPreference(data) {
      this.readingPreference = data
      setDbStorageItem(CONFIG.READING_PREFERENCE.key, data)
    },

    /** 设置主题 */
    setTheme(data) {
      this.theme = data
      setDbStorageItem(CONFIG.THEME.key, data)
    },

    /** 设置默认外语 */
    setDefaultForeignLanguage(data) {
      this.defaultForeignLanguage = data
      setDbStorageItem(CONFIG.DEFAULT_FOREIGN_LANGUAGE.key, data)
    },

    /** 重置设置 */
    reset() {
      Object.keys(CONFIG).forEach(configKey => {
        const { key } = CONFIG[configKey]
        removeDbStorageItem(key)
      })
      this.$reset()
    },

    /**
     * 获取指定密钥
     * @param {String} tag 第三方api标识
     */
    getKeyByTag(tag) {
      return this.keyConfig[tag] || {}
    }
  }
})

export function getKeyByTag(tag) {
  const settingStore = 用户设置存储()
  const { keyConfig } = settingStore
  return keyConfig[tag] || {}
}
