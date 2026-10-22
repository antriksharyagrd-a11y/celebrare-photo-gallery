// src/components/Header.jsx
// Sticky app bar: logo, view switcher, favourites counter with a
// gentle pulse animation whenever the count changes, GitHub link.
import { Camera, Github, Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ViewSwitcher from './ViewSwitcher'

function Header({ view, onViewChange, favouriteCount, onOpenFavourites }) {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-100/80 bg-[#fffdf8]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* ---- Brand ---- */}
        <a href="#" onClick={(e) => e.preventDefault()} className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-200">
            <Camera size={19} className="text-white" strokeWidth={2.2} />
          </span>
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-display text-[17px] font-bold tracking-tight text-slate-900">
              Pic<span className="text-amber-600">Sum</span> Gallery
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              React Internship Project
            </span>
          </span>
        </a>

        {/* ---- View switcher ---- */}
        <ViewSwitcher view={view} onChange={onViewChange} />

        {/* ---- Right cluster ---- */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="View the source on GitHub"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:flex"
          >
            <Github size={19} strokeWidth={2} />
          </a>

          <button
            type="button"
            onClick={onOpenFavourites}
            aria-label={`Open favourites, ${favouriteCount} saved`}
            className="group relative flex h-10 items-center gap-2 rounded-xl bg-slate-900 pl-3 pr-3.5 text-amber-300 shadow-md transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Heart size={18} strokeWidth={2.2} className="fill-rose-500 stroke-rose-500 transition group-hover:scale-110" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={favouriteCount}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="font-mono text-sm font-bold tabular-nums"
              >
                {favouriteCount}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
