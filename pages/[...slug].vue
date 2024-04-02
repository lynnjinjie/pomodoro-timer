<script setup lang="ts">
import { secondsToMs, msToSeconds, requestNotificationPermission } from '@/utils/index'

interface DurationPickList {
  duration: string
  isActive: boolean
}
const audioButtonRef = ref<HTMLAudioElement | null>(null)
const audioAlarmRef = ref<HTMLAudioElement | null>(null)

const constant = ref<number>(10)

let time = computed(() => secondsToMs(constant.value))
let timer: ReturnType<typeof setInterval>

const timeActived = ref<boolean>(false)
const isSetting = ref<boolean>(false)

const durationPickList = ref<DurationPickList[]>([
  { duration: '01:10', isActive: true },
  { duration: '15:00', isActive: false },
  { duration: '25:00', isActive: false },
  { duration: '45:00', isActive: false },
  { duration: '60:00', isActive: false },
])
const currentDuration = computed(() => durationPickList.value.find(item => Boolean(item.isActive))?.duration as string)
const currentDurationMs = computed(() => msToSeconds(currentDuration.value))
// 计算进度条
const progressValue = computed(() => (((currentDurationMs.value - constant.value) / currentDurationMs.value) * 100).toFixed(2))
onMounted(() => {
  constant.value = currentDurationMs.value
})

function startTimer(duration: number) {
  timer = setInterval(() => {
    if(duration <= 0) {
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
  audioButtonRef.value?.play()
  // 请求浏览器通知权限
  requestNotificationPermission()
  timeActived.value = true
  clearInterval(timer)
  startTimer(constant.value)
}
function handlePause() {
  audioButtonRef.value?.play()
   clearInterval(timer)
   timeActived.value = false
}
function reset() {
  timeActived.value = false
  clearInterval(timer)
  constant.value = msToSeconds(currentDuration.value)
  audioAlarmRef.value?.play()
  if (Notification.permission === 'granted') {
    new Notification('恭喜你,完成了一个番茄钟!')
  }
}
function handleReset() {
  timeActived.value = false
  clearInterval(timer)
  constant.value = msToSeconds(currentDuration.value)
}
function handleSetting() {
  isSetting.value = true
}
function chooseTime(d: string) {
  durationPickList.value.forEach(item => {
    if (item.duration === d) {
      item.isActive = true
    } else {
      item.isActive = false
    }
  })
}
function confirmTime() {
  isSetting.value = false
  constant.value = msToSeconds(currentDuration.value)
}
</script>

<template>
  <main class="mx-auto flex justify-center">
    <div class="bg-[rgba(255,255,255,0.1)] rounded-4 text-white text-center py-15 px-10 w-120 h-150 relative">
      <div i-carbon:settings class="absolute top-4 right-4 hover:cursor-pointer" @click="handleSetting"/>
      <div v-if="!isSetting">
        <RadialProgress :value="Number(progressValue)">
          <p class="text-9xl font-bold font-nunito">{{ time }}</p>
        </RadialProgress>
        <div flex justify-center pt-10 relative>
          <div hover:cursor-pointer>
            <div v-if="!timeActived" i-carbon:play-outline text-6xl @click="handleStart"></div>
            <div v-if="timeActived" i-carbon:pause-outline text-6xl @click="handlePause"></div>
          </div>
          <div v-if="timeActived" i-carbon:stop-outline class="text-3xl absolute right-1/4 top-1/2 hover:cursor-pointer" @click="handleReset"></div>
        </div>
      </div>
      <div v-if="isSetting">
        <div class="flex flex-wrap gap-3">
          <template
            v-for="{ duration, isActive } in durationPickList"
            :key="duration"
          >
            <button
              class="time-btn"
              :class="{ 'bg-[#222]': isActive }"
              @click="chooseTime(duration)"
            >
              {{ duration }}
            </button>
          </template>
          <!-- <button class="time-btn flex justify-center items-center">
            <div i-carbon:add></div>
          </button> -->
        </div>
        <div class="absolute bottom-10 left-1/2 translate-x-[-50%]">
          <button btn @click="confirmTime">OK</button>
        </div>
      </div>
    </div>
    <audio hidden ref="audioButtonRef" src="/audio/button-press.wav" />
    <audio hidden ref="audioAlarmRef" src="/audio/alarm-kitchen.mp3" />
  </main>
</template>


<style>
html,body {
  height: 100px;
  background-color: #397097;
}
</style>
