export function secondsToMs(d: number) {
  const m = d <= 60 ? 0 : Math.ceil(d / 60)
  const s = Math.ceil(d % 60)

  const minutesStr = m < 10 ? '0' + m : String(m)
  const secondsStr = s < 10 ? '0' + s : String(s)

  return `${minutesStr}:${secondsStr}`
}
