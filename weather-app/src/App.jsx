import { useMemo, useState } from 'react'
import SkyBackground from './components/SkyBackground'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import StatsGrid from './components/StatsGrid'
import ForecastStrip from './components/ForecastStrip'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import { useWeather } from './hooks/useWeather'
import { getSkyGradient, isDaytime } from './utils/weatherHelpers'

export default function App() {
  const { data, status, error, searchCity, searchCoords } = useWeather()
  const [locationError, setLocationError] = useState(null)

  const isDay = data ? isDaytime(data.current) : true
  const gradientClass = useMemo(() => {
    if (!data) return 'bg-sky-clear-day'
    return getSkyGradient(data.current.weather[0].id, isDay)
  }, [data, isDay])

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      return
    }
    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchCoords(position.coords.latitude, position.coords.longitude, null)
      },
      () => {
        setLocationError('Location access was denied. Try searching for a city instead.')
      },
    )
  }

  function handleRetry() {
    if (data?.current?.name) {
      searchCity(data.current.name)
    }
  }

  return (
    <div className="relative min-h-screen font-body">
      <SkyBackground gradientClass={gradientClass} />

      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 px-5 py-10 sm:max-w-lg">
        <header className="animate-rise">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Skyline</p>
          <h1 className="font-display text-xl font-semibold text-white">Weather, at a glance</h1>
        </header>

        <SearchBar onSearch={searchCity} onUseLocation={handleUseLocation} isLoading={status === 'loading'} />

        {locationError && (
          <p className="animate-rise rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/70">
            {locationError}
          </p>
        )}

        {status === 'loading' && <LoadingState />}

        {status === 'error' && <ErrorState error={error} onRetry={data ? handleRetry : undefined} />}

        {status === 'idle' && !data && (
          <div className="flex flex-1 animate-rise flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <p className="font-display text-lg font-medium text-white">Search for a city</p>
            <p className="max-w-xs font-body text-sm text-white/60">
              Try "Chennai", "Madurai", or use your current location to see live conditions.
            </p>
          </div>
        )}

        {status === 'success' && data && (
          <div className="flex flex-col gap-4">
            <WeatherCard current={data.current} isDay={isDay} />
            <StatsGrid current={data.current} />
            <ForecastStrip forecast={data.forecast} />
          </div>
        )}
      </main>
    </div>
  )
}
