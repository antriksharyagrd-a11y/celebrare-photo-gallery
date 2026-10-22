// src/hooks/useFetchPhotos.js
// ---------------------------------------------------------------
// Custom hook that owns everything about fetching photos:
//   - the DATA  (photos)
//   - the STATUS (loading / error)
// The Gallery component never calls fetch() directly — it just
// calls useFetchPhotos() and reads { photos, loading, error }.
// ---------------------------------------------------------------
import { useCallback, useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]) // the 30 photos once fetched
  const [loading, setLoading] = useState(true) // true while the request is in flight
  const [error, setError] = useState(null) // a friendly message if it fails
  const [reloadKey, setReloadKey] = useState(0) // bumping this re-runs the effect

  useEffect(() => {
    // AbortController lets us cancel the request if the component unmounts
    // (or the user triggers a reload) before the response arrives.
    const controller = new AbortController()

    async function fetchPhotos() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        // fetch() only rejects on network failure — a 404/500 still "succeeds",
        // so we check response.ok ourselves and throw a readable error.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()

        // Each Picsum photo looks like:
        // { id: '0', author: 'Alejandro Escamilla', width: 5000, height: 3333,
        //   url: 'https://unsplash.com/...', download_url: 'https://picsum.photos/id/0/5000/3333' }
        setPhotos(data)
      } catch (err) {
        // Ignore aborts — they are expected when the component unmounts.
        if (err.name === 'AbortError') return
        console.error('Failed to fetch photos:', err)
        setError('We could not load the photos. Please check your internet connection and try again.')
      } finally {
        // Only flip loading off if the request was not cancelled mid-flight.
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    // Cleanup: cancel the in-flight request when the effect re-runs or unmounts.
    return () => controller.abort()
  }, [reloadKey])

  // retry() bumps reloadKey, which re-triggers the useEffect above.
  const retry = useCallback(() => setReloadKey((key) => key + 1), [])

  return { photos, loading, error, retry }
}
