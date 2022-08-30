<template>
  <div>
    <a-modal
      :visible="modal可见"
      fullscreen
      title-align="start"
      modal-animation-name="zoom-br"
      modal-class="no_header_modal"
      body-class="p-0"
      :footer="false"
      title="设置"
      @open="打开model()"
      @cancel="modal取消()"
      @close="modal关闭动画结束()"
    >
      <header
        ref="设置弹框Header"
        class="setting_header h-48px w-full sticky top-0 text-16px px-20px z-1 flex-y-c justify-between backdrop-blur-5px"
      >
        <div class="horizontal-place-8px">
          <img src="/favicon.svg" width="24" />
          <span class="font-500">设置</span>
        </div>
        <div>
          <button
            class="w-20px aspect-ratio-square flex-c rounded-full transition-all hover:bg-#777:10 dark:(hover:bg-#fff:10)"
            @click="modal取消()"
          >
            <i i-fe-close class="text-14px"></i>
          </button>
        </div>
      </header>
      <div class="header_shadow"></div>
      <section
        ref="modal主体Ref"
        class="w-full top-0 bottom-0 px-20px py-16px overflow-x-hidden"
      >
        <div class="w-full flex">
          <div class="custom_bezier" :class="[!侧边收起 ? 'w-70%' : 'w-full']">
            <setting-card @mouseenter="切换文案()">
              <template #title>
                <div class="horizontal-place-4px">
                  <i i-fluent-emoji-flat-wind-chime class="text-19px" />
                  <span>一些提示</span>
                </div>
              </template>
              <section :class="动态宽度类名">
                <ul class="mb-18px list-disc pl-16px">
                  <li>
                    插件的功能依赖第三方服务，不幸的是，除谷歌翻译外，其他的您需要自行申请之后才能使用它们
                    <i class="text-18px" i-twemoji-slightly-frowning-face></i>
                    ，但是万幸，他们都是免费的
                    <i class="text-18px" i-twemoji-grinning-face></i>
                  </li>
                  <li>
                    <a-link
                      id="guide-link"
                      class="-indent-4px"
                      target="_blank"
                      href="https://www.wolai.com/jtSV7oah6M7rErz2RMFzo"
                      @click="打开url('https://www.wolai.com/jtSV7oah6M7rErz2RMFzo')"
                    >
                      大力点击这里，了解如何申请~
                    </a-link>
                  </li>
                  <li @mouseenter="切换文案('关于自动复制')">
                    如果你使用uTools的
                    <span class="text_important">全局快捷键</span>
                    功能，请将关键字请设置为 “<span
                      class="select-all text_important text-15px code_font-family"
                      >fjyi</span
                    >”
                  </li>
                </ul>
              </section>
            </setting-card>
            <a-form auto-label-width :model="formData">
              <a-row>
                <section class="mt-18px space-y-18px flex-1">
                  <setting-card>
                    <template #title>
                      <div class="horizontal-place-6px">
                        <i i-fluent-emoji-flat-gear class="text-16px" />
                        <span>基本设置</span>
                      </div>
                    </template>
                    <section :class="动态宽度类名">
                      <a-form-item label="翻译服务:" @mouseenter="切换文案('翻译服务')">
                        <a-checkbox-group v-model="formData.homeHasApi">
                          <a-checkbox
                            v-for="item in api列表"
                            :key="item.value"
                            :value="item.value"
                            :disabled="
                              !formData.homeHasApi.includes(item.value) &&
                              formData.homeHasApi?.length >= 可选择的服务数量
                            "
                          >
                            {{ item.label }}
                          </a-checkbox>
                        </a-checkbox-group>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item
                        label="主页显示顺序:"
                        @mouseenter="切换文案('主页显示顺序')"
                      >
                        <div class="horizontal-place-8px">
                          <template v-for="(item, index) in 显示顺序data" :key="item">
                            <i
                              v-if="index > 0"
                              i-ic-twotone-keyboard-double-arrow-right
                              class="mt-1px text-#777:70"
                            />
                            <span>{{ item.label }}</span>
                          </template>
                        </div>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item
                        label="文本框字号:"
                        @mouseenter="切换文案('文本框字号')"
                      >
                        <a-input-number
                          v-model="formData.textFont"
                          :min="14"
                          :max="20"
                          placeholder="请输入文本框字号（14 ~ 20）"
                          mode="button"
                        >
                          <template #suffix> 像素 </template>
                        </a-input-number>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item
                        label="快捷键行为:"
                        @mouseenter="切换文案('快捷键行为')"
                      >
                        <a-radio-group v-model="formData.copyBtnBehavior">
                          <a-radio value="open">仅复制</a-radio>
                          <a-radio value="close"> 复制后隐藏插件 </a-radio>
                          <a-radio value="closeInput"> 复制隐藏并输入 </a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="显示按钮:" @mouseenter="切换文案('显示按钮')">
                        <a-checkbox-group v-model="formData.copyBtnShow">
                          <a-checkbox :value="1">仅复制</a-checkbox>
                          <a-checkbox :value="2">复制并隐藏</a-checkbox>
                          <a-checkbox :value="3">复制并输入</a-checkbox>
                        </a-checkbox-group>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item
                        label="默认目标外语:"
                        class="flex items-start"
                        @mouseenter="切换文案('默认目标外语')"
                      >
                        <a-radio-group v-model="formData.defaultForeignLanguage">
                          <a-radio value="en"> 英语 </a-radio>
                          <a-radio value="jp"> 日语 </a-radio>
                          <a-radio value="ru"> 俄语 </a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="插件主题:" @mouseenter="切换文案('插件主题')">
                        <a-radio-group v-model="formData.theme">
                          <a-radio value="auto">跟随uTools</a-radio>
                          <a-radio value="light"> 浅色 </a-radio>
                          <a-radio value="dark"> 深色 </a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="语音朗读:" @mouseenter="切换文案('语音朗读')">
                        <a-switch v-model="formData.readAloud" class="ml-5px"> </a-switch>
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="朗读偏好:" @mouseenter="切换文案('朗读偏好')">
                        <a-radio-group
                          v-model="formData.readingPreference"
                          :disabled="!formData.readAloud"
                        >
                          <a-radio value="default">系统默认</a-radio>
                          <a-radio value="male"> 仅男声 </a-radio>
                          <a-radio value="female"> 仅女声 </a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </section>
                  </setting-card>
                  <setting-card @mouseenter="切换文案('翻译服务数据')">
                    <template #title>
                      <div class="horizontal-place-4px">
                        <i i-flat-color-icons-menu class="text-18px" />
                        <!-- i-flat-color-icons-list -->
                        <span>翻译服务数据</span>
                      </div>
                    </template>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'baidu' }" />
                        <span>百度翻译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="APP ID:">
                        <a-input
                          v-model.trim="formData.appid"
                          placeholder="请输入百度翻译的APP ID"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="密钥:">
                        <a-input-password
                          v-model.trim="formData.token"
                          placeholder="请输入百度翻译的密钥"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'tencent' }" />
                        <span>腾讯云翻译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="Secret Id:">
                        <a-input
                          v-model.trim="formData.secretId"
                          placeholder="请输入腾讯翻译Secret Id"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="Secret Key:">
                        <a-input-password
                          v-model.trim="formData.secretKey"
                          placeholder="请输入腾讯翻译Secret Key"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'ali' }" />
                        <span>阿里云翻译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="Secret Id:">
                        <a-input
                          v-model.trim="formData.accessKeyId"
                          placeholder="请输入阿里云AccessKeyID"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="Secret Key:">
                        <a-input-password
                          v-model.trim="formData.accessKeySecret"
                          placeholder="请输入阿里云Access Key Secret"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'youdao' }" />
                        <span>有道翻译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="应用ID:">
                        <a-input
                          v-model.trim="formData.youdaoId"
                          placeholder="请输入有道智云应用ID"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="应用密钥:">
                        <a-input-password
                          v-model.trim="formData.youdaoSecret"
                          placeholder="请输入有道智云应用密钥"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'caiyun' }" />
                        <span>彩云小译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="令牌:">
                        <a-input-password
                          v-model.trim="formData.caiyunToken"
                          placeholder="请输入彩云小译令牌"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <a-divider orientation="left">
                      <div class="divide_content">
                        <ApiIcon :data="{ value: 'huoshan' }" />
                        <span>火山翻译</span>
                      </div>
                    </a-divider>
                    <section :class="动态宽度类名">
                      <a-form-item label="AccessKeyID:">
                        <a-input
                          v-model.trim="formData.huoshanAccessKeyId"
                          placeholder="请输入火山翻译AccessKeyID"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                    <section :class="动态宽度类名">
                      <a-form-item label="SecretAccessKey:">
                        <a-input-password
                          v-model.trim="formData.huoshanSecretAccessKey"
                          placeholder="请输入火山翻译SecretAccessKey"
                          allow-clear
                        />
                      </a-form-item>
                    </section>
                  </setting-card>
                </section>
              </a-row>
            </a-form>
            <setting-card class="mt-18px" @mouseenter="切换文案('配置信息')">
              <template #title>
                <div class="horizontal-place-6px">
                  <i i-fxemoji-opticaldisc class="text-16px"></i>
                  <span>配置信息</span>
                </div>
              </template>
              <div class="space-x-16px mb-20px">
                <a-button
                  :type="获取当前('主题') === 'light' ? 'outline' : 'primary'"
                  @click="打开导入弹窗()"
                >
                  <template #icon>
                    <i class="text-20px mb-1px" i-line-md-download-loop />
                    <!-- i-lucide-download -->
                  </template>
                  导入
                </a-button>

                <a-button
                  :type="获取当前('主题') === 'light' ? 'outline' : 'primary'"
                  @click="打开导出弹窗()"
                >
                  <template #icon>
                    <i class="text-20px mb-1px" i-line-md-upload-loop />
                    <!-- i-lucide-upload -->
                  </template>
                  导出
                </a-button>
              </div>
            </setting-card>
          </div>
          <div
            class="right relative transition-all ml-16px"
            :class="{ '-mr-100% opacity-30': 侧边收起 }"
          >
            <setting-card
              class="fixed pb-16px w-[calc(30%-24px)]"
              :style="{
                top: `${侧边定位top}px`,
                bottom: `${侧边定位bottom}px`,
              }"
            >
              <template #title>
                <div class="horizontal-place-6px">
                  <i i-noto-v1-bookmark class="text-18px mb-2px"></i>
                  <span>选项说明</span>
                </div>
              </template>
              <button
                class="bg-white rounded-full shadow-md w-22px grid-c text-18px cursor-pointer absolute-y-center aspect-ratio-square -left-11px transition-all active:shadow dark:bg-#444"
                @click="切换侧边()"
              >
                <i
                  i-ic-outline-keyboard-arrow-left
                  class="transition-all !duration-500"
                  :class="[侧边收起 ? 'rotate-0' : '-rotate-180']"
                />
              </button>
              <div
                class="flex flex-col"
                v-html="解释文案 || '鼠标悬浮左侧选项上可查看对应选项说明'"
              ></div>
            </setting-card>
          </div>
        </div>
      </section>

      <section
        ref="设置弹框Footer"
        class="sticky bottom-0 h-65px flex-y-c justify-between px-20px bg-white dark:bg-#2a2a2b"
        border="t-solid #e5e6eb t-width-1px dark:#484849"
      >
        <div>
          <a-popconfirm
            position="tl"
            content-class="popconfirm_wrapper"
            type="warning"
            content="确定要重置本插件的数据吗？重置可以解决大部分问题，但在此之前请备份好相关服务的信息哦~"
            ok-text="取消"
            cancel-text="确定"
            @cancel="重置数据()"
          >
            <a-button type="outline" status="danger">重置插件数据</a-button>
          </a-popconfirm>
        </div>
        <div class="space-x-12px">
          <a-button @click="modal取消()">取消</a-button>
          <a-button type="primary" @click="设置modal确定()">确定</a-button>
        </div>
      </section>
    </a-modal>

    <!-- 导入弹窗 -->
    <ImportModal ref="导入弹框Ref" @importSubmit="导入提交($event)" />

    <!-- 导出弹窗 -->
    <ExportModal ref="导出弹框Ref" @exportSubmit="导出提交($event)" />
  </div>
</template>

<script setup lang="ts">
import {
  useGlobalStore,
  获取存储项,
  设置存储,
} from '@/components/SettingModal/SettingsModules'
import {
  cloneDeep,
  提示,
  显示引导,
  替换字符串,
  清除引导,
  获取当前,
} from '@/components/SettingModal/SettingsUtils'
import { api选项, 文案映射 } from '@/components/SettingModal/SettingsData'
import type { 引导options类型 } from '@/components/SettingModal/SettingsTypes'
const emit = defineEmits(['ok', 'cancel', 'reset'])
const 设置弹框Header = ref()
const 设置弹框Footer = ref()
const { height: 设置弹框Header高度 } = useElementSize(设置弹框Header)
const { height: 设置弹框Footer高度 } = useElementSize(设置弹框Footer)

const 侧边paddingY = 16
const 侧边定位top = computed(() => {
  return 设置弹框Header高度.value + 侧边paddingY
})

const 侧边定位bottom = computed(() => {
  return 设置弹框Footer高度.value + 侧边paddingY + 1
})
const 系统 = 获取当前('系统')
const api列表 = ref(api选项)
const modal可见 = ref(false)
const modal主体Ref = ref()
const 导入弹框Ref = ref()
const 导出弹框Ref = ref()
const 解释文案 = ref('') // 解释文案
const formData = reactive({
  homeHasApi: ['baidu', 'tencent', 'youdao', 'ali'], // 首页展示的翻译方式
  textFont: 16, // 文本框字号
  copyBtnBehavior: 'open', // 快捷键的行为
  copyBtnShow: [1, 2, 3], // 首页显示的按钮
  readAloud: true, // 语音朗读
  readingPreference: 'default', // 朗读偏好
  codeMode: false, // 命名翻译模式
  defaultForeignLanguage: 'en', // 默认目标外语
  defaultApi: '', // 默认翻译方式
  theme: 'auto',
  appid: undefined, // 百度
  token: undefined, // 百度
  secretId: undefined, // 腾讯
  secretKey: undefined, // 腾讯
  accessKeyId: undefined, // 阿里
  accessKeySecret: undefined, // 阿里
  youdaoId: undefined, // 有道
  youdaoSecret: undefined, // 有道
  caiyunToken: undefined, // 彩云
  huoshanAccessKeyId: undefined, // 火山
  huoshanSecretAccessKey: undefined, // 火山
})
const 显示顺序data = computed(() => {
  const 所有服务 = cloneDeep(api列表.value)
  const 选的服务 = cloneDeep(formData.homeHasApi)
  const arr = 选的服务.map((i, idx) => {
    return {
      ...所有服务.find(j => j.value === i),
      sort: idx,
    }
  })
  return arr
})

const utools = window?.utools

const { 获取设置, 保存设置, 重置设置, 导入配置, 导出设置 } = 设置存储(formData)
const 首页的api数组 = ref<string[]>([]) // 当前首页展示的翻译方式

const 已勾选的翻译 = computed(() => {
  return api列表.value.filter(i => 首页的api数组.value.includes(i.value))
})

const { copy: 复制 } = useClipboard() // 复制结果功能

// 监听首页翻译方式的checkbox勾选数量
const 可选择的服务数量 = ref(4)
watchEffect(() => {
  const 已选择的api长度 = formData.homeHasApi?.length
  if (已选择的api长度 > 可选择的服务数量.value) {
    formData.homeHasApi = 首页的api数组.value
    提示.warning({ content: '最多只能选择4个翻译方式哦~', duration: 2500 })
  } else if (已选择的api长度 < 1) {
    formData.homeHasApi = 首页的api数组.value
    提示.warning({
      content: '还是至少留下1个翻译方式吧！',
      duration: 2500,
    })
  }
  首页的api数组.value = formData.homeHasApi
})

// 监听默认翻译方式的下拉选项
// 如果选择了"默认翻译方式"为"首页翻译方式"不存在的，则把可用的翻译方式第一个赋值给默认
watchEffect(() => {
  if (!首页的api数组.value.includes(formData.defaultApi)) {
    formData.defaultApi = 已勾选的翻译.value[0].value
  }
})

const 全局存储 = useGlobalStore()
const 侧边收起 = computed(() => 全局存储.侧边收起)
const 动态宽度类名 = computed(() => {
  return 侧边收起.value ? 'w-80%' : 'w-full'
})

function 切换侧边() {
  if (!侧边收起.value) {
    切换文案()
  }
  全局存储.设置侧边收起()
}
function 设置modal确定() {
  保存设置()
  提示.success({ content: '设置成功', duration: 1000 })
  emit('ok')
  关闭弹窗()
}

// 点击弹框取消
function modal取消() {
  清除引导()
  emit('cancel')
  关闭弹窗()
}
// 打开设置弹框（动画结束）回调
function 打开model() {
  !获取存储项('firstUseSetting') && 首次引导()
}

// 首次提示链接位置
function 首次引导() {
  const option: 引导options类型 = {
    id: 'firstUseSetting',
    title: '这里有一些提示',
    text: '这可是我起早贪黑写的，你可以在点击”关闭“按钮后点击链接查看，它可以帮助你申请到这些免费的服务，如果你已经是个老手了，那就关闭这个对话框开始使用吧~',
    attachTo: {
      element: '#guide-link',
      on: 'right',
    },
    classes: 'guide_wrapper',
  }
  显示引导(option, 'firstUseSetting')
}

function 打开弹窗() {
  modal可见.value = true
  获取设置()
}

function 关闭弹窗() {
  modal可见.value = false
}

function modal关闭动画结束() {
  切换文案()
}

function 打开url(url: string) {
  if (!utools) {
    return
  }
  utools.shellOpenExternal(url)
}

function 重置数据() {
  重置设置()
  提示.success({ content: '已重置', duration: 1000 })
  // 关闭弹窗并通知重置
  setTimeout(() => {
    关闭弹窗()
    emit('reset')
  }, 300)
}

const 快捷键文案 = computed(() => {
  const m = new Map([
    ['macOS', 'Command+Shift+C'],
    ['Windows', 'Ctrl+Shift+C'],
    ['Linux', 'Ctrl+Shift+C'],
  ])
  return m.get(系统) || 'Ctrl+Shift+C / Command+Shift+C'
})

function 切换文案(id = '') {
  if (侧边收起.value) {
    return
  }
  if (!id) {
    解释文案.value = ''
    return
  }

  let 文案主体 = 文案映射?.[id]
  // 快捷键的文案中包含动态文字，需要替换
  if (id === '快捷键行为') {
    文案主体 = 替换字符串(文案主体, ['%s', 快捷键文案.value])
  }
  解释文案.value = `<h2 class="text-20px">${id}:</h2>${文案主体}`
}

function 打开导入弹窗() {
  导入弹框Ref.value.打开导入弹窗()
}

interface importType {
  text: string
  password: string
}

async function 导入提交(data: importType) {
  try {
    await 导入配置(data.text, data.password)
    保存设置()
    提示.success('导入成功，欢迎回来~🎉')
    导入弹框Ref.value.关闭导入弹窗()
    emit('ok')
    关闭弹窗()
  } catch (e) {
    提示.error('导入出错了，可能是配置信息有误或密码错误😯')
  }
}

function 打开导出弹窗() {
  导出弹框Ref.value.打开导出弹窗()
}

async function 导出提交(password: string) {
  try {
    const 导出内容: string = await 导出设置(password)
    await 复制(导出内容)
    提示.success('导出成功，已将配置信息写入到剪切板~')
    导出弹框Ref.value.关闭导出弹窗()
  } catch (error) {
    提示.error('导出出错了，稍后再试一下吧😯')
  }
}

// 暴露弹窗的函数，供父组件调用
defineExpose({
  打开弹窗,
  关闭弹窗,
  modal可见,
})
</script>

<style lang="scss" scoped>
.divide_content {
  @apply flex-c space-x-4px;
}

.custom_bezier {
  transition: all 0.4s var(--ani-bezier);
}
.setting_header {
  background: radial-gradient(transparent, white 2px);
  // 这里的important不可以去除，因为background在深色模式需要覆盖，但是background又包含-size
  // 如果不加这个important，那么此处的background-size将被深色的background覆盖
  background-size: 5px 5px !important;
}
.header_shadow {
  &::before {
    content: '';
    box-shadow: 0 1px 8px 1px #172a4770;
    @apply fixed w-full;
  }
  &::after {
    content: '';
    @apply w-full h-20px absolute;
    background: linear-gradient(to bottom, white 50%, transparent);
  }
}
</style>
