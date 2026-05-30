import { getWMO, windDirection, pressureLabel } from '../utils/weather.js'
import styles from './HeroCard.module.css'

export default function HeroCard({ weather, location }) {
  const c = weather.current
  const [icon, label] = getWMO(c.weather_code)

  const localTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: weather.timezone,
  })

  return (
    <div className={styles.card}>
      {/* Top section */}
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.locationLabel}>
            <span className={styles.dot} />
            Lokasi Real-time
          </div>
          <div className={styles.city}>{location.name}</div>
          <div className={styles.country}>
            {[location.admin1, location.country].filter(Boolean).join(', ')}
          </div>
          <div className={styles.tempRow}>
            <span className={styles.tempValue}>{Math.round(c.temperature_2m)}</span>
            <span className={styles.tempUnit}>°C</span>
          </div>
          <div className={styles.feelsLike}>
            Terasa seperti {Math.round(c.apparent_temperature)}°C
          </div>
          <div className={styles.badge}>
            {icon} {label}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.bigIcon}>{icon}</div>
          <div className={styles.iconLabel}>
            {c.is_day ? '☀ Siang' : '🌙 Malam'}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className={styles.grid}>
        <StatItem icon="💧" label="Kelembapan" value={`${c.relative_humidity_2m}%`} />
        <StatItem
          icon="💨"
          label="Angin"
          value={`${Math.round(c.wind_speed_10m)} km/j`}
          sub={windDirection(c.wind_direction_10m)}
        />
        <StatItem icon="🌧️" label="Curah Hujan" value={`${c.precipitation} mm`} />
        <StatItem
          icon="📊"
          label="Tekanan"
          value={`${Math.round(c.surface_pressure)} hPa`}
          sub={pressureLabel(c.surface_pressure)}
        />
      </div>

      {/* Local time footer */}
      <div className={styles.timeBar}>
        <span className={styles.timeText}>
          Waktu Lokal: <strong>{localTime}</strong> · {weather.timezone}
        </span>
      </div>
    </div>
  )
}

function StatItem({ icon, label, value, sub }) {
  return (
    <div className={styles.statItem}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>
          {value}
          {sub && <small className={styles.statSub}> {sub}</small>}
        </div>
      </div>
    </div>
  )
}
