import { useState, useRef, useEffect } from 'react'
import { useGeocoding } from '../hooks/useGeocoding.js'
import { geocode } from '../utils/api.js'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSelect }) {
  const [query, setQuery]   = useState('')
  const [error, setError]   = useState('')
  const containerRef        = useRef(null)

  const { suggestions, showList, search, clearSuggestions } = useGeocoding()

  // close suggestions when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) clearSuggestions()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [clearSuggestions])

  function handleChange(e) {
    const val = e.target.value
    setQuery(val)
    setError('')
    search(val)
  }

  function handleSelect(result) {
    setQuery(result.name)
    clearSuggestions()
    onSelect(result)
  }

  async function handleSubmit() {
    const q = query.trim()
    if (!q) { setError('Masukkan nama kota terlebih dahulu.'); return }
    try {
      const results = await geocode(q)
      if (!results.length) {
        setError(`Kota "${q}" tidak ditemukan. Coba nama lain.`)
        return
      }
      clearSuggestions()
      handleSelect(results[0])
    } catch {
      setError('Gagal terhubung. Periksa koneksi internet Anda.')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.box}>
        <span className={styles.icon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Cari kota (contoh: Jakarta, Tokyo, Paris...)"
          autoComplete="off"
        />
        <button className={styles.btn} onClick={handleSubmit}>
          Cari →
        </button>
      </div>

      {showList && (
        <div className={styles.dropdown}>
          {suggestions.map((r, i) => (
            <div
              key={i}
              className={styles.item}
              onMouseDown={() => handleSelect(r)}
            >
              <span className={styles.pin}>📍</span>
              <span>
                {r.name}
                {r.admin1 ? `, ${r.admin1}` : ''} —{' '}
                <strong>{r.country}</strong>
              </span>
            </div>
          ))}
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
