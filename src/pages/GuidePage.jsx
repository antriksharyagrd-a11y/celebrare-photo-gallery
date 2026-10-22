// src/pages/GuidePage.jsx
// ---------------------------------------------------------------
// The "Guide & Code" tab: complete source of every assignment file
// (imported with Vite's `?raw` suffix so the shown code is always the
// real file — it can never drift out of date), plus setup commands,
// requirement checklist, testing guide and screen-recording script.
// ---------------------------------------------------------------
import { useCallback, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  ClipboardCheck,
  Code2,
  Copy,
  FileCode2,
  FolderTree,
  Info,
  ListChecks,
  Mic,
  Search,
  Terminal,
} from 'lucide-react'

// --- The real source files, bundled at build time as plain strings ---
import useFetchPhotosSource from '../hooks/useFetchPhotos.js?raw'
import favouritesReducerSource from '../reducers/favouritesReducer.js?raw'
import PhotoCardSource from '../components/PhotoCard.jsx?raw'
import GallerySource from '../components/Gallery.jsx?raw'
import AppSource from '../App.jsx?raw'
import mainSource from '../main.jsx?raw'
import indexCssSource from '../index.css?raw'
import indexHtmlSource from '../../index.html?raw'
import packageJsonSource from '../../package.json?raw'
import viteConfigSource from '../../vite.config.ts?raw'
import readmeSource from '../../README.md?raw'

// --- Small static docs (commands, checklist, recording script) ---

const SETUP_COMMANDS = [
  { id: 'scaffold', label: 'Scaffold a Vite + React project', code: 'npm create vite@latest photo-gallery -- --template react' },
  { id: 'enter', label: 'Enter the project folder', code: 'cd photo-gallery' },
  { id: 'deps', label: 'Install the base dependencies', code: 'npm install' },
  { id: 'tw', label: 'Install Tailwind CSS v4 + its Vite plugin', code: 'npm install tailwindcss @tailwindcss/vite' },
  { id: 'icons', label: 'Install icons (optional)', code: 'npm install lucide-react' },
  { id: 'dev', label: 'Start the dev server → http://localhost:5173', code: 'npm run dev' },
  { id: 'build', label: 'Create a production build', code: 'npm run build' },
  { id: 'preview', label: 'Preview the production build locally', code: 'npm run preview' },
]

const PREREQUISITES = [
  { name: 'Node.js', version: 'v18.0.0 or newer (v20 LTS recommended)', check: 'node -v' },
  { name: 'npm', version: 'v9 or newer (ships with Node)', check: 'npm -v' },
  { name: 'Git', version: 'any recent version', check: 'git --version' },
  { name: 'Editor', version: 'VS Code + “ES7+ React/Redux snippets” & “Tailwind CSS IntelliSense”', check: 'code --version' },
]

const FILES = [
  {
    path: 'src/hooks/useFetchPhotos.js',
    role: 'Custom hook — fetches exactly 30 photos from the Picsum API and returns { photos, loading, error }. Owns the AbortController, the HTTP-status check, and the retry counter used by the “Try again” button.',
    concepts: 'useState · useEffect · useCallback · fetch · async/await · AbortController',
    code: useFetchPhotosSource,
    lang: 'js',
  },
  {
    path: 'src/reducers/favouritesReducer.js',
    role: 'Pure reducer + lazy initializer for favourites. TOGGLE adds or removes a photo; initFavourites() restores the saved list from localStorage when the app starts.',
    concepts: 'useReducer · pure functions · localStorage · lazy initialization (3rd argument to useReducer)',
    code: favouritesReducerSource,
    lang: 'js',
  },
  {
    path: 'src/components/PhotoCard.jsx',
    role: 'One card: 3:2 thumbnail (Picsum serves any crop on demand), author avatar initial, author name, and the heart toggle button. Cards never re-render unless their own props change.',
    concepts: 'functional components · props · event handling · conditional rendering · lazy-loaded images with skeleton',
    code: PhotoCardSource,
    lang: 'jsx',
  },
  {
    path: 'src/components/Gallery.jsx',
    role: 'The assignment’s main component. Uses useFetchPhotos (never fetch directly), holds the search text in useState, memoizes the filtered list with useMemo, and keeps handler references stable with useCallback.',
    concepts: 'useState · useCallback · useMemo · conditional rendering · responsive CSS grid',
    code: GallerySource,
    lang: 'jsx',
  },
  {
    path: 'src/App.jsx',
    role: 'Composition root + favourites owner. Holds the useReducer state, syncs it to localStorage with useEffect, renders Header/Gallery/FavouritesPanel/Footer, and owns the toast + drawer UI state.',
    concepts: 'useReducer · useEffect (persistence side-effect) · component composition · AnimatePresence',
    code: AppSource,
    lang: 'jsx',
  },
  {
    path: 'src/main.jsx',
    role: 'Entry point. Mounts <App /> into the #root div inside <StrictMode>. StrictMode double-invokes effects in dev — that is why the fetch effect uses an AbortController.',
    concepts: 'createRoot · StrictMode · entry point',
    code: mainSource,
    lang: 'jsx',
  },
  {
    path: 'src/index.css',
    role: 'Tailwind v4 is a single CSS import — no tailwind.config.js, no PostCSS file. Also holds the brand design tokens (@theme) and the masonry-free fade-in animation.',
    concepts: '@import “tailwindcss” · @theme tokens · custom keyframes',
    code: indexCssSource,
    lang: 'css',
  },
  {
    path: 'index.html',
    role: 'The single HTML page. Only the #root div and the module script to /src/main.jsx (Vite serves JSX to the browser on the fly in dev).',
    concepts: 'single-page app shell · module scripts',
    code: indexHtmlSource,
    lang: 'html',
  },
  {
    path: 'vite.config.ts',
    role: 'Registers the React plugin and @tailwindcss/vite. Tailwind v4 does NOT need a config file — the CSS import is the configuration.',
    concepts: 'Vite plugins · defineConfig',
    code: viteConfigSource,
    lang: 'ts',
  },
  {
    path: 'package.json',
    role: 'Scripts (dev / build / preview) and dependencies. Everything is pinned with caret ranges; no UI component libraries are used anywhere.',
    concepts: 'npm scripts · dependencies vs devDependencies',
    code: packageJsonSource,
    lang: 'json',
  },
  {
    path: 'README.md',
    role: 'The project README: what the app does, how to run it, how the API works and how favourites persist.',
    concepts: 'documentation',
    code: readmeSource,
    lang: 'md',
  },
]

const CHECKLIST = [
  {
    req: '1 — Fetch 30 photos on page load via a useFetchPhotos custom hook returning { photos, loading, error }',
    how: 'useFetchPhotos() lives in src/hooks/useFetchPhotos.js. Gallery calls it and reads photos/loading/error — it contains zero fetch() calls of its own.',
    verify: 'Open the Network tab, refresh: one request to picsum.photos/v2/list?limit=30. Confirm exactly 30 objects in the response.',
  },
  {
    req: '1 — Loading spinner while fetching',
    how: 'The Spinner component renders a role="status" ring while loading === true and photos is empty, and the toolbar announces “Loading the collection…”.',
    verify: 'In DevTools → Network, set throttling to “Slow 3G” and reload — the spinner and status text are visible for a second or two.',
  },
  {
    req: '1 — Helpful error message on failure',
    how: 'ErrorState component shows a friendly explanation, a console/Network hint, and a “Try again” button that calls retry() (bumps a counter → useEffect re-runs).',
    verify: 'DevTools → Network → Offline, then refresh (or click Try again while offline): the rose error panel appears. Go back online, click Try again — the grid returns.',
  },
  {
    req: '2 — 4 columns desktop · 2 columns tablet · 1 column mobile',
    how: 'Grid classes in Gallery.jsx: “grid-cols-1 sm:grid-cols-2 lg:grid-cols-4”. Each card shows photo, author name, and a heart button.',
    verify: 'Resize the window (or DevTools device toolbar): <640px → 1 column, 640–1024px → 2 columns, ≥1024px → 4 columns.',
  },
  {
    req: '3 — Search filters by author, instantly, with no re-fetch',
    how: 'Search input onChange → useCallback handler sets searchTerm. useMemo rebuilds filteredPhotos only when photos/searchTerm change. Zero requests fire while typing.',
    verify: 'Type “Alejandro” slowly while watching the Network tab: not a single request fires; the counter reads N/30 and cards update per keystroke. Clear with the ✕ button.',
  },
  {
    req: '4 — Add/remove favourites, managed by useReducer (not useState)',
    how: 'favouritesReducer handles TOGGLE (add if missing, remove if present). App.jsx dispatches { type: TOGGLE, photo } from the heart buttons.',
    verify: 'Click hearts on a few cards: they fill rose, the header counter increments, a toast confirms. Click again to remove — counter decrements.',
  },
  {
    req: '4 — Favourites persist in localStorage across refreshes',
    how: 'App.jsx useEffect writes localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites)) on every change. initFavourites() (lazy useReducer initializer) reads it on startup.',
    verify: 'Save 3 favourites → hard refresh (Ctrl/Cmd+R) → hearts stay filled, counter reads 3. DevTools → Application → Local Storage → photo-gallery:favourites shows the JSON array.',
  },
  {
    req: '5 — Code organization: the required files exist separately',
    how: 'src/hooks/useFetchPhotos.js · src/components/PhotoCard.jsx · src/components/Gallery.jsx · src/App.jsx · src/index.css (+ Spinner, ErrorState, EmptyState, FavouritesPanel, ViewSwitcher, Header, Footer, Toast, favouritesReducer).',
    verify: 'Open the file tree in the Guide tab — every required path is present with its real contents one click away.',
  },
]

const RECORDING_STEPS = [
  {
    title: 'Opening (30 s)',
    detail: '“This is a React + Vite + Tailwind photo gallery. The data comes from the Picsum API — exactly 30 photos, fetched once on load by a custom hook I wrote myself.”',
  },
  {
    title: 'Show the Network tab (30 s)',
    detail: 'Refresh the page with DevTools → Network open, filter by “list”. Point at the single request to v2/list?limit=30 and the 30 items in the JSON response.',
  },
  {
    title: 'Walk through useFetchPhotos.js (1 min)',
    detail: 'Explain the three states — photos, loading, error — then the useEffect: AbortController for cleanup, the response.ok check (fetch never rejects on HTTP errors), setLoading(false) in finally. Say out loud: “the Gallery never calls fetch — it just reads this hook.”',
  },
  {
    title: 'Explain the responsive grid (30 s)',
    detail: 'In Gallery.jsx, point at “grid-cols-1 sm:grid-cols-2 lg:grid-cols-4” and resize the window live to prove one → two → four columns.',
  },
  {
    title: 'Demonstrate search (45 s)',
    detail: 'Type “Alejandro”. While typing, keep the Network tab visible — zero requests fire. Explain: useCallback keeps the handler stable, useMemo recomputes the filtered array only when the text changes. Try a nonsense string like “zzz” to show the empty state + Clear button.',
  },
  {
    title: 'Explain useReducer (1 min)',
    detail: 'Open favouritesReducer.js and App.jsx side by side. Explain: “useReducer is useState’s big brother — all update logic lives in one pure function. The action object { type: ‘TOGGLE’, photo } describes what happened; the reducer returns the next state.” Toggle a heart live.',
  },
  {
    title: 'Prove localStorage persistence (30 s)',
    detail: 'Save two favourites, open the header drawer to show the list, then hard-refresh. Hearts are still filled. Open DevTools → Application → Local Storage and read the saved JSON array aloud.',
  },
  {
    title: 'Error handling (30 s)',
    detail: 'DevTools → Network → Offline, refresh, show the error panel and the “Try again” button. Back online — click Try again, grid returns.',
  },
  {
    title: 'Close (15 s)',
    detail: '“Everything you saw is plain React — no UI kits. Functional components, hooks, and about a dozen small files. Questions?”',
  },
]

function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [text])

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy to clipboard"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-amber-100 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${className}`}
    >
      {copied ? <ClipboardCheck size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function SectionTitle({ icon: Icon, kicker, title }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
        <Icon size={18} strokeWidth={2} />
      </span>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-700">{kicker}</p>
        <h2 className="font-display text-lg font-bold leading-tight text-slate-900">{title}</h2>
      </div>
    </div>
  )
}

function GuidePage() {
  const [activeFile, setActiveFile] = useState(FILES[0].path)
  const [fileFilter, setFileFilter] = useState('')

  const selected = useMemo(() => FILES.find((f) => f.path === activeFile) ?? FILES[0], [activeFile])

  const visibleFiles = useMemo(() => {
    const q = fileFilter.trim().toLowerCase()
    if (!q) return FILES
    return FILES.filter((f) => f.path.toLowerCase().includes(q))
  }, [fileFilter])

  const requirementsMet = CHECKLIST.length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ===== Page heading ===== */}
      <div className="mb-8 flex flex-col gap-4 border-b border-amber-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">Submission Companion</p>
          <h1 className="font-display mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Guide &amp; Source Code</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Everything an internship reviewer needs in one place: prerequisites, exact terminal commands, the
            complete source of every file, a requirement-by-requirement checklist, a testing playbook and a
            screen-recording script.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
          <CheckCircle2 size={18} className="text-emerald-600" strokeWidth={2.2} />
          <p className="text-xs font-bold text-emerald-800">
            {requirementsMet}/{requirementsMet} requirements implemented
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-8">
          {/* --- Prerequisites --- */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle icon={Info} kicker="Step 0" title="Prerequisites" />
            <ul className="divide-y divide-slate-100">
              {PREREQUISITES.map((p) => (
                <li key={p.name} className="flex items-start justify-between gap-3 py-2.5">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{p.name}</p>
                    <p className="text-[11px] leading-snug text-slate-500">{p.version}</p>
                  </div>
                  <code className="shrink-0 rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] font-semibold text-slate-600">{p.check}</code>
                </li>
              ))}
            </ul>
          </section>

          {/* --- Terminal commands --- */}
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="h-3 w-3 rounded-full bg-rose-500" />
                  <i className="h-3 w-3 rounded-full bg-amber-400" />
                  <i className="h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <p className="ml-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-slate-300">
                  <Terminal size={12} /> terminal — run in order
                </p>
              </div>
            </div>
            <ol className="divide-y divide-white/5">
              {SETUP_COMMANDS.map((cmd, index) => (
                <li key={cmd.id} className="group px-4 py-2.5">
                  <p className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="text-amber-500">{String(index + 1).padStart(2, '0')}</span> {cmd.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[11px] text-emerald-300">
                      <span className="select-none text-slate-600">$ </span>
                      {cmd.code}
                    </code>
                    <CopyButton text={cmd.code} />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* --- Folder tree --- */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle icon={FolderTree} kicker="Structure" title="Folder layout" />
            <pre className="overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-700">
{`photo-gallery/
├── index.html                  ← single-page shell (#root)
├── package.json                ← scripts + dependencies
├── vite.config.ts              ← React + Tailwind v4 plugins
├── README.md                   ← this project, documented
├── public/
│   └── favicon.svg             ← camera-aperture icon
└── src/
    ├── main.jsx                ← entry: render <App /> in StrictMode
    ├── App.jsx                 ← composition root + useReducer + persistence
    ├── index.css               ← @import "tailwindcss" + @theme tokens
    ├── hooks/
    │   └── useFetchPhotos.js   ← { photos, loading, error, retry }
    ├── reducers/
    │   └── favouritesReducer.js← pure TOGGLE reducer + localStorage init
    ├── pages/
    │   └── GuidePage.jsx       ← this page (lazy-loaded)
    └── components/
        ├── Gallery.jsx         ← grid + search + states
        ├── PhotoCard.jsx       ← one card (photo, author, heart)
        ├── Header.jsx          ← sticky bar + favourites counter
        ├── FavouritesPanel.jsx ← slide-in drawer
        ├── Spinner.jsx         ← loading state
        ├── ErrorState.jsx      ← error state + retry
        ├── EmptyState.jsx      ← no search results
        ├── Toast.jsx           ← “Added to favourites” feedback
        ├── ViewSwitcher.jsx    ← Gallery / Guide tabs
        └── Footer.jsx          ← attribution + stack`}
            </pre>
          </section>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-8">
          {/* --- Source code explorer --- */}
          <section>
            <SectionTitle icon={Code2} kicker="Requirement 5" title="Complete source code" />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* File list */}
              <div className="border-b border-slate-100 bg-slate-50/60 p-3">
                <label className="relative flex items-center">
                  <Search size={14} className="absolute left-3 text-slate-400" />
                  <input
                    type="text"
                    value={fileFilter}
                    onChange={(e) => setFileFilter(e.target.value)}
                    placeholder="Filter files…"
                    className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs font-medium outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
                <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto pr-1">
                  {visibleFiles.map((file) => (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => setActiveFile(file.path)}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-mono text-[11px] transition ${
                          file.path === activeFile
                            ? 'bg-slate-900 font-semibold text-amber-300'
                            : 'text-slate-600 hover:bg-slate-200/60'
                        }`}
                      >
                        <FileCode2 size={13} className="shrink-0 opacity-70" />
                        <span className="truncate">{file.path}</span>
                        <ChevronRight size={12} className="ml-auto shrink-0 opacity-60" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected file details */}
              <div className="p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-mono text-sm font-bold text-slate-900">{selected.path}</h3>
                  <CopyButton text={selected.code} className="!bg-slate-900 !text-amber-300 !border-slate-900 hover:!bg-slate-800" />
                </div>
                <p className="text-[12px] leading-relaxed text-slate-600">{selected.role}</p>
                <p className="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-[10px] font-semibold leading-relaxed text-amber-900">
                  <span className="font-black uppercase tracking-wider">You should understand: </span>
                  {selected.concepts}
                </p>
                <div className="mt-3 max-h-[480px] overflow-auto rounded-xl border border-slate-800 bg-slate-950">
                  <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{selected.lang} · {selected.code.split('\n').length} lines</span>
                  </div>
                  <pre className="p-4 font-mono text-[10.5px] leading-[1.7] text-slate-200">
                    <code>{selected.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* --- Requirements checklist --- */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle icon={ListChecks} kicker="Rubric" title="Requirement-by-requirement checklist" />
            <ol className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" strokeWidth={2.2} />
                  <div>
                    <p className="text-[12px] font-bold leading-snug text-slate-800">{item.req}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600"><span className="font-semibold text-slate-700">How it is done → </span>{item.how}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500"><span className="font-semibold text-slate-600">How to verify → </span>{item.verify}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* --- Testing playbook --- */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm">
            <SectionTitle icon={Check} kicker="QA" title="Testing playbook" />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: 'Exactly 30 photos', d: 'Network tab → response of v2/list?limit=30 contains 30 items; counter shows 30/30.' },
                { t: 'Loading state', d: 'Network → “Slow 3G” + hard refresh → spinner with role=status and “Fetching 30 photos…” text appears.' },
                { t: 'Error state', d: 'Network → Offline + refresh → rose panel with a helpful message; “Try again” retries. Restore connection and confirm recovery.' },
                { t: 'Responsive columns', d: 'Device toolbar: 375px → 1 col · 768px → 2 cols · ≥1024px → 4 cols. Cards keep a 3:2 ratio.' },
                { t: 'Instant filter', d: 'Type “ale” → list narrows per keystroke; Network tab shows zero new requests; counter updates live (e.g. 6/30).' },
                { t: 'Empty state', d: 'Type “xyzzy” → friendly “No authors match” panel + Clear button. Clicking clear restores all 30.' },
                { t: 'Add / remove favourite', d: 'Click hearts: fill state, header badge counter and toast all update. Clicking again removes. Open the drawer to see the list.' },
                { t: 'Persistence', d: 'Save favourites → hard refresh → hearts remain filled; badge count unchanged. Application → Local Storage shows the JSON array under photo-gallery:favourites.' },
                { t: 'Reducer purity', d: 'Favourites survive StrictMode’s double-effect in dev. Reducer never mutates: it uses filter() and spread syntax to return new arrays.' },
                { t: 'Keyboard access', d: 'Tab through: search input → hint chips → cards’ hearts. Hearts show a focus ring and aria-pressed=true/false.' },
              ].map((test) => (
                <div key={test.t} className="rounded-xl border border-amber-200/70 bg-white p-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                    <CheckCircle2 size={13} className="text-amber-600" strokeWidth={2.4} /> {test.t}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-slate-600">{test.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-100/50 p-3">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-700" />
              <p className="text-[10.5px] leading-relaxed text-amber-900">
                <span className="font-bold">Common pitfall:</span> in dev, StrictMode mounts effects twice, so you may
                see two requests in the Network tab. That is intentional and harmless — the AbortController cancels the
                first, and production builds fetch exactly once.
              </p>
            </div>
          </section>

          {/* --- Recording script --- */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle icon={Mic} kicker="Screen capture" title="Screen-recording script (≈5 minutes)" />
            <ol className="space-y-0">
              {RECORDING_STEPS.map((step, i) => (
                <li key={i} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < RECORDING_STEPS.length - 1 && (
                    <span aria-hidden="true" className="absolute left-[11px] top-6 h-full w-px bg-amber-200" />
                  )}
                  <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-amber-400 font-mono text-[9px] font-black text-slate-900 ring-2 ring-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">{step.title}</p>
                    <p className="mt-0.5 text-[10.5px] leading-relaxed text-slate-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

export default GuidePage
