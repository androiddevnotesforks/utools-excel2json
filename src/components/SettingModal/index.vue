<template>
  <div>
    <a-modal
      :visible="modal可见"
      fullscreen
      title-align="start"
      modal-animation-name="zoom-br"
      body-class="pt-10px"
      @open="打开model()"
      @cancel="modal取消()"
    >
      <template #title>
        <div class="flex items-center space-x-8px">
          <img src="/favicon.svg" width="24" />
          <span>设置</span>
        </div>
      </template>
      <div ref="modalBody">
        <setting-card title="一些提示">
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
                @click="打开url()"
              >
                大力点击这里，了解如何申请~
              </a-link>
            </li>
            <li>
              如果你使用utools的
              <span class="text_important">全局快捷键</span>
              功能，请将关键字请设置为 “<span
                class="select-all text_important text-15px code_font-family"
                >fjyi</span
              >” 并打开自动复制，以获得更好的体验
            </li>
          </ul>
        </setting-card>
        <a-form auto-label-width :model="formData">
          <a-row>
            <section class="mt-18px space-y-18px flex-1">
              <setting-card title="基本设置">
                <a-col :span="20">
                  <a-form-item label="翻译方式">
                    <template #label>
                      <div class="space-x-4px">
                        <span>翻译服务</span>
                        <hover-answer>
                          在首页您可以通过「Tab」键快速切换翻译服务
                        </hover-answer>
                      </div>
                    </template>
                    <a-checkbox-group v-model="formData.homeHasApi">
                      <a-checkbox
                        v-for="item in api列表"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="文本框字号">
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
                </a-col>
                <a-col :span="20">
                  <a-form-item label="快捷键行为">
                    <template #label>
                      <div class="space-x-4px">
                        <span>快捷键行为</span>
                        <hover-answer>
                          {{ 计算快捷键文案() + ' ' }}
                          可进行快捷键复制，该选项可设置按下快捷键后会发生什么
                        </hover-answer>
                      </div>
                    </template>
                    <a-radio-group v-model="formData.copyBtnBehavior">
                      <a-radio value="open">仅复制</a-radio>
                      <a-radio value="close"> 复制并隐藏插件 </a-radio>
                      <a-radio value="closeInput"> 复制隐藏并输入 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="显示按钮">
                    <template #label>
                      <div class="space-x-4px">
                        <span>显示按钮</span>
                        <hover-answer>
                          翻译页底部会显示的按钮，请根据您的使用习惯勾选，勾选多个将会在翻译完成后，底部显示多个按钮，以应对不同的情况
                        </hover-answer>
                      </div>
                    </template>
                    <a-checkbox-group v-model="formData.copyBtnShow">
                      <a-checkbox :value="1">仅复制</a-checkbox>
                      <a-checkbox :value="2">复制并隐藏</a-checkbox>
                      <a-checkbox :value="3">复制并输入</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="默认目标外语" class="flex items-start">
                    <template #label>
                      <div class="space-x-4px">
                        <span>默认目标外语</span>
                        <hover-answer>
                          <ul class="list-disc pl-16px space-y-10px">
                            <li>
                              如果在翻译界面开启了
                              <span class="text_important">
                                「智能切换语种」
                              </span>
                              ，将在翻译之前判断输入是否为中文，如果
                              <span class="text_important"> 认定为中文 </span>
                              ，将会自动切换
                              「目标语种」为一个外语，该选项用来指定这个外语默认是什么，若
                              <span class="text_important"> 不是中文 </span>
                              ，则会切换为 “自动 → 中文” 尽可能免去你
                              手动调整目标语种的这一步骤
                            </li>
                            <li>
                              如果
                              <span class="text_important">手动切换了</span>
                              「原语种」或「目标语种」，易翻会认为自己猜错了，将
                              <span class="text_important"
                                >自动关闭「智能切换语种」功能</span
                              >
                              ，直至
                              <span class="text_important">插件退出</span>
                              ，但是你依然可以在语种下拉选择的左侧
                              <span class="text_important"> 手动开启 </span>
                            </li>
                            <li>
                              智能切换语种的算法刚刚起步，如果经常不能正确识别，希望可以带着脱敏后的文字联系我们，我们会尽力优化😊
                            </li>
                          </ul>
                        </hover-answer>
                      </div>
                    </template>
                    <a-radio-group v-model="formData.defaultForeignLanguage">
                      <a-radio value="en"> 英语 </a-radio>
                      <a-radio value="jp"> 日语 </a-radio>
                      <a-radio value="ru"> 俄语 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="插件主题">
                    <a-radio-group v-model="formData.theme">
                      <a-radio value="auto">跟随utools</a-radio>
                      <a-radio value="light"> 浅色 </a-radio>
                      <a-radio value="dark"> 深色 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="语音朗读">
                    <template #label>
                      <div class="space-x-4px">
                        <span>语音朗读</span>
                        <hover-answer>
                          如果出现朗读失败，可以用以下方式解决<br />
                          <ul class="list-disc pl-16px">
                            <li>再次点击按钮重试</li>
                            <li>保证设备的时间正确</li>
                            <li>减少需要朗读的文字</li>
                            <li>使用一个更科学的上网方式</li>
                          </ul>
                        </hover-answer>
                      </div>
                    </template>
                    <a-switch
                      v-model="formData.readAloud"
                      class="ml-5px"
                    ></a-switch>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="朗读偏好">
                    <template #label>
                      <div class="space-x-4px">
                        <span>朗读性别偏好</span>
                        <hover-answer>
                          系统默认是我们认为还不错的声音，不同的语种下有男声也有女声，你可以通过更改此选项，来指定朗读声音的性别
                        </hover-answer>
                      </div>
                    </template>
                    <a-radio-group
                      v-model="formData.readingPreference"
                      :disabled="!formData.readAloud"
                    >
                      <a-radio value="default">系统默认</a-radio>
                      <a-radio value="male"> 仅男声 </a-radio>
                      <a-radio value="female"> 仅女声 </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </setting-card>
              <setting-card title="翻译服务数据">
                <a-divider orientation="left">百度翻译</a-divider>
                <a-col :span="20">
                  <a-form-item label="APP ID">
                    <a-input
                      v-model.trim="formData.appid"
                      placeholder="请输入百度翻译的APP ID"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="密钥">
                    <a-input-password
                      v-model.trim="formData.token"
                      placeholder="请输入百度翻译的密钥"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">腾讯翻译</a-divider>
                <a-col :span="20">
                  <a-form-item label="Secret Id">
                    <a-input
                      v-model.trim="formData.secretId"
                      placeholder="请输入腾讯翻译Secret Id"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="Secret Key">
                    <a-input-password
                      v-model.trim="formData.secretKey"
                      placeholder="请输入腾讯翻译Secret Key"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">阿里翻译</a-divider>
                <a-col :span="20">
                  <a-form-item label="Secret Id">
                    <a-input
                      v-model.trim="formData.accessKeyId"
                      placeholder="请输入阿里云AccessKeyID"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="Secret Key">
                    <a-input-password
                      v-model.trim="formData.accessKeySecret"
                      placeholder="请输入阿里云Access Key Secret"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">有道翻译</a-divider>
                <a-col :span="20">
                  <a-form-item label="应用ID">
                    <a-input
                      v-model.trim="formData.youdaoId"
                      placeholder="请输入有道智云应用ID"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="应用密钥">
                    <a-input-password
                      v-model.trim="formData.youdaoSecret"
                      placeholder="请输入有道智云应用密钥"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">彩云小译</a-divider>
                <a-col :span="20">
                  <a-form-item label="令牌">
                    <a-input-password
                      v-model.trim="formData.caiyunToken"
                      placeholder="请输入彩云小译令牌"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">火山翻译</a-divider>
                <a-col :span="20">
                  <a-form-item label="AccessKeyID">
                    <a-input
                      v-model.trim="formData.huoshanAccessKeyId"
                      placeholder="请输入火山翻译AccessKeyID"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-form-item label="SecretAccessKey">
                    <a-input-password
                      v-model.trim="formData.huoshanSecretAccessKey"
                      placeholder="请输入火山翻译SecretAccessKey"
                      allow-clear
                    />
                  </a-form-item>
                </a-col>
              </setting-card>
            </section>
          </a-row>
        </a-form>
        <setting-card title="配置信息" class="mt-18px">
          <template #title>
            <div class="mr-4px">配置信息</div>
            <hover-answer>
              不是utools会员？又想在多个设备上同步这些配置？导出会将配置信息写入你的剪贴板，利用配置信息可以在其他设备进行导入。
            </hover-answer>
          </template>
          <div class="space-x-16px mb-20px">
            <a-button
              :type="currentTheme === 'light' ? 'outline' : 'primary'"
              @click="打开导入弹窗()"
            >
              <template #icon>
                <i class="text-16px mb-1px" i-iconoir-import />
              </template>
              导入
            </a-button>

            <a-popconfirm
              position="tl"
              content-class="popconfirm_wrapper"
              :popup-container="modalBody"
              ok-text="确认导出"
              @ok="导出数据()"
            >
              <template #icon>
                <div class="hidden"></div>
              </template>
              <template #content>
                <div class="mb-8px">
                  将导出当前
                  <span class="text_important"> 「已生效的配置」 </span>
                  ，如果你刚才修改过设置，还未点确定进行保存，请先点确定保存后再进行导出。
                </div>
                <a-input-password
                  v-model.trim="导出密码框"
                  size="small"
                  :max-length="20"
                  show-word-limit
                  placeholder="密码（非必填）"
                ></a-input-password>
                <p class="text-12px text-red-500 mt-4px leading-tight">
                  如果你设置了密码，在导入时需要填写相同的密码才能正常导入
                </p>
              </template>
              <a-button
                :type="currentTheme === 'light' ? 'outline' : 'primary'"
              >
                <template #icon>
                  <i class="text-16px mb-1px" i-iconoir-share-ios />
                </template>
                导出
              </a-button>
            </a-popconfirm>
          </div>
        </setting-card>
      </div>
      <template #footer>
        <div class="flex justify-between">
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
            <a-button type="primary" @click="modal确定()">确定</a-button>
          </div>
        </div>
      </template>
    </a-modal>

    <!-- 导入弹窗 -->
    <a-modal
      v-model:visible="导入弹窗显隐"
      :popup-container="modalBody"
      title="导入配置"
      @cancel="关闭导入弹窗()"
    >
      <div>
        <a-alert class="mb-16px">
          导入配置会覆盖当前配置，请备份好相关信息
        </a-alert>
        <a-textarea
          ref="importModalRef"
          v-model.trim="导入配置文本"
          :auto-size="{
            minRows: 6,
            maxRows: 6
          }"
          placeholder="请输入配置信息"
          allow-clear
        />
        <a-input-password
          v-model.trim="导入密码框"
          placeholder="如未设置导入密码，请留空"
          allow-clear
        />
      </div>
      <template #footer>
        <div class="space-x-12px">
          <a-button @click="关闭导入弹窗()">取消</a-button>
          <a-button type="primary" @click="导入点击确定()">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { Message as 提示 } from '@arco-design/web-vue'
import { apiOptions as api选项 } from '@/assets/translateApiOption.js'
import { 清除引导, 显示引导 } from '@/utils/showGuide.js'
import { getDbStorageItem as 获取存储项 } from '@/utils/storage.js'
import 设置存储 from './useSettingStore'
import { useGlobalStore } from '@/store/globalData.js'
import SettingCard from '../settingCard.vue'
import { useClipboard } from '@vueuse/core'

const globalStore = useGlobalStore()
const { currentOS, currentTheme } = storeToRefs(globalStore)
const modal可见 = ref(false) // 弹框的显隐
const emit = defineEmits(['ok', 'cancel', 'reset'])
const 导入弹窗显隐 = ref(false) // 导入弹框的显隐
const 导出密码框 = ref('') // 导出密码框的内容
const 导入密码框 = ref('') // 导入密码框的内容
const formData = reactive({
  homeHasApi: ['baidu', 'tencent', 'youdao', 'ali'], // 首页展示的翻译方式
  textFont: 16, // 文本框字号
  copyBtnBehavior: 'open', // 快捷键的行为
  copyBtnShow: [1, 2, 3], // 首页显示的按钮
  readAloud: true, // 语音朗读
  readingPreference: 'default', // 朗读偏好
  codeMode: false, // 命名翻译模式
  defaultForeignLanguage: 'en', // 默认目标外语
  defaultApi: undefined, // 默认翻译方式
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
  huoshanSecretAccessKey: undefined // 火山
})
const importModalRef = ref()
const modalBody = ref()
const 导入配置文本 = ref('')
const utools = window?.utools
const api列表 = ref(api选项) // 翻译方式选项
const { 获取设置, 保存设置, 重置设置, 导出设置, 导入配置 } = 设置存储(formData)
const { copy: 复制 } = useClipboard() // 复制结果功能

// 默认翻译方式的下拉选项
const defaultOptions = computed(() => {
  return api列表.value.filter(i => 首页的api数组.value.includes(i.value))
})

const 首页的api数组 = ref([]) // 当前首页展示的翻译方式

// 监听首页翻译方式的checkbox勾选数量
watchEffect(() => {
  const 已选择的api长度 = formData.homeHasApi?.length
  if (已选择的api长度 > 4) {
    formData.homeHasApi = 首页的api数组.value
    提示.warning({ content: '最多只能选择4个翻译方式哦~', duration: 2500 })
  } else if (已选择的api长度 < 1) {
    formData.homeHasApi = 首页的api数组.value
    提示.warning({
      content: '还是至少留下1个翻译方式吧！',
      duration: 2500
    })
  }
  首页的api数组.value = formData.homeHasApi
})

// 监听默认翻译方式的下拉选项
// 如果选择了"默认翻译方式"为"首页翻译方式"不存在的，则把可用的翻译方式第一个赋值给默认
watchEffect(() => {
  if (!首页的api数组.value.includes(formData.defaultApi)) {
    formData.defaultApi = defaultOptions.value[0].value
  }
})

// 点击弹框确定
function modal确定() {
  保存设置()
  提示.success({ content: '设置成功', duration: 1000 })
  emit('ok')
  关闭弹窗()
}

// 动态快捷键文案
function 计算快捷键文案() {
  const m = new Map([
    ['Windows', 'Ctrl+Shift+C'],
    ['Linux', 'Ctrl+Shift+C'],
    ['macOS', 'Command+Shift+C']
  ])
  return m.get(currentOS.value) || 'Ctrl+Shift+C / Command+Shift+C'
}
function 导入框获得焦点() {
  importModalRef.value.focus()
}

function 打开导入弹窗() {
  导入弹窗显隐.value = true
  nextTick(() => {
    导入框获得焦点()
  })
}

function 导入点击确定() {
  console.log('点了确定')
  导入配置(导入配置文本.value, 导入密码框.value)
    .then(() => {
      提示.success({
        content: '导入成功，欢迎回来~🎉',
        duration: 2500
      })
      关闭导入弹窗()
      保存设置()
      emit('ok')
      关闭弹窗()
    })
    .catch(() => {
      提示.error({
        content: '导入出错了，再检查一下吧😯',
        duration: 2500
      })
    })
}

function 关闭导入弹窗() {
  导入弹窗显隐.value = false
  导入配置文本.value = ''
  导入密码框.value = ''
}

function 导出数据() {
  导出设置(导出密码框.value)
    .then(async 导出内容 => {
      导出密码框.value = ''
      await 复制(导出内容)
      提示.success({ content: '已将导出设置添加到剪切板', duration: 2500 })
    })
    .catch(() => {
      提示.error({
        content: '导出出错了，稍后再试一下吧😯',
        duration: 2500
      })
    })
}
// 点击弹框取消
function modal取消() {
  清除引导()
  emit('cancel')
  关闭弹窗()
}

// 打开设置弹框回调
function 打开model() {
  !获取存储项('firstUseSetting') && 首次引导()
}

// 首次提示链接位置
function 首次引导() {
  const option = {
    id: 'firstUseSetting',
    title: '这里有一些提示',
    text: '这可是我起早贪黑写的，你可以在点击”关闭“按钮后点击链接查看，它可以帮助你申请到这些免费的服务，如果你已经是个老手了，那就关闭这个对话框开始使用吧~',
    attachTo: {
      element: '#guide-link',
      on: 'right'
    },
    classes: 'guide_wrapper'
  }
  显示引导(option, 'firstUseSetting')
}

// 打开弹窗
function 打开弹窗() {
  modal可见.value = true
  获取设置()
}

// 关闭弹窗
function 关闭弹窗() {
  modal可见.value = false
}

// 打开url
function 打开url(e) {
  // TODO: e 取不到值了？
  console.log(e)
  if (!utools) return
  // utools.shellOpenExternal(e.target.getAttribute('href'))
  utools.shellOpenExternal('https://www.wolai.com/jtSV7oah6M7rErz2RMFzo')
}

// 重置数据
function 重置数据() {
  // 重置设置
  重置设置()
  提示.success({ content: '已重置', duration: 300 })
  // 关闭弹窗并通知重置
  setTimeout(() => {
    关闭弹窗()
    emit('reset')
  }, 300)
}

// 暴露打开弹窗的函数，供父组件调用
defineExpose({
  打开弹窗,
  关闭弹窗,
  modal可见
})
</script>

<style lang="scss" scoped>
.text_important {
  @apply text-red-500 font-bold;
}
</style>
