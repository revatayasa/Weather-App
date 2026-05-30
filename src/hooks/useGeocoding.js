import { useState, useRef, useCallback } from 'react'
import { geocode } from '../utils/api.js'

/**
 * Custom hook for city search with debounced autocomplete
 */
export function useGeocoding() {
  const [suggestions, setSuggestions] = useState([])
  const [showList, setShowList]       = useState(false)
  const [searching, setSearching]     = useState(false)
  const debounceRef                   = useRef(null)

  const search = useCallback((query) => {
    clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setSuggestions([])
      setShowList(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const results = await geocode(query)
        setSuggestions(results)
        setShowList(results.length > 0)
      } catch {
        setSuggestions([])
        setShowList(false)
      } finally {
        setSearching(false)
      }
    }, 350)
  }, [])

  const clearSuggestions = useCallback(() => {
    setSuggestions([])
    setShowList(false)
  }, [])

  return { suggestions, showList, searching, search, clearSuggestions }
}
