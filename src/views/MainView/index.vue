<template>
  <div
    class="main_wrapper grid-c h-screen overflow-hidden relative dark:(text-white bg-#303133)"
  >
    <div
      class="main p-23px pt-8px flex flex-col h-full w-full overflow-hidden dark:bg-#303133"
    >
      <div class="text_wrapper flex flex-1 relative">
        <!-- 清除按钮 -->
        <transition name="component-scale">
          <mimicry-btn
            v-if="!['', undefined, null].includes(用户输入)"
            class="absolute right-10px bottom-8px"
            @click="清空输入框()"
          >
            <i i-line-md-close />
          </mimicry-btn>
        </transition>

        <span
          v-show="检测语言显示条件 && 结果对象.from语种"
          class="absolute opacity-35 left-12px bottom-8px text-12px text-#777 dark:text-white"
        >
          检测到: {{ 结果对象.from语种 }}
        </span>

        <!-- 上方文本域 -->
        <a-textarea
          ref="用户输入框Ref"
          v-model="用户输入"
          class="rounded-t-8px"
          placeholder="请输入要翻译的内容，可右键点击文本框粘贴"
          @click.right="右键点击文本域($event)"
        />
      </div>
      <section class="tools_wrapper flex my-8px">
        <!-- 中间翻译Api选项 -->
        <a-radio-group v-model="当前翻译api" type="button" @change="切换翻译服务()">
          <a-radio
            v-for="项 in (翻译api数组 || []).slice(0, 4)"
            :key="项.value"
            :value="项.value"
          >
            <div class="flex space-x-4px select-none">
              <div
                class="grid-c api_icon_wrapper"
                :class="[当前翻译api === 项.value ? 'contrast-120' : 'grayscale-20']"
              >
                <api-icon :data="项" :current="当前翻译api" />
              </div>
              <div>{{ 项.label }}</div>
            </div>
          </a-radio>
        </a-radio-group>
        <div
          border="#f2f3f5 b-width-1px dark:#3d3d3d"
          class="flex-1 horizontal-place-8px justify-end"
        >
          <!-- 命名翻译模式的select -->
          <template v-if="是命名模式">
            <a-select
              v-model="命名模式类型"
              :style="{ width: '130px' }"
              @change="命名模式切换类型()"
            >
              <a-option v-for="(项, 索引) in 切换类型数组" :key="索引" :value="项.name">
                {{ 项.label }}
              </a-option>
            </a-select>
          </template>

          <template v-else>
            <auto-btn :active="自动模式" @click="切换自动语种模式()" />
            <a-cascader
              v-model:model-value="form和to的数组"
              path-mode
              :options="语种树的数据"
              :style="{
                width: '240px',
                borderRadius: '2px 2px 0 0',
              }"
              value-key="id"
              :format-label="格式化级联显示内容"
              @change="语种级联发生变化()"
            />
          </template>
        </div>
      </section>

      <a-resize-box
        :directions="['top']"
        :style="{
          minHeight: '22%',
          maxHeight: '78%',
          height: 'calc(50% - 21.5px)',
        }"
      >
        <div class="flex h-full relative">
          <!-- -1：等待用户操作、200：翻译成功均应该显示<code/> -->
          <code-bg v-if="是命名模式 && [-1, 200].includes(结果对象.状态码)" />
          <transition name="fade-in-standard">
            <loading
              v-if="翻译加载"
              border="~ #e9e9e9"
              class="rounded-b-8px absolute top-0 z-100"
            />
          </transition>
          <div
            class="text_wrapper text_readonly flex flex-1 absolute top-0 h-full w-full"
            :class="{ 'code_font-family': 是命名模式 }"
            @click.right="结果只读切换()"
            @contextmenu.prevent
          >
            <a-textarea
              v-model="结果对象.结果文字"
              rounded="b-8px t-0"
              class="relative z-1"
              :placeholder="下方placeholder"
              :readonly="结果只读"
            />

            <!-- 朗读按钮 -->
            <transition name="component-scale">
              <template v-if="在线朗读显示条件">
                <div
                  v-show="要显示复制按钮"
                  class="absolute left-10px bottom-8px z-1 flex space-x-8px"
                >
                  <!-- 播放按钮 -->
                  <mimicry-btn :loading="朗读loading" @click="点击在线朗读按钮()">
                    <i i-akar-icons-sound-on />
                  </mimicry-btn>

                  <!-- 开始暂停按钮 -->
                  <mimicry-btn v-show="音频Url" @click="正在播放 = !正在播放">
                    <i :class="[正在播放 ? 'i-ic-twotone-pause' : 'i-ri-play-fill']"></i>
                  </mimicry-btn>
                </div>
              </template>

              <template v-else-if="离线朗读显示条件">
                <div
                  v-show="要显示复制按钮"
                  class="absolute left-10px bottom-8px z-1 flex space-x-8px"
                >
                  <!-- 播放按钮 -->
                  <mimicry-btn
                    :loading="离线loading"
                    @click="离线朗读主函数(结果对象.结果文字)"
                  >
                    <i
                      :class="[
                        离线朗读状态 === 'play'
                          ? 'i-carbon-stop-filled-alt'
                          : 'i-akar-icons-sound-on',
                      ]"
                    />
                  </mimicry-btn>
                </div>
              </template>
            </transition>

            <transition name="fade-in-standard">
              <div
                v-show="要显示复制按钮"
                class="bottom-8px absolute-x-center z-1 flex space-x-8px"
              >
                <colorful-btn
                  v-if="复制按钮显示的数组.includes(1)"
                  icon-name="i-line-md-clipboard-arrow"
                  @click="点击触发复制主函数('open')"
                >
                  仅复制
                </colorful-btn>

                <colorful-btn
                  v-if="复制按钮显示的数组.includes(2)"
                  icon-name="i-line-md-navigation-right-down"
                  @click="点击触发复制主函数('close')"
                >
                  复制并隐藏
                </colorful-btn>

                <colorful-btn
                  v-if="复制按钮显示的数组.includes(3)"
                  icon-name="i-line-md-edit-twotone"
                  @click="点击触发复制主函数('closeInput')"
                >
                  复制并输入
                </colorful-btn>
              </div>
            </transition>
          </div>
        </div>
      </a-resize-box>
    </div>
    <!-- 命名翻译模式按钮 -->
    <i
      class="icon left-4px hover:text-#666 dark:hover:text-#d9d9d9"
      :class="[是命名模式 ? '!text-primary i-tabler-code' : 'i-tabler-code-off ']"
      @click="切换模式()"
    />
    <!-- 设置按钮 -->
    <i
      id="setting-wrapper"
      class="icon right-4px i-ci-settings-future hover:(i-ep-setting text-#666) dark:hover:text-#d9d9d9"
      @click="打开设置Modal()"
    />
  </div>

  <!-- 设置弹窗 -->
  <setting-modal
    ref="设置弹框Ref"
    @ok="设置确定()"
    @cancel="设置取消()"
    @reset="resetHandler()"
  />
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { debounce, isEqual, throttle } from 'lodash-es'
import { noCase } from 'change-case'
import { Message as 提示 } from '@arco-design/web-vue'
import { 粘贴, 获取存储项 } from '@MainView/MainViewUtils'
import {
  useUtools,
  use命名模式模块,
  初始化离线语音,
  判断快捷键,
  在线朗读主函数,
  复制主函数,
  当前按下的所有键,
  支持离线朗读,
  未配置服务引导,
  检查from和to是否兼容,
  离线loading,
  离线朗读主函数,
  离线朗读停止,
  离线朗读状态,
  获取级联的值,
  通用翻译,
  首次引导,
} from '@MainView/MainViewModule'

import { api不支持的大对象, 用户设置存储, 语种树 } from '@MainView/MainViewData'
import type { CascaderOption, 级联值类型 } from '@MainView/MainViewTypes'
import { 朗读loading, 正在播放, 重置音频, 音频Url } from '@MainView/useVoice'
import { useGlobalStore } from '@/components/SettingModal/SettingsModules'
const 全局存储 = useGlobalStore()
const { 是否mac } = storeToRefs(全局存储)
const 语种树的数据 = ref(语种树())
const form和to的数组 = ref<级联值类型>(['auto', 'zh'])
const 存储 = 用户设置存储()
const {
  homeOption: 首页选项,
  getHomeApiOptions: 翻译api数组,
  getHomeFontSize: 文字尺寸,
  copyBtnShow: 复制按钮显示的数组,
  readingModel: 朗读模式,
  readAloud: 朗读功能,
} = storeToRefs(存储)
const 翻译加载 = ref(false) // 是否正在翻译
const 用户输入 = ref('') // 输入的内容
const 结果只读 = ref(true) // 结果是否可编辑
const 结果对象原始数据 = {
  结果文字: '', // 翻译结果
  状态码: -1, // 翻译结果状态(code = 200 为成功,code = -1为等待用户操作,code = 401为未配置翻译API)
  from语种: '',
  结果编号: nanoid(),
}
const 结果对象 = reactive({ ...结果对象原始数据 })
const 当前翻译api = ref('') // 当前翻译api
const 设置弹框Ref = ref() // 设置弹窗的ref
const 用户输入框Ref = ref() // 输入textarea的dom
const 下方placeholder = ref('翻译结果')

const {
  是命名模式,
  命名模式类型,
  切换类型数组,
  命名模式切换类型,
  返回命名模式对应结果,
  改变命名模式类型,
} = use命名模式模块(结果对象)

const { utools, utools初始化 } = useUtools(设置弹框Ref, 用户输入, 改变命名模式类型)

const 自动模式 = ref(true)

function 格式化级联显示内容(options: CascaderOption[]) {
  const 文字 = options.map(option => option.label)
  return 文字.join('\u3000  \u3000')
}

const 要显示复制按钮 = computed(() => {
  return 结果对象.结果文字?.trim() && 结果对象.状态码 === 200
})

function 清空输入框() {
  用户输入.value = ''
  输入框focus()
}

function 右键点击文本域(e: MouseEvent) {
  e.preventDefault()
  输入框focus()
  粘贴()
}

const 检测语言显示条件 = computed(() => {
  return 结果对象.from语种 && !['简体中文'].includes(结果对象.from语种)
})

// 这个函数目前只有右键才会触发
function 结果只读切换() {
  const 是mac系统 = 是否mac.value
  const 不是mac系统 = !是否mac.value
  const 仅按下了Ctrl = isEqual(['control'], 当前按下的所有键.value)
  const 仅按下了Command = isEqual(['command'], 当前按下的所有键.value)
  const 其他系统条件 = 不是mac系统 && 仅按下了Ctrl
  const mac条件 = 是mac系统 && 仅按下了Command

  if (其他系统条件 || mac条件) {
    if (是命名模式.value) {
      return 提示.warning('命名模式不可以编辑结果哦')
    }
    结果只读.value = !结果只读.value
  }
}

// 输入框获取焦点
function 输入框focus() {
  用户输入框Ref.value.focus()
}

// 设置弹框点击了确定
function 设置确定() {
  nextTick(() => {
    读取设置()
    输入框focus()
    开始翻译(当前翻译api.value) // 设置成功，刷新上一次翻译
  })
}

// 设置弹框点击了取消
function 设置取消() {
  输入框focus()
}

// 打开设置模态框
function 打开设置Modal() {
  设置弹框Ref.value.打开弹窗()
}

const 切换自动语种模式 = throttle(() => {
  自动模式.value = !自动模式.value
}, 300)

watch(自动模式, newVal => {
  提示.success(`智能切换语种已${newVal ? '开启' : '关闭'}`)
})

// 变更模式
const 切换模式 = throttle(() => {
  提示.success({
    content: `命名翻译模式${是命名模式.value ? '关闭' : '开启'}`,
    duration: 1000,
  })
  // 如果未输入，则状态码设为-1，即为等待用户操作状态，-1会触发Code动画
  // 否则，将状态码设为0，后面会触发翻译，翻译成功后继而变为200，会在成功后触发Code动画
  // 如果连续翻译，状态码从200 => 200并不会触发Code动画，符合预期
  结果对象.状态码 = !用户输入.value ? -1 : 0

  存储.setCodeMode(!是命名模式.value)
  输入框focus()
  setTimeout(() => {
    开始翻译()
  }, 0)
}, 1000)

// 修改翻译服务，同时保存当前选中的服务作为默认，并翻译
function 切换翻译服务() {
  存储.setDefaultStorage(当前翻译api.value)
  setTimeout(() => {
    开始翻译()
  }, 0)
}

function 点击触发复制主函数(type: 'open' | 'close' | 'closeInput') {
  复制主函数('手动', 结果对象.结果文字, type)
}

// 分发翻译请求，并开始翻译，默认根据Radio的值来确定翻译api
async function 开始翻译(val = 当前翻译api.value) {
  重置音频()
  输入框focus()
  // 如果没输入内容，则不翻译
  if ([undefined, null, ''].includes(用户输入.value.trim())) {
    结果对象.结果文字 = ''
    return
  }
  if (自动模式.value && !是命名模式.value) {
    form和to的数组.value = 获取级联的值(用户输入.value)
  }

  翻译加载.value = true
  const [from, to] = form和to的数组.value
  const obj = {
    from,
    to,
    q: 尝试分词(用户输入.value),
  }

  const { text: 返回的文字, code, from: from语种 } = await 通用翻译(val, obj)

  const 处理后的文字 = 是命名模式.value
    ? 返回命名模式对应结果(返回的文字, 命名模式类型.value)
    : 返回的文字

  const 返回数据 = {
    from语种,
    结果文字: 处理后的文字,
    状态码: code,
    结果编号: nanoid(),
  }
  Object.assign(结果对象, 返回数据)
  全局存储.设置当前翻译状态码(code)
  翻译加载.value = false
}

function 尝试分词(str: string) {
  const reg = /^[A-Za-z-_]+\d*$/g
  const result = reg.test(str)
  return result ? noCase(str) : str
}

function 语种级联发生变化() {
  自动模式.value = false
  输入框focus()
  setTimeout(() => {
    开始翻译()
  }, 0)
}

function 读取设置() {
  //  首次加载设置当前选中为设置的默认翻译
  if (!首页选项.value.includes(当前翻译api.value)) {
    当前翻译api.value = 存储.defaultApi || 首页选项.value?.[0]
  }
}

// 重置后首页设置
function resetHandler() {
  清空输入框()
  读取设置()
}

function 重置from和to(arr: 级联值类型 = ['auto', 'zh']) {
  form和to的数组.value = arr
}

const 在线朗读显示条件 = computed(() => {
  return 朗读功能.value && 朗读模式.value === '在线' && !是命名模式.value
})

const 离线朗读显示条件 = computed(() => {
  return (
    朗读功能.value &&
    支持离线朗读.value &&
    朗读模式.value === '离线' &&
    !是命名模式.value &&
    form和to的数组.value[1] === 'en'
  )
})

function 点击在线朗读按钮() {
  在线朗读主函数(结果对象.结果文字, form和to的数组.value[1])
}

watchEffect(() => {
  判断快捷键(结果对象.结果文字, form和to的数组.value[1])
})

onMounted(() => {
  utools && utools初始化()
  输入框focus()
  读取设置()
  if (支持离线朗读.value) {
    初始化离线语音()
  }
  !获取存储项('firstUseMain') && 首次引导()
})

const 恢复标题 = useTimeoutFn(() => {
  下方placeholder.value = '翻译结果'
}, 1000)

// 页面可见性逻辑
const 页面可见性 = useDocumentVisibility()
watch(页面可见性, (current, previous) => {
  if (current === 'visible' && previous === 'hidden') {
    下方placeholder.value = '欢迎回来~🎉'
    输入框focus()
    恢复标题.start()
  } else if (current === 'hidden' && previous === 'visible') {
    正在播放.value = false
    离线朗读停止()
  }
})

// 加了一层防抖的翻译
const 防抖翻译 = debounce(function () {
  开始翻译()
}, 300)

// 监听用户输入，防抖翻译
watch(用户输入, newVal => {
  if (!newVal.trim()) {
    结果对象.from语种 = ''
  }
  防抖翻译()
})

// 监听401，自动弹引导层
watch(
  () => 结果对象.结果编号,
  () => {
    if (结果对象.状态码 === 401) {
      未配置服务引导()
    }
  }
)

watchEffect(() => {
  const 当前api规则 = api不支持的大对象?.[当前翻译api.value]
  if (!当前api规则) {
    return
  }
  const 非互翻_自定义不支持: any = 当前api规则?.自定义不支持 // 不支持互翻的才会有这个obj
  const 互翻_to不支持的数组 = 当前api规则?.to不支持 // 支持互翻的会有这个数组

  语种树的数据.value.forEach(源语言项 => {
    // 一层循环禁用掉api本身就不支持的语种
    源语言项.disabled = 当前api规则?.from不支持.includes(源语言项.value)

    // 如果存在「自定义不支持」这个对象，则为不支持任意互翻api，根据数据禁用对应的不支持互翻的语种
    if (非互翻_自定义不支持) {
      ;(源语言项.children || []).forEach(目标语言项 => {
        const 不支持的数组 = 非互翻_自定义不支持[源语言项.value]
        目标语言项.disabled = 不支持的数组
          ? 不支持的数组.includes(目标语言项.value)
          : true
      })
    } else if (互翻_to不支持的数组) {
      // 如果存在目标语言不支持，则代表该api支持任意互翻，禁用掉本就不支持的语种即可
      ;(源语言项.children || []).forEach(目标语言项 => {
        目标语言项.disabled = 互翻_to不支持的数组.includes(目标语言项.value)
      })
    }
  })
})

// 监听当前的to和form是否是当前api不支持的，如果存在不支持的，则重置
watchEffect(() => {
  const result = 检查from和to是否兼容(form和to的数组.value, 当前翻译api.value)
  if (['from不兼容', 'to不兼容'].includes(result)) {
    重置from和to()
  }
})

// 监听代码模式
watchEffect(() => {
  if (是命名模式.value) {
    form和to的数组.value = ['auto', 'en']
    结果只读.value = true
  } else {
    重置from和to()
  }
})

// 监听结果只读
watch(结果只读, newVal => {
  提示.info(`结果文本框现已${newVal ? '只读' : '可编辑'}`)
})

// 设置弹窗的状态
const 设置弹框正在活动 = computed(() => 设置弹框Ref.value.modal可见)

function 获取下一个api的value() {
  let 下一个api的index =
    翻译api数组.value.findIndex(i => i.value === 当前翻译api.value) + 1
  if (下一个api的index >= 翻译api数组.value.length) {
    下一个api的index = 0
  }
  return 翻译api数组.value[下一个api的index]?.value
}

// Tab键切换翻译方式
onKeyStroke('Tab', e => {
  e.preventDefault()
  if (设置弹框正在活动.value || 翻译api数组.value.length <= 1) {
    return
  }
  当前翻译api.value = 获取下一个api的value()
  setTimeout(() => {
    防抖翻译()
  }, 0)
})
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  bottom: 4px;
  font-size: 22px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    color: var(--primary-color) !important;
  }
}

// 文本域公用样式
.text_wrapper {
  ::v-deep(.arco-textarea) {
    font-size: v-bind(文字尺寸);
    height: 100%;
    padding-right: 26px;
    padding-bottom: 50px;
    resize: none;
  }

  ::v-deep(.arco-textarea-wrapper) {
    background-color: transparent;
    border-color: #e9e9e9;
  }

  ::v-deep(.arco-textarea-focus) {
    border-color: var(--primary-color);
  }
}

// 下面的文本域样式
.text_readonly {
  position: relative;
  ::v-deep(.arco-textarea-focus) {
    border-color: #e9e9e9;
  }
}

.tools_wrapper {
  ::v-deep(.arco-select-view-single) {
    padding-left: 16px;
    padding-right: 16px;
  }
  ::v-deep(.arco-select-view-value) {
    display: grid;
  }
  ::v-deep(.arco-select-view-value) {
    text-align: center;
    font-family: 'iconfont', var(--font-family) !important;
  }
}
.api_icon_wrapper {
  will-change: filter;
}
</style>
