import { uvLabel, visibilityLabel } from '../utils/weather.js'
import styles from './InfoCards.module.css'

export default function InfoCards({ weather, location }) {
  const c     = weather.current
  const uv    = c.uv_index
  const visKm = (c.visibility / 1000).toFixed(1)
  const uvPct = Math.min((uv / 12) * 100, 100).toFixed(1)

  return (
    <div className={styles.row}>
      {/* UV Index */}
      <div className={styles.card}>
        <div className={styles.title}>Indeks UV</div>
        <div className={styles.value}>{uv != null ? uv.toFixed(1) : '—'}</div>
        <div className={styles.sub}>{uvLabel(uv)}</div>
        <div className={styles.uvBar}>
          <div className={styles.uvMarker} style={{ left: `${uvPct}%` }} />
        </div>
        <span className={styles.bgIcon}>☀️</span>
      </div>

      {/* Visibility */}
      <div className={styles.card}>
        <div className={styles.title}>Visibilitas</div>
        <div className={styles.value}>
          {visKm} <small className={styles.unit}>km</small>
        </div>
        <div className={styles.sub}>{visibilityLabel(parseFloat(visKm))}</div>
        <span className={styles.bgIcon}>👁️</span>
      </div>

      {/* Coordinates */}
      <div className={styles.card}>
        <div className={styles.title}>Koordinat</div>
        <div className={styles.value} style={{ fontSize: '1.1rem' }}>
          {location.latitude.toFixed(2)}°
        </div>
        <div className={styles.sub}>
          {location.longitude.toFixed(2)}° · Alt. {location.elevation ?? '—'}m
        </div>
        <span className={styles.bgIcon}>📍</span>
      </div>
    </div>
  )
}
