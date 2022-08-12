<template>
  <div class="flex justify-center m-10px w-300px">
    <a-input v-model.trim="q" allow-clear />
    <a-button type="primary" class="ml-10px" @click="submit"> 提交 </a-button>
  </div>
  <div class="result m-10px w-600px">
    <a-textarea v-model="text"></a-textarea>
  </div>
</template>

<script setup>
import { translationCommon } from '@/apis/translation'
const q = ref('test a word')
const text = ref('')

async function submit() {
  const options = {
    q: q.value,
    from: 'en',
    to: 'zh'
  }

  console.log('========提交请求')
  const result = await translationCommon('baidu', options)
  console.log('result:', result)
  text.value = result.text
}
</script>
<style scoped lang="scss"></style>
