export function secondsToMs(d: number) {
  const m = d <= 60 ? 0 : Math.floor(d / 60)
  const s = Math.floor(d % 60)

  const minutesStr = m < 10 ? '0' + m : String(m)
  const secondsStr = s < 10 ? '0' + s : String(s)

  return `${minutesStr}:${secondsStr}`
}

export function msToSeconds(d: string) {
  const [m, s] = d.split(':')
  return Number(m) * 60 + Number(s)
}

// 请求浏览器通知权限
export function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert('该浏览器不支持桌面通知!')
  } else {
    Notification.requestPermission()
  }
}
