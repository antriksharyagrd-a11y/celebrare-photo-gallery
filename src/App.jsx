// src/App.jsx
// ---------------------------------------------------------------
// COMPOSITION ROOT — the component that wires everything together.
//
// Requirement 4 lives here:
//   favourites useReducer( favouritesReducer, [], initFavourites )
//   └─ third argument = LAZY initializer → restores localStorage on startup
//   useEffect persists every change back to localStorage.
// ---------------------------------------------------------------
import { Suspense, lazy, useCallback, useEffect, useReducer, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Gallery from './components/Gallery'
import FavouritesPanel from './components/FavouritesPanel'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Spinner from './components/Spinner'
import { favouritesReducer, initFavourites, ACTIONS, STORAGE_KEY } from './reducers/favouritesReducer'

// The Guide & Code page is lazy-loaded: its code strings are only
// downloaded when the reviewer opens that tab.
const GuidePage = lazy(() => import('./pages/GuidePage'))

function App() {
  // Which view is showing: 'gallery' (default) or the 'guide' tab
  const [view, setView] = useState('gallery')

  // Requirement 4: favourites are reducer state, restored from localStorage at startup
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites)

  // UI-only state: toast message + whether the drawer is open
  const [toast, setToast] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  // Requirement 4: persist favourites on EVERY change (also clears the key when empty)
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch (error) {
      console.warn('Could not save favourites to localStorage:', error)
    }
  }, [favourites])

  // Auto-dismiss the toast after 2.5 seconds. Returning a cleanup from the
  // effect means the timer is cancelled if a new toast arrives in between.
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2500)
    return () => window.clearTimeout(timer)
  }, [toast])

  // useCallback: one stable function instance, so PhotoCard children never
  // re-render needlessly. This is the same dispatch, wrapped with a toast.
  const toggleFavourite = useCallback(
    (photo) => {
      const wasFavourite = favourites.some((item) => item.id === photo.id)
      dispatch({ type: ACTIONS.TOGGLE, photo })
      setToast(
        wasFavourite
          ? `Removed “${photo.author}” from favourites`
          : `Added “${photo.author}” to favourites`
      )
    },
    [favourites]
  )

  const clearAllFavourites = useCallback(() => {
    favourites.forEach((photo) => dispatch({ type: ACTIONS.TOGGLE, photo }))
    setToast('Cleared all favourites')
  }, [favourites])

  // Escape closes the drawer — small accessibility win
  useEffect(() => {
    if (!panelOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setPanelOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [panelOpen])

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdf8] text-slate-900 antialiased">
      <Header
        view={view}
        onViewChange={setView}
        favouriteCount={favourites.length}
        onOpenFavourites={() => setPanelOpen(true)}
      />

      <main className="flex-1">
        {view === 'gallery' ? (
          <Gallery favourites={favourites} onToggleFavourite={toggleFavourite} />
        ) : (
          <Suspense fallback={<Spinner />}>
            <GuidePage />
          </Suspense>
        )}
      </main>

      <Footer />

      {/* Favourites drawer, mounted only when open so it can animate out */}
      <AnimatePresence>
        {panelOpen && (
          <FavouritesPanel
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
            onClearAll={clearAllFavourites}
            onClose={() => setPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </div>
  )
}

export default App
