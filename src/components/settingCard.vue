<template>
  <div
    flex="~ col"
    border="~ #f2f3f4 dark:#444"
    class="setting_card transition-all rounded-4px"
  >
    <div
      class="title_wrapper bg-#2f54ea:5 overflow-hidden rounded-t-4px flex-y-c py-4px px-18px text-16px select-none dark:(bg-#333)"
    >
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="px-16px pt-16px flex flex-col flex-1 overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
@property --offset {
  syntax: '<length>';
  inherits: false;
  initial-value: 0;
}
.setting_card {
  box-shadow: 0 4px 8px 1px #064bb30a;
  .title_wrapper {
    text-underline-offset: var(--offset, 1px);
    text-decoration: underline solid #0000;
    transition: --offset 250ms, text-decoration-color 250ms, text-shadow 250ms;
  }

  &:hover {
    box-shadow: 5px 5px 7px #f7f7f7;
    .title_wrapper {
      text-shadow: 4px 4px 7px #fff;
      --offset: 4px;
      text-decoration-color: #ffffff88;
    }
  }
}
</style>
