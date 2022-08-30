<template>
  <a-modal
    v-model:visible="导出弹窗显隐"
    title=""
    title-align="start"
    @cancel="关闭导出弹窗()"
  >
    <template #title>
      <div class="horizontal-place-4px">
        <span>导出</span>
        <i i-line-md-uploading-loop class="text-18px"></i>
      </div>
    </template>
    <div class="space-y-8px">
      <a-alert>
        将导出当前
        <span class="text_important"> 「已生效的配置」 </span>
        ，如果你刚才修改过设置，还未点确定进行保存，请先点确定保存后再进行导出。
      </a-alert>
      <a-input-password
        ref="导出密码框Ref"
        v-model.trim="导出密码框"
        :max-length="20"
        show-word-limit
        placeholder="密码（非必填）"
      />
      <p class="text-12px text-red-500 leading-tight">
        如果你设置了密码，在导入时需要填写相同的密码才能正常导入
      </p>
    </div>
    <template #footer>
      <div class="space-x-12px">
        <a-button @click="关闭导出弹窗()">取消</a-button>
        <a-button type="primary" @click="导出数据()">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
const emit = defineEmits(['exportSubmit'])
const 导出弹窗显隐 = ref(false)
const 导出密码框Ref = ref()
const 导出密码框 = ref('') // 导出密码框的内容
async function 导出数据() {
  emit('exportSubmit', 导出密码框.value)
}

function 导出密码框获取焦点() {
  导出密码框Ref.value.focus()
}

function 关闭导出弹窗() {
  导出密码框.value = ''
  导出弹窗显隐.value = false
}

function 打开导出弹窗() {
  导出弹窗显隐.value = true
  nextTick(() => {
    导出密码框获取焦点()
  })
}

defineExpose({
  打开导出弹窗,
  关闭导出弹窗,
})
</script>

<style lang="scss" scoped></style>
