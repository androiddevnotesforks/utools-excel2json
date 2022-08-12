<template>
  <!-- 鼠标悬浮在问号图标上，显示提示文字的组件 -->
  <a-popover position="right">
    <i
      i-ph-question
      class="text-16px -mt-2px hover:color-black transition-all"
    />
    <template #content>
      <slot></slot>
    </template>
  </a-popover>
</template>

<script setup></script>

<style lang="scss" scoped></style>
