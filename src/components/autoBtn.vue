<template>
  <button
    bg="hover:(#f2f3f5 dark:#3d3d3d) active:(#eff2fa dark:#424242)"
    class="select-none w-32px grid-c cursor-pointer rounded-t-2px transition-all duration-100 overflow-hidden aspect-ratio-square"
    @click="handleClick"
  >
    <i
      i-simple-icons-adobeillustrator
      class="text-19px rounded-2px overflow-hidden transition-all !duration-200"
      :class="[props.active ? 'active_auto_btn' : 'disabled_auto_btn']"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
  },
})
const emit = defineEmits(['click'])
function handleClick(ev: MouseEvent) {
  emit('click', ev)
}
</script>

<style lang="scss" scoped></style>
