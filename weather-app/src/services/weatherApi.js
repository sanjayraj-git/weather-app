import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

/**
 * Custom error class so components can distinguish API/network
 * failures from programming errors, and show the right message.
 */
export class WeatherApiError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'WeatherApiError'
    this.code = code // 'NOT_FOUND' | 'TIMEOUT' | 'NETWORK' | 'NO_KEY' | 'UNKNOWN'
  }
}

function assertApiKey() {
  if (!API_KEY) {
    throw new WeatherApiError(
      'Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.',
      'NO_KEY',
    )
  }
}

function normalizeError(error) {
  if (error instanceof WeatherApiError) return error

  if (axios.isCancel(error)) {
    return new WeatherApiError('Request cancelled.', 'CANCELLED')
  }
  if (error.code === 'ECONNABORTED') {
    return new WeatherApiError(
      'The weather service took too long to respond. Please try again.',
      'TIMEOUT',
    )
  }
  if (error.response?.status === 404) {
    return new WeatherApiError(
      `We couldn't find a city matching "${error.config?.params?.q ?? ''}". Check the spelling and try again.`,
      'NOT_FOUND',
    )
  }
  if (error.response?.status === 401) {
    return new WeatherApiError(
      'Invalid API key. Double-check VITE_OPENWEATHER_API_KEY in your .env file.',
      'UNAUTHORIZED',
    )
  }
  if (!error.response) {
    return new WeatherApiError(
      'Network error. Check your internet connection and try again.',
      'NETWORK',
    )
  }
  return new WeatherApiError('Something went wrong fetching the weather.', 'UNKNOWN')
}

/**
 * Fetches current conditions + a processed 5-day / 3-hour forecast
 * for a given city name. Runs both requests in parallel.
 */
export async function fetchWeatherByCity(city, signal) {
  assertApiKey()
  try {
    const [currentRes, forecastRes] = await Promise.all([
      client.get('/weather', {
        params: { q: city, appid: API_KEY, units: 'metric' },
        signal,
      }),
      client.get('/forecast', {
        params: { q: city, appid: API_KEY, units: 'metric' },
        signal,
      }),
    ])

    return {
      current: currentRes.data,
      forecast: buildDailyForecast(forecastRes.data),
    }
  } catch (error) {
    throw normalizeError(error)
  }
}

/**
 * Fetches weather using raw coordinates (used for "use my location").
 */
export async function fetchWeatherByCoords(lat, lon, signal) {
  assertApiKey()
  try {
    const [currentRes, forecastRes] = await Promise.all([
      client.get('/weather', {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
        signal,
      }),
      client.get('/forecast', {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
        signal,
      }),
    ])

    return {
      current: currentRes.data,
      forecast: buildDailyForecast(forecastRes.data),
    }
  } catch (error) {
    throw normalizeError(error)
  }
}

/**
 * The free /forecast endpoint returns 3-hour steps for 5 days (40 entries).
 * This collapses them into one representative entry per day (the one
 * closest to midday), giving a clean 5-day forecast strip.
 */
function buildDailyForecast(forecastData) {
  const byDay = new Map()

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0]
    const hour = Number(entry.dt_txt.split(' ')[1].split(':')[0])
    const distanceFromNoon = Math.abs(12 - hour)

    if (!byDay.has(date) || distanceFromNoon < byDay.get(date).distanceFromNoon) {
      byDay.set(date, { entry, distanceFromNoon })
    }
  })

  return Array.from(byDay.values())
    .slice(0, 5)
    .map(({ entry }) => entry)
}
