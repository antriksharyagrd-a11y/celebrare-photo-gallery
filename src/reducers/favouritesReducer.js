// src/reducers/favouritesReducer.js
// ---------------------------------------------------------------
// Favourites are managed with useReducer (NOT useState) and saved
// to localStorage, so they survive a page refresh.
// The reducer is a *pure function*: same state + same action in,
// same brand-new state out. React 19 StrictMode may call it twice,
// which is perfectly safe because it never mutates anything.
// ---------------------------------------------------------------

export const STORAGE_KEY = 'photo-gallery:favourites'

// Every possible action the reducer knows about. One action is all we need:
// TOGGLE flips a photo in or out of the favourites list.
export const ACTIONS = {
  TOGGLE: 'TOGGLE',
}

// Lazy initialiser: runs ONCE when the app starts and reads any favourites
// the user saved in a previous session. Passed to useReducer as the 3rd argument.
export function initFavourites() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    // Corrupted or unreadable storage should never crash the app — start fresh.
    console.warn('Could not restore favourites from localStorage:', error)
    return []
  }
}

// reducer(currentState, action) -> nextState
export function favouritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE: {
      const alreadyFavourite = state.some((photo) => photo.id === action.photo.id)

      if (alreadyFavourite) {
        // Remove it: keep every photo EXCEPT the one we clicked.
        return state.filter((photo) => photo.id !== action.photo.id)
      }

      // Add it: prepend so the newest favourite appears first.
      return [action.photo, ...state]
    }

    default:
      // Unknown action types return the state unchanged — a safety net.
      return state
  }
}
