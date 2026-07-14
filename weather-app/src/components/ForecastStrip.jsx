import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'
import { formatDayLabel, formatTemp } from '../utils/weatherHelpers'

const ICONS = {
  clear: Sun,
  clouds: Cloud,
  rain: CloudRain,
  drizzle: CloudRain,
  thunderstorm: CloudLightning,
  snow: CloudSnow,
  mist: CloudFog,
  fog: CloudFog,
  haze: CloudFog,
}

export default function ForecastStrip({ forecast }) {
  if (!forecast?.length) return null

  return (
    <div className="animate-rise" style={{ animationDelay: '160ms' }}>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-white/50">5-Day Forecast</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {forecast.map((day) => {
          const weather = day.weather[0]
          const Icon = ICONS[weather.main.toLowerCase()] ?? Cloud
          return (
            <div
              key={day.dt}
              className="flex w-20 flex-shrink-0 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              <span className="font-mono text-xs text-white/60">{formatDayLabel(day.dt_txt)}</span>
              <Icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
              <span className="font-display text-sm font-medium">{formatTemp(day.main.temp)}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
