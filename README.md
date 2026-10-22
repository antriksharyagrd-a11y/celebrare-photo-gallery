# 📷 PicSum Gallery — React Photo Gallery

A beginner-friendly photo gallery built with **React 19 + Vite + Tailwind CSS v4** for a frontend internship assignment. Photos come from the free [Picsum Photos](https://picsum.photos) API — exactly **30 photos**, fetched once on page load.

## ✨ Features

| # | Requirement | Implementation |
|---|-------------|----------------|
| 1 | Fetch 30 photos with a custom hook | `src/hooks/useFetchPhotos.js` → returns `{ photos, loading, error }` |
| 1 | Loading spinner | `Spinner.jsx` — shown while the request is in flight |
| 1 | Helpful error message | `ErrorState.jsx` — friendly copy + “Try again” button |
| 2 | 4 col desktop / 2 col tablet / 1 col mobile grid | `sm:grid-cols-2 lg:grid-cols-4` in `Gallery.jsx` |
| 3 | Instant author search, no re-fetch | `useCallback` handler + `useMemo` filtered list in `Gallery.jsx` |
| 4 | Favourites via `useReducer` + `localStorage` | `reducers/favouritesReducer.js` + persistence in `App.jsx` |
| 5 | Clean file organization | One component per file under `src/components/` |

**No UI component libraries** are used — every element is plain React + Tailwind classes.

## 🚀 Getting started

### Prerequisites

- **Node.js ≥ 18** (check with `node -v`)
- **npm ≥ 9** (ships with Node — check with `npm -v`)

### Run it locally

```bash
# 1. Create the project (if starting from scratch)
npm create vite@latest photo-gallery -- --template react
cd photo-gallery

# 2. Install dependencies (Tailwind v4 is a Vite plugin)
npm install
npm install tailwindcss @tailwindcss/vite

# 3. Start the dev server
npm run dev
# → open http://localhost:5173
```

### Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server with hot-module reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## 🗂️ Project structure

```
photo-gallery/
├── index.html                  ← single-page shell (#root)
├── vite.config.ts              ← React + Tailwind v4 plugins
├── package.json
├── public/favicon.svg
└── src/
    ├── main.jsx                ← entry: <App /> in <StrictMode>
    ├── App.jsx                 ← composition root: useReducer + localStorage persistence
    ├── index.css               ← @import "tailwindcss" + brand tokens
    ├── hooks/
    │   └── useFetchPhotos.js   ← { photos, loading, error, retry }
    ├── reducers/
    │   └── favouritesReducer.js← pure TOGGLE reducer + lazy initFavourites()
    ├── pages/
    │   └── GuidePage.jsx       ← in-app guide & source viewer
    └── components/
        ├── Gallery.jsx         ← grid, search (useCallback/useMemo), states
        ├── PhotoCard.jsx       ← photo, author, heart button
        ├── Header.jsx          ← logo, favourites counter
        ├── FavouritesPanel.jsx ← slide-in drawer of saved photos
        ├── Spinner.jsx         ← loading state
        ├── ErrorState.jsx      ← error state + retry
        ├── EmptyState.jsx      ← “no authors match” state
        ├── Toast.jsx           ← favourite add/remove feedback
        ├── ViewSwitcher.jsx    ← Gallery / Guide tabs
        └── Footer.jsx
```

## 🔌 How the API works

```bash
curl https://picsum.photos/v2/list?limit=30
```

Returns exactly 30 objects:

```json
[
  {
    "id": "0",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
    "download_url": "https://picsum.photos/id/0/5000/3333"
  }
]
```

Cards render `https://picsum.photos/id/{id}/600/400` — Picsum generates the crop on demand.
The heart stores the whole photo object in `localStorage` under `photo-gallery:favourites`.

## 🧪 How to test every requirement

1. **30 photos on load** — refresh with the Network tab open; one request to `v2/list?limit=30`, 30 items in the response, counter reads `30/30`.
2. **Loading spinner** — DevTools → Network → “Slow 3G”, hard refresh; the spinner appears while fetching.
3. **Error message** — DevTools → Network → Offline, hard refresh; the rose error panel appears. Restore connection, click **Try again**.
4. **Responsive grid** — resize the window / device toolbar: 375 px → 1 column, 768 px → 2 columns, ≥ 1024 px → 4 columns.
5. **Instant search** — type `Alejandro`; the grid filters per keystroke with **zero** network requests; the counter shows `N/30`; clear with the ✕ button. Type `xyzzy` to see the empty state.
6. **Favourites** — click hearts; the badge counter increments, a toast confirms. Hearts toggle on/off.
7. **Persistence** — save favourites, hard refresh (Ctrl/Cmd + R); hearts are still filled. DevTools → Application → Local Storage → key `photo-gallery:favourites`.
8. **useReducer** — `App.jsx` uses `useReducer(favouritesReducer, [], initFavourites)`; there is no `useState` for favourites anywhere.

## 🧠 Screen-recording talking points

- `useFetchPhotos` returns `{ photos, loading, error }`; the Gallery **never calls fetch itself**.
- The fetch effect uses an `AbortController`; `response.ok` is checked manually (HTTP errors don’t reject `fetch`).
- Search handler is wrapped in `useCallback`; the filtered list in `useMemo` — both avoid recomputation on unrelated renders.
- Favourites use `useReducer` with a pure `TOGGLE` action; a lazy 3rd-argument initializer restores `localStorage` before the first render.
- `StrictMode` double-invokes effects in dev — the AbortController makes that safe.

## 📄 License

Educational project for a frontend internship assignment. Photos © their respective Picsum/Unsplash authors.
