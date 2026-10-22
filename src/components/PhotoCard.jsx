// src/components/PhotoCard.jsx
// ---------------------------------------------------------------
// One photo card. Props:
//   photo            — one object from the Picsum API
//   isFavourite      — boolean, is this photo in the favourites list?
//   onToggleFavourite — function called with the photo when the heart is clicked
// ---------------------------------------------------------------
import { useState } from 'react'
import { Camera, ExternalLink, Heart } from 'lucide-react'

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Local UI state: track image loading so we can show a gentle skeleton,
  // and failures so one broken image never breaks the whole grid.
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  // Picsum serves any size on demand, so we request a fixed 600x400 thumbnail
  // (fast, perfectly cropped to our 3:2 card) and link the full original separately.
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/600/400`

  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50">
      {/* ---------- Image area ---------- */}
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
        {/* Pulse skeleton while the thumbnail downloads */}
        {!imageLoaded && !imageFailed && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100" />
        )}

        {imageFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Camera size={28} strokeWidth={1.5} />
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Photo id chip — top left */}
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-amber-100 backdrop-blur-sm">
          #{String(photo.id).padStart(3, '0')}
        </span>

        {/* Dimensions chip — bottom left */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm">
          {photo.width}×{photo.height}
        </span>

        {/* Open original — appears on hover, top right */}
        <a
          href={photo.download_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open the full-size version of photo ${photo.id}`}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-slate-900 focus:opacity-100 focus:outline-none group-hover:opacity-100"
        >
          Full size
          <ExternalLink size={11} strokeWidth={2.4} />
        </a>

        {/* ---------- Heart / favourite button — bottom right ---------- */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photo ${photo.id} by ${photo.author} from favourites`
              : `Add photo ${photo.id} by ${photo.author} to favourites`
          }
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-90"
        >
          <Heart
            size={20}
            strokeWidth={2}
            className={
              isFavourite
                ? 'fill-rose-500 stroke-rose-500 drop-shadow-sm transition-transform duration-200 scale-110'
                : 'stroke-slate-600 transition-transform duration-200'
            }
          />
        </button>
      </div>

      {/* ---------- Card footer: author info ---------- */}
      <figcaption className="flex flex-1 items-center gap-3 p-3.5">
        {/* Author avatar: their first initial in an amber disc */}
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 ring-1 ring-amber-200"
        >
          {photo.author.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-slate-800" title={photo.author}>
            {photo.author}
          </p>
          <a
            href={photo.url}
            target="_blank"
            rel="noreferrer"
            className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 transition-colors hover:text-amber-700"
          >
            View on Unsplash
            <ExternalLink size={10} strokeWidth={2.4} />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}

export default PhotoCard
