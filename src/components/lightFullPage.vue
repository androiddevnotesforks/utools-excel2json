<template>
  <div class="bg_wrapper fixed w-screen h-screen grid-c overflow-hidden">
    <div class="relative w-200px h-200px">
      <div class="sun"></div>
      <div class="sun_ray"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg_wrapper {
  background: linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%);
}
.sun {
  @apply absolute z-1 w-full h-full rounded-full bg-#ffcd47;
  box-shadow: 0 0 50px #ffff77;
  animation: sun 0.8s ease 0.5s both;
}
.sun_ray {
  @apply w-full h-full rounded-full bg-#fff opacity-50 relative z-0;
  animation: sun-ray 0.8s ease 0.2s both;
}

@keyframes sun {
  50% {
    box-shadow: 0 0 100px #ffff77, 0 0 100px #ffff77, 0 0 100px #ffff77, 0 0 100px #ffff77;
  }
}
@keyframes sun-ray {
  100% {
    transform: scale(15);
    opacity: 0;
  }
}
</style>
