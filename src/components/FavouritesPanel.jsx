// src/components/FavouritesPanel.jsx
// ---------------------------------------------------------------
// Slide-in drawer listing everything in favourites.
// Props:
//   favourites        — array of photo objects from useReducer
//   onToggleFavourite — removes a single photo
//   onClearAll        — wipes the whole list
//   onClose           — closes the drawer
// ---------------------------------------------------------------
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Heart, Trash2, X } from 'lucide-react'

function FavouritesPanel({ favourites, onToggleFavourite, onClearAll, onClose }) {
  return (
    <>
      {/* Dimmed backdrop — clicking it closes the drawer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px]"
      />

      {/* The drawer itself */}
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Your favourite photos"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#fffdf8] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50/60 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 shadow-md shadow-rose-200">
              <Heart size={19} className="fill-white stroke-white" strokeWidth={2} />
            </span>
            <div>
              <h2 className="text-base font-bold leading-tight text-slate-900">Your Favourites</h2>
              <p className="text-[11px] font-medium text-slate-500">
                {favourites.length} {favourites.length === 1 ? 'photo' : 'photos'} saved in this browser
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close favourites"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-amber-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {favourites.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <Heart size={44} strokeWidth={1.4} className="text-amber-300" />
            <p className="text-base font-bold text-slate-800">Nothing saved yet</p>
            <p className="max-w-[26ch] text-sm leading-relaxed text-slate-500">
              Tap the heart on any photo in the gallery and it will live here — even after you
              refresh the page.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-2.5 overflow-y-auto p-4">
              {favourites.map((photo, index) => (
                <li
                  key={photo.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-2 shadow-sm"
                >
                  <span className="w-5 text-center font-mono text-[10px] font-bold text-slate-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={`https://picsum.photos/id/${photo.id}/160/106`}
                    alt={`Photo by ${photo.author}`}
                    loading="lazy"
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800" title={photo.author}>
                      {photo.author}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">photo #{photo.id} · {photo.width}×{photo.height}</p>
                    <a
                      href={photo.download_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 hover:underline"
                    >
                      Full size <ExternalLink size={9} strokeWidth={2.5} />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleFavourite(photo)}
                    aria-label={`Remove photo ${photo.id} by ${photo.author} from favourites`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-rose-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                  >
                    <Heart size={17} className="fill-rose-500 stroke-rose-500" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer: clear-all */}
            <div className="border-t border-amber-100 bg-amber-50/40 p-4">
              <button
                type="button"
                onClick={onClearAll}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                <Trash2 size={16} />
                Clear all favourites
              </button>
              <p className="mt-2 text-center text-[10px] text-slate-400">
                Stored locally under the <code className="rounded bg-slate-100 px-1 font-mono">photo-gallery:favourites</code> key
              </p>
            </div>
          </>
        )}
      </motion.aside>
    </>
  )
}

export default FavouritesPanel
