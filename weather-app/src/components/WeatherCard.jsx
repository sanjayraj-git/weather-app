import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react'
import { formatTemp, capitalizeWords } from '../utils/weatherHelpers'

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

function getIcon(main, isDay) {
  const key = main.toLowerCase()
  if (key === 'clear' && !isDay) return Moon
  return ICONS[key] ?? Cloud
}

export default function WeatherCard({ current, isDay }) {
  const weather = current.weather[0]
  const Icon = getIcon(weather.main, isDay)

  return (
    <div className="w-full animate-rise rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-xl backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">
            {current.name}
            <span className="ml-2 font-mono text-sm font-normal text-white/60">
              {current.sys.country}
            </span>
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/60">
            {capitalizeWords(weather.description)}
          </p>
        </div>
        <Icon className="h-12 w-12 flex-shrink-0 text-amber" strokeWidth={1.5} />
      </div>

      <div className="mt-6 flex items-end gap-3">
        <span className="font-display text-7xl font-semibold leading-none tracking-tighter">
          {formatTemp(current.main.temp)}°
        </span>
        <span className="mb-2 font-mono text-sm text-white/60">
          Feels like {formatTemp(current.main.feels_like)}°
        </span>
      </div>

      <div className="mt-4 flex gap-4 font-mono text-xs text-white/50">
        <span>H {formatTemp(current.main.temp_max)}°</span>
        <span>L {formatTemp(current.main.temp_min)}°</span>
      </div>
    </div>
  )
}
