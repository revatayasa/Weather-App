import Stars from './components/Stars.jsx'
import SearchBar from './components/SearchBar.jsx'
import HeroCard from './components/HeroCard.jsx'
import InfoCards from './components/InfoCards.jsx'
import HourlyForecast from './components/HourlyForecast.jsx'
import { useWeather } from './hooks/useWeather.js'
import styles from './App.module.css'

export default function App() {
  const { weather, location, loading, error, load } = useWeather()

  return (
    <>
      <Stars />

      <main className={styles.app}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.dot} />
            Weather App
          </div>
          <p className={styles.tagline}>Real-time Weather · Worldwide</p>
        </header>

        {/* Search */}
        <SearchBar onSelect={load} />

        {/* Loading */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Memuat data cuaca...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className={styles.errorBanner}>{error}</div>
        )}

        {/* Weather panel */}
        {weather && location && !loading && (
          <div className={styles.panel}>
            <HeroCard weather={weather} location={location} />
            <InfoCards weather={weather} location={location} />
            <HourlyForecast weather={weather} />
          </div>
        )}

        {/* Placeholder */}
        {!weather && !loading && !error && (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>⛅</div>
            <p className={styles.placeholderText}>
              Masukkan nama kota untuk melihat cuaca real-time di seluruh dunia
            </p>
          </div>
        )}
      </main>
    </>
  )
}
