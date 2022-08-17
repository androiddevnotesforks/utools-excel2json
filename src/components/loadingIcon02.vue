<template>
  <svg
    class="loading_main"
    viewBox="0 0 128 128"
    width="128px"
    height="128px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#25c7f4" />
        <stop offset="100%" stop-color="#255ff4" />
      </linearGradient>
    </defs>
    <circle
      class="loading_ring"
      r="56"
      cx="64"
      cy="64"
      fill="none"
      stroke="#1c17171a"
      stroke-width="16"
      stroke-linecap="round"
    />
    <path
      class="loading_worm"
      d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
      fill="none"
      stroke="url(#pl-grad)"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="44 1111"
      stroke-dashoffset="10"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading_main,
.loading_worm {
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
.loading_main {
  animation-name: bump;
  animation-timing-function: linear;
  width: 52px;
  height: 52px;
}
.loading_ring {
  stroke: #17181c26;
  transition: stroke 0.3s;
}
.loading_worm {
  animation-name: worm;
  animation-timing-function: cubic-bezier(0.42, 0.17, 0.75, 0.83);
}

@keyframes bump {
  from,
  42%,
  46%,
  51%,
  55%,
  59%,
  63%,
  67%,
  71%,
  74%,
  78%,
  81%,
  85%,
  88%,
  92%,
  to {
    transform: translate(0, 0);
  }
  44% {
    transform: translate(1.33%, 6.75%);
  }
  53% {
    transform: translate(-16.67%, -0.54%);
  }
  61% {
    transform: translate(3.66%, -2.46%);
  }
  69% {
    transform: translate(-0.59%, 15.27%);
  }
  76% {
    transform: translate(-1.92%, -4.68%);
  }
  83% {
    transform: translate(9.38%, 0.96%);
  }
  90% {
    transform: translate(-4.55%, 1.98%);
  }
}
@keyframes worm {
  from {
    stroke-dashoffset: 10;
  }
  25% {
    stroke-dashoffset: 295;
  }
  to {
    stroke-dashoffset: 1165;
  }
}
</style>
