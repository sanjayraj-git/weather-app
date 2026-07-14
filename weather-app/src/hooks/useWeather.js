import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/weatherApi'
import { LAST_CITY_KEY } from '../utils/weatherHelpers'

/**
 * Encapsulates all weather data-fetching concerns: loading state,
 * error state, request cancellation on rapid re-search, and
 * persisting the last searched city to localStorage.
 */
export function useWeather() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const runFetch = useCallback(async (fetcher, persistLabel) => {
    // Cancel any in-flight request before starting a new one.
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('loading')
    setError(null)

    try {
      const result = await fetcher(controller.signal)
      setData(result)
      setStatus('success')
      if (persistLabel) {
        localStorage.setItem(LAST_CITY_KEY, persistLabel)
      }
    } catch (err) {
      if (err.code === 'CANCELLED') return
      setError(err)
      setStatus('error')
    }
  }, [])

  const searchCity = useCallback(
    (city) => {
      const trimmed = city.trim()
      if (!trimmed) return
      runFetch((signal) => fetchWeatherByCity(trimmed, signal), trimmed)
    },
    [runFetch],
  )

  const searchCoords = useCallback(
    (lat, lon, label) => {
      runFetch((signal) => fetchWeatherByCoords(lat, lon, signal), label ?? null)
    },
    [runFetch],
  )

  // On mount, reload the last searched city from localStorage.
  useEffect(() => {
    const lastCity = localStorage.getItem(LAST_CITY_KEY)
    if (lastCity) {
      searchCity(lastCity)
    } else {
      setStatus('idle')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, status, error, searchCity, searchCoords }
}
