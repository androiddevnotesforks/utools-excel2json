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
          <template v-if="!['', undefined, null].includes(用户输入)">
            <MimicryBtn
              key="1"
              class="absolute right-10px bottom-8px"
              @click="清空输入框()"
            >
              <i i-line-md-close />
            </MimicryBtn>
          </template>
        </transition>

        <span
          v-show="检测语言显示条件 && 结果对象.数据.from语种"
          class="absolute opacity-35 left-12px bottom-8px text-12px text-#777 dark:text-white"
        >
          检测到: {{ 结果对象.数据.from语种 }}
        </span>

        <!-- 上方文本域 -->
        <a-textarea
          ref="用户输入框Ref"
          v-model="用户输入"
          class="rounded-t-8px"
          placeholder="请输入要翻译的内容"
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
            <div class="flex space-x-4px">
              <div
                class="grid-c"
                :class="[当前翻译api === 项.value ? 'contrast-120' : 'grayscale-30']"
              >
                <ApiIcon :data="项" />
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
            <AutoBtn v-model="自动模式" @click="切换自动模式()" />
            <a-cascader
              v-model:model-value="form和to的数组"
              path-mode
              :options="语种树的数据"
              :style="{ width: '240px' }"
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
          <codeBg v-if="是命名模式 && [-1, 200].includes(结果对象.数据.结果码)" />
          <transition name="fade-in-standard">
            <Loading
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
              v-model="结果对象.数据.结果文字"
              class="rounded-b-8px relative z-1"
              :placeholder="下方placeholder"
              :readonly="结果只读"
            />
            <transition v-if="朗读功能 && !是命名模式" name="fade-in-standard">
              <div
                v-show="要显示复制按钮"
                class="absolute left-10px bottom-8px z-1 flex space-x-8px"
              >
                <!-- 播放按钮 -->
                <MimicryBtn :loading="朗读loading" @click="点击朗读()">
                  <i i-akar-icons-sound-on />
                </MimicryBtn>

                <!-- 开始暂停按钮 -->
                <MimicryBtn v-show="音频Url" @click="正在播放 = !正在播放">
                  <i :class="[正在播放 ? 'i-ic-twotone-pause' : 'i-ri-play-fill']"></i>
                </MimicryBtn>
              </div>
            </transition>

            <transition name="fade-in-standard" mode="out-in">
              <div
                v-show="要显示复制按钮"
                class="bottom-8px absolute-x-center z-1 flex space-x-8px"
              >
                <ColorfulBtn
                  v-if="复制按钮显示的数组.includes(1)"
                  @click="复制按钮事件(1)"
                >
                  <template #icon>
                    <i i-line-md-clipboard-arrow class="text-18px" />
                  </template>
                  仅复制
                </ColorfulBtn>
                <ColorfulBtn
                  v-if="复制按钮显示的数组.includes(2)"
                  @click="复制按钮事件(2)"
                >
                  <template #icon>
                    <i i-line-md-minus class="text-18px" />
                  </template>
                  复制并隐藏
                </ColorfulBtn>
                <ColorfulBtn
                  v-if="复制按钮显示的数组.includes(3)"
                  @click="复制按钮事件(3)"
                >
                  <template #icon>
                    <i i-line-md-edit-twotone class="text-18px" />
                  </template>
                  复制并输入
                </ColorfulBtn>
              </div>
            </transition>
          </div>
        </div>
      </a-resize-box>
    </div>
    <!-- 设置按钮 -->
    <i
      id="setting-wrapper"
      class="icon setting_icon i-ep-setting"
      @click="打开设置Modal()"
    />
    <!-- 命名翻译模式按钮 -->
    <i
      class="icon code_icon"
      :class="[是命名模式 ? 'code_active i-tabler-code' : 'i-tabler-code-off ']"
      @click="切换模式()"
    />
  </div>

  <!-- 设置弹窗 -->
  <SettingModal
    ref="设置弹框Ref"
    @ok="设置确定()"
    @cancel="设置取消()"
    @reset="resetHandler()"
  />
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { debounce, throttle } from 'lodash-es'
import { noCase } from 'change-case'
import { Message as 提示 } from '@arco-design/web-vue'
import { 获取存储项, 获取当前 } from '@MainView/MainViewUtils'

import {
  useUtools,
  use主题,
  use命名模式模块,
  use复制模块,
  use语音朗读模块,
  关闭窗口,
  未配置服务引导,
  检查from和to是否兼容,
  获取级联的值,
  通用翻译,
  首次引导,
} from '@MainView/MainViewModule'

import { api不支持的大对象, 用户设置存储, 语种树 } from '@MainView/MainViewData'
import type { CascaderOption, 级联值类型 } from '@MainView/MainViewTypes'

const 语种树的数据 = ref(语种树())
const form和to的数组 = ref<级联值类型>(['auto', 'zh'])
const 存储 = 用户设置存储()
const {
  homeOption: 首页选项,
  getHomeApiOptions: 翻译api数组,
  getHomeFontSize: 文字尺寸,
  copyBtnShow: 复制按钮显示的数组,
} = storeToRefs(存储)
const 翻译加载 = ref(false) // 是否正在翻译
const 用户输入 = ref('') // 输入的内容
const 结果只读 = ref(true) // 结果是否可编辑
const 结果对象 = reactive({
  数据: {
    结果文字: ``, // 翻译结果
    结果码: -1, // 翻译结果状态(code = 200 为成功,code = -1为等待用户操作,code = 401为未配置翻译API)
    from语种: '',
    结果编号: nanoid(),
  },
})
const 当前翻译api = ref('') // 当前翻译api
const 设置弹框Ref = ref() // 设置弹窗的ref
const 用户输入框Ref = ref() // 输入textarea的dom
const 下方placeholder = ref('翻译结果')
const { 朗读功能, 音频Url, 朗读loading, 正在播放, 点击朗读, 重置音频 } = use语音朗读模块(
  form和to的数组,
  结果对象
)

const {
  是命名模式,
  命名模式类型,
  切换类型数组,
  命名模式切换类型,
  返回命名模式对应结果,
  改变命名模式类型,
} = use命名模式模块(结果对象)

const { utools, utools初始化, 粘贴, 延迟关闭utools } = useUtools(
  设置弹框Ref,
  用户输入,
  改变命名模式类型
)

const { 要显示复制按钮, 复制按钮事件 } = use复制模块(
  结果对象,
  utools,
  粘贴,
  延迟关闭utools
)

use主题()

const 自动模式 = ref(true)

关闭窗口(utools)

function 格式化级联显示内容(options: CascaderOption[]) {
  const 文字 = options.map(option => option.label)
  return 文字.join('\u3000  \u3000')
}

function 清空输入框() {
  用户输入.value = ''
  输入框focus()
}

const 检测语言显示条件 = computed(() => {
  return 结果对象.数据.from语种 && !['简体中文'].includes(结果对象.数据.from语种)
})

const { ctrl, command } = useMagicKeys()

// 这个函数目前只有右键才会触发
// 触发后检查是否按下了必要的按键
function 结果只读切换() {
  const 系统 = 获取当前('系统')
  // 条件：当前为Windows、Linux或是浏览器，且按下了Ctrl
  const windows和linux条件 = ['Windows', 'Linux', 'browser'].includes(系统) && ctrl.value

  // 条件：当前为macOS，且按下了Command
  const mac条件 = ['macOS', 'browser'].includes(系统) && command.value

  if (windows和linux条件 || mac条件) {
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
    // 设置成功，刷新上一次翻译
    开始翻译(当前翻译api.value)
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

const 切换自动模式 = throttle(() => {
  自动模式.value = !自动模式.value
}, 500)

watch(自动模式, newVal => {
  提示.success(`智能切换语种已${newVal ? '开启' : '关闭'}`)
})

// 变更模式
const 切换模式 = throttle(() => {
  提示.success({
    content: `命名翻译模式${是命名模式.value ? '关闭' : '开启'}`,
    duration: 1000,
  })
  // 如果未输入，则结果码设为-1，即为等待用户操作状态，-1会触发Code动画
  // 否则，将结果码设为0，后面会触发翻译，翻译成功后继而变为200，会在成功后触发Code动画
  // 如果连续翻译，结果码从200 => 200并不会触发Code动画，符合预期
  结果对象.数据.结果码 = !用户输入.value ? -1 : 0

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

// 分发翻译请求，并开始翻译，默认根据Radio的值来确定翻译api
async function 开始翻译(val = 当前翻译api.value) {
  重置音频()
  输入框focus()
  // 如果没输入内容，则不翻译
  if ([undefined, null, ''].includes(用户输入.value.trim())) {
    结果对象.数据.结果文字 = ''
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

  const { text: 返回的文字, code: 结果码, from: from语种 } = await 通用翻译(val, obj)

  const 处理后的文字 = 是命名模式.value
    ? 返回命名模式对应结果(返回的文字, 命名模式类型.value)
    : 返回的文字
  结果对象.数据 = {
    结果码,
    from语种,
    结果文字: 处理后的文字,
    结果编号: nanoid(),
  }
  翻译加载.value = false
}

function 尝试分词(str: string) {
  const reg = /^[A-Za-z-_]+\d*$/g
  const result = reg.test(str)
  return result ? noCase(str) : str
}

// 切换翻译的From和To
function 语种级联发生变化() {
  自动模式.value = false
  输入框focus()
  setTimeout(() => {
    开始翻译()
  }, 0)
}

// 读取配置
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

onMounted(() => {
  utools && utools初始化()
  输入框focus()
  读取设置()
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
  }
})

// 加了一层防抖的翻译
const 防抖翻译 = debounce(function () {
  开始翻译()
}, 300)

// 监听用户输入，防抖翻译
watch(用户输入, () => 防抖翻译())

// 监听401，自动弹引导层
watch(
  () => 结果对象.数据.结果编号,
  () => {
    if (结果对象.数据.结果码 === 401) {
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

// Tab键切换翻译方式
onKeyStroke('Tab', e => {
  e.preventDefault()
  if (设置弹框正在活动.value) {
    return
  }
  if (翻译api数组.value.length <= 1) {
    return
  }
  let 当前api的index = 翻译api数组.value.findIndex(i => i.value === 当前翻译api.value)
  当前api的index += 1
  if (当前api的index > 翻译api数组.value.length - 1) {
    当前api的index = 0
  }
  const 下一个api = 翻译api数组.value[当前api的index]?.value
  当前翻译api.value = 下一个api
  setTimeout(() => {
    防抖翻译()
  }, 0)
})
</script>

<style lang="scss" scoped>
.main_wrapper,
.main {
  transition: all 200ms var(--ani-bezier);
}

.icon {
  @apply absolute text-22px text-#999 cursor-pointer transition-all duration-250 hover:text-#666 active:text-primary;
  &.setting_icon {
    @apply right-4px bottom-4px hover:i-fluent-settings-28-filled;
  }
  &.code_icon {
    @apply left-4px bottom-4px;
    &.code_active {
      @apply text-primary;
    }
  }
}

// 文本域公用样式
.text_wrapper {
  ::v-deep(.arco-textarea) {
    font-size: v-bind(文字尺寸);
    @apply h-full pr-26px pb-50px resize-none;
  }

  ::v-deep(.arco-textarea-wrapper) {
    @apply border-#e9e9e9 bg-transparent;
  }

  ::v-deep(.arco-textarea-focus) {
    @apply border-primary;
  }
}

// 下面的文本域样式
.text_readonly {
  @apply relative;
  ::v-deep(.arco-textarea-focus) {
    @apply border-#e9e9e9;
  }
}

.tools_wrapper {
  ::v-deep(.arco-select-view-single) {
    @apply px-16px;
  }
  ::v-deep(.arco-select-view-value) {
    @apply grid;
  }
  ::v-deep(.arco-select-view-value) {
    text-align: center;
    font-family: 'iconfont', var(--font-family) !important;
  }
}
</style>
