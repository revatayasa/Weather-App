import { getWMO } from '../utils/weather.js'
import styles from './HourlyForecast.module.css'

export default function HourlyForecast({ weather }) {
  const h       = weather.hourly
  const curHour = new Date().getHours()
  const curIdx  = h.time.findIndex((t) => new Date(t).getHours() === curHour)
  const start   = Math.max(0, curIdx)
  const end     = Math.min(start + 9, h.time.length)
  const slice   = h.time.slice(start, end)

  return (
    <div className={styles.card}>
      <div className={styles.title}>Prakiraan Per Jam</div>
      <div className={styles.scroll}>
        {slice.map((t, i) => {
          const idx       = start + i
          const hr        = new Date(t).getHours()
          const [icon]    = getWMO(h.weather_code[idx])
          const temp      = Math.round(h.temperature_2m[idx])
          const isCurrent = idx === curIdx

          return (
            <div key={idx} className={`${styles.item} ${isCurrent ? styles.current : ''}`}>
              <span className={styles.time}>
                {isCurrent ? 'Kini' : `${String(hr).padStart(2, '0')}:00`}
              </span>
              <span className={styles.emoji}>{icon}</span>
              <span className={styles.temp}>{temp}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
