<template>
  <div class="bg-black fixed w-screen h-screen grid-c">
    <div class="moon relative w-200px h-200px rounded-full"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.moon {
  border-top: 5px solid #fff;
  transform: rotate(60deg);
  filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #fff)
    drop-shadow(0 0 20px #fff);
  animation: rotate 1s var(--ani-bezier) 0.2s both;
}

@keyframes rotate {
  100% {
    transform: rotate(-70deg);
  }
}
</style>
