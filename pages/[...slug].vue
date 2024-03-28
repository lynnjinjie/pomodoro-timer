<script setup lang="ts">
import { secondsToMs } from '@/utils/index'
const constant = ref<number>(3)
let time = computed(() => secondsToMs(constant.value))
let timer: ReturnType<typeof setInterval>
const reset = () => {
  constant.value = 5
}
function startTimer(duration: number) {
  timer = setInterval(() => {
    if(duration <= 0) {
      clearInterval(timer)
      reset()
      return
    } else {
      duration--
    }
    // 更新持续时间
    constant.value = duration
  }, 1000)

}

function handleStart() {
  clearInterval(timer)
  startTimer(constant.value)
}
function handlePause() {
   clearInterval(timer)
}

</script>

<template>
  <main class="mx-auto mt-20 flex justify-center">
    <div class="border text-center py-20 px-10">
      <p class="text-9xl font-bold font-nunito">{{ time }}</p>
      <button btn @click="handleStart">Start</button>
      <button btn @click="handlePause">Pause</button>
      <button btn @click="reset">Reset</button>
    </div>
  </main>
</template>


<style>
html,body {
  height: 100px;
}
</style>
