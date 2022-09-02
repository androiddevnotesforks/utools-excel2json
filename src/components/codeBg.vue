<template>
  <div
    position="absolute top-0 left-0 right-0 bottom-0"
    class="code_bg text-100px grid-c"
  >
    <svg>
      <text x="0" y="70%">&lt;code/&gt;</text>
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.code_bg {
  svg {
    width: 415px;
    text {
      animation: stroke_light 2s ease;
      animation-fill-mode: both;
      font-size: 100px;
      font-family: 'JetBrains Mono NL', Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
    }
  }
}
</style>
