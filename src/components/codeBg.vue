<template>
  <div class="code_bg">
    <svg>
      <text x="0" y="70%">&lt;code/&gt;</text>
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.code_bg {
  @apply absolute text-100px grid-c left-0 right-0 top-0 bottom-0;
  svg {
    width: 415px;
    text {
      animation: stroke_light 2s ease;
      @apply text-100px animate-fill-both;
      font-family: 'JetBrains Mono NL', Menlo, Monaco, Consolas,
        'Liberation Mono', 'Courier New', monospace;
    }
  }
}
</style>
