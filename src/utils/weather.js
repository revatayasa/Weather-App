// WMO Weather Interpretation Codes → [emoji, label]
export const WMO = {
  0:  ['☀️',  'Cerah'],
  1:  ['🌤️', 'Sebagian Cerah'],
  2:  ['⛅',  'Berawan Sebagian'],
  3:  ['☁️',  'Mendung'],
  45: ['🌫️', 'Berkabut'],
  48: ['🌫️', 'Kabut Berembun'],
  51: ['🌦️', 'Gerimis Ringan'],
  53: ['🌦️', 'Gerimis'],
  55: ['🌦️', 'Gerimis Lebat'],
  56: ['🌨️', 'Hujan Es Ringan'],
  57: ['🌨️', 'Hujan Es Lebat'],
  61: ['🌧️', 'Hujan Ringan'],
  63: ['🌧️', 'Hujan'],
  65: ['🌧️', 'Hujan Lebat'],
  66: ['🌨️', 'Hujan Beku Ringan'],
  67: ['🌨️', 'Hujan Beku Lebat'],
  71: ['❄️',  'Salju Ringan'],
  73: ['❄️',  'Salju'],
  75: ['❄️',  'Salju Lebat'],
  77: ['🌨️', 'Butiran Salju'],
  80: ['🌦️', 'Hujan Sebentar'],
  81: ['🌧️', 'Hujan Deras Sebentar'],
  82: ['⛈️', 'Hujan Sangat Deras'],
  85: ['🌨️', 'Salju Sebentar'],
  86: ['🌨️', 'Salju Lebat Sebentar'],
  95: ['⛈️', 'Badai Petir'],
  96: ['⛈️', 'Badai Petir + Hujan Es'],
  99: ['⛈️', 'Badai Petir Lebat'],
}

export function getWMO(code) {
  return WMO[code] ?? ['🌡️', `Kode ${code}`]
}

export function windDirection(deg) {
  const dirs = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL']
  return dirs[Math.round(deg / 45) % 8]
}

export function uvLabel(uv) {
  if (uv < 3)  return 'Rendah'
  if (uv < 6)  return 'Sedang'
  if (uv < 8)  return 'Tinggi'
  if (uv < 11) return 'Sangat Tinggi'
  return 'Ekstrem'
}

export function pressureLabel(hpa) {
  if (hpa < 1009) return 'Rendah'
  if (hpa < 1022) return 'Normal'
  return 'Tinggi'
}

export function visibilityLabel(km) {
  if (km > 10) return 'Sangat Jelas'
  if (km > 5)  return 'Jelas'
  if (km > 1)  return 'Kabur'
  return 'Sangat Kabur'
}
