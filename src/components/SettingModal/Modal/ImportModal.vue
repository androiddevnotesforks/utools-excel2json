<template>
  <a-modal v-model:visible="导入弹窗显隐" title-align="start" @cancel="关闭导入弹窗()">
    <template #title>
      <div class="horizontal-place-4px">
        <span>导入</span>
        <i i-line-md-downloading-loop class="text-18px"></i>
      </div>
    </template>
    <div>
      <a-alert class="mb-16px"> 导入配置会覆盖当前配置，请备份好相关信息 </a-alert>
      <a-textarea
        ref="导入文本框Ref"
        v-model.trim="导入配置文本"
        :auto-size="{
          minRows: 6,
          maxRows: 6,
        }"
        placeholder="请输入配置信息"
        allow-clear
      />
      <a-input-password
        v-model.trim="导入密码框"
        placeholder="如未设置导入密码，请留空"
        allow-clear
        :max-length="20"
        show-word-limit
      />
    </div>
    <template #footer>
      <div class="space-x-12px">
        <a-button @click="关闭导入弹窗()">取消</a-button>
        <a-button type="primary" @click="导入点击确定()">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
const emit = defineEmits(['importSubmit'])
const 导入弹窗显隐 = ref(false) // 导入弹框的显隐
const 导入配置文本 = ref('')
const 导入文本框Ref = ref()
const 导入密码框 = ref('') // 导入密码框的内容

function 打开导入弹窗() {
  导入弹窗显隐.value = true
  nextTick(() => {
    导入框获得焦点()
  })
}

function 导入框获得焦点() {
  导入文本框Ref.value.focus()
}

function 关闭导入弹窗() {
  导入配置文本.value = ''
  导入密码框.value = ''
  导入弹窗显隐.value = false
}

async function 导入点击确定() {
  emit('importSubmit', { text: 导入配置文本.value, password: 导入密码框.value })
}
defineExpose({
  打开导入弹窗,
  关闭导入弹窗,
})
</script>

<style lang="scss" scoped></style>
