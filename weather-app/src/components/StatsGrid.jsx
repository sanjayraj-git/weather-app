import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from 'lucide-react'
import { formatTime, windDirectionLabel } from '../utils/weatherHelpers'

function StatTile({ icon: Icon, label, value, unit }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:bg-white/10">
      <div className="flex items-center gap-2 text-white/50">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
        <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-mono text-xl font-medium text-white">
        {value}
        {unit && <span className="ml-1 text-sm text-white/50">{unit}</span>}
      </p>
    </div>
  )
}

export default function StatsGrid({ current }) {
  const { main, wind, visibility, sys, timezone } = current

  return (
    <div className="grid animate-rise grid-cols-2 gap-3 sm:grid-cols-3" style={{ animationDelay: '80ms' }}>
      <StatTile icon={Droplets} label="Humidity" value={main.humidity} unit="%" />
      <StatTile
        icon={Wind}
        label="Wind"
        value={`${wind.speed.toFixed(1)} ${windDirectionLabel(wind.deg ?? 0)}`}
        unit="m/s"
      />
      <StatTile icon={Gauge} label="Pressure" value={main.pressure} unit="hPa" />
      <StatTile icon={Eye} label="Visibility" value={(visibility / 1000).toFixed(1)} unit="km" />
      <StatTile icon={Sunrise} label="Sunrise" value={formatTime(sys.sunrise, timezone)} />
      <StatTile icon={Sunset} label="Sunset" value={formatTime(sys.sunset, timezone)} />
    </div>
  )
}
