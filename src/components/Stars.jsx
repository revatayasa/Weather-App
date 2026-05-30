import { useMemo } from 'react'
import styles from './Stars.module.css'

export default function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        left:       `${Math.random() * 100}%`,
        top:        `${Math.random() * 100}%`,
        dur:        `${2 + Math.random() * 4}s`,
        delay:      `${Math.random() * 5}s`,
        brightness: (0.2 + Math.random() * 0.7).toFixed(2),
      })),
    []
  )

  return (
    <div className={styles.stars} aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            left: s.left,
            top:  s.top,
            '--dur':        s.dur,
            '--delay':      s.delay,
            '--brightness': s.brightness,
          }}
        />
      ))}
    </div>
  )
}
