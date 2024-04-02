<script setup lang="ts">
const { value, size, thickness } = defineProps({
  content: {
    type: String,
    default: '00:00'
  },
  size: {
    type: String,
    default: '24rem'
  },
  thickness: {
    type: String,
    default: '.5rem'
  },
  value: {
    type: Number,
    default: 0
  }
});

</script>

<template>
  <div
    class="radial-progress"
    :style="{'--value':value,'--size': size, '--thickness': thickness,}"
    role="progressbar"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.radial-progress {
  --value: 0;
  --size: 5rem;
  --thickness: calc(var(--size) / 10);
  @apply relative inline-grid h-[var(--size)] w-[var(--size)] place-content-center rounded-full bg-transparent;
  vertical-align: middle;
  box-sizing: content-box;
}
.radial-progress::-moz-progress-bar {
  @apply appearance-none bg-transparent;
}
.radial-progress::-webkit-progress-value {
  @apply appearance-none bg-transparent;
}
.radial-progress::-webkit-progress-bar {
  @apply appearance-none bg-transparent;
}
.radial-progress:before,
.radial-progress:after {
  @apply absolute rounded-full;
  content: "";
}
.radial-progress:before {
  @apply inset-0;
  background:
    radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness)
      no-repeat,
    conic-gradient(currentColor calc(var(--value) * 1%), #0000 0);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--thickness)),
    #000 calc(100% - var(--thickness))
  );
  mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--thickness)),
    #000 calc(100% - var(--thickness))
  );
}
.radial-progress:after {
  @apply bg-current;
  inset: calc(50% - var(--thickness) / 2);
  transform: rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%));
  transition: transform all ease; 
}
</style>
