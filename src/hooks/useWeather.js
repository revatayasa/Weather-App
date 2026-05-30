import { useState, useCallback } from 'react'
import { fetchWeather } from '../utils/api.js'

/**
 * Custom hook to manage weather fetching state
 */
export function useWeather() {
  const [weather, setWeather]       = useState(null)
  const [location, setLocation]     = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)

  const load = useCallback(async (locationInfo) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const tz   = locationInfo.timezone ?? 'auto'
      const data = await fetchWeather(locationInfo.latitude, locationInfo.longitude, tz)
      setWeather(data)
      setLocation(locationInfo)
    } catch (err) {
      setError(err.message ?? 'Terjadi kesalahan.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, location, loading, error, load }
}
