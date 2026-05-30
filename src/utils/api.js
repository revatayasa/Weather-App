/**
 * Geocode a city name using Open-Meteo Geocoding API (free, no key needed)
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function geocode(query) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', query)
  url.searchParams.set('count', '6')
  url.searchParams.set('language', 'id')
  url.searchParams.set('format', 'json')

  const res = await fetch(url)
  if (!res.ok) throw new Error('Geocoding gagal')
  const data = await res.json()
  return data.results ?? []
}

/**
 * Fetch current + hourly weather from Open-Meteo (free, no key needed)
 * @param {number} lat
 * @param {number} lon
 * @param {string} timezone
 * @returns {Promise<Object>}
 */
export async function fetchWeather(lat, lon, timezone = 'auto') {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', lat)
  url.searchParams.set('longitude', lon)
  url.searchParams.set('timezone', timezone)
  url.searchParams.set('forecast_days', '1')
  url.searchParams.set('wind_speed_unit', 'kmh')
  url.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'visibility',
    ].join(',')
  )
  url.searchParams.set(
    'hourly',
    ['temperature_2m', 'weather_code', 'precipitation_probability'].join(',')
  )

  const res = await fetch(url)
  if (!res.ok) throw new Error('Gagal memuat data cuaca')
  return await res.json()
}
