<template>
  <svg class="ap" viewBox="0 0 128 256" width="128px" height="256px">
    <defs>
      <linearGradient id="ap-grad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#255ff4" />
        <stop offset="100%" stop-color="#5225f4" />
      </linearGradient>
      <linearGradient id="ap-grad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#25c7f4" />
        <stop offset="50%" stop-color="#255ff4" />
        <stop offset="100%" stop-color="#5225f4" />
      </linearGradient>
    </defs>
    <circle
      class="ap_ring"
      r="56"
      cx="64"
      cy="192"
      fill="none"
      stroke="#ddd"
      stroke-width="16"
      stroke-linecap="round"
    />
    <circle
      class="ap_worm1"
      r="56"
      cx="64"
      cy="192"
      fill="none"
      stroke="url(#ap-grad1)"
      stroke-width="16"
      stroke-linecap="round"
      stroke-dasharray="87.96 263.89"
    />
    <path
      class="ap_worm2"
      d="M120,192A56,56,0,0,1,8,192C8,161.07,16,8,64,8S120,161.07,120,192Z"
      fill="none"
      stroke="url(#ap-grad2)"
      stroke-width="16"
      stroke-linecap="round"
      stroke-dasharray="87.96 494"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ap {
  width: 50px;
  height: 100px;
}

.ap_ring {
  stroke: #17181c26;
  transition: stroke 0.3s;
}

.ap_worm1,
.ap_worm2 {
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.ap_worm1 {
  animation-name: worm1;
}

.ap_worm2 {
  visibility: hidden;
  animation-name: worm2;
}

@keyframes worm1 {
  0% {
    stroke-dashoffset: -87.96;
    animation-timing-function: ease-in-out;
  }

  20% {
    stroke-dashoffset: 0;
    animation-timing-function: ease-in;
  }

  60% {
    visibility: visible;
    stroke-dashoffset: -791.68;
  }

  60.1%,
  100% {
    visibility: hidden;
    stroke-dashoffset: -791.68;
  }
}

@keyframes worm2 {
  0%,
  60% {
    visibility: hidden;
    stroke-dashoffset: -87.96;
  }

  60.1% {
    visibility: visible;
    stroke-dashoffset: -87.96;
    animation-timing-function: cubic-bezier(0, 0, 0.5, 0.75);
  }

  77% {
    visibility: visible;
    stroke-dashoffset: -340;
    animation-timing-function: cubic-bezier(0.5, 0.25, 0.5, 0.88);
  }

  100% {
    visibility: visible;
    stroke-dashoffset: -669.92;
  }
}
</style>
