export const LAST_CITY_KEY = 'skyline:lastCity'

/**
 * Maps an OpenWeatherMap condition code + day/night flag to one of
 * our custom gradient background tokens defined in tailwind.config.js.
 */
export function getSkyGradient(weatherId, isDay) {
  if (weatherId >= 200 && weatherId < 300) return 'bg-sky-storm' // thunderstorm
  if (weatherId >= 300 && weatherId < 600) return isDay ? 'bg-sky-rain-day' : 'bg-sky-clouds-night' // drizzle/rain
  if (weatherId >= 600 && weatherId < 700) return 'bg-sky-snow-day' // snow
  if (weatherId >= 700 && weatherId < 800) return isDay ? 'bg-sky-clouds-day' : 'bg-sky-clouds-night' // atmosphere/fog
  if (weatherId === 800) return isDay ? 'bg-sky-clear-day' : 'bg-sky-clear-night' // clear
  if (weatherId > 800) return isDay ? 'bg-sky-clouds-day' : 'bg-sky-clouds-night' // clouds
  return isDay ? 'bg-sky-clear-day' : 'bg-sky-clear-night'
}

export function isDaytime(current) {
  const now = current.dt
  return now >= current.sys.sunrise && now < current.sys.sunset
}

export function formatTemp(value) {
  return Math.round(value)
}

export function formatTime(unixSeconds, timezoneOffsetSeconds) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  return `${displayHour}:${minutes} ${period}`
}

export function formatDayLabel(dtTxt) {
  const date = new Date(dtTxt.replace(' ', 'T'))
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export function windDirectionLabel(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(deg / 45) % 8
  return directions[index]
}
