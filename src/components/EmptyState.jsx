// src/components/EmptyState.jsx
// Shown when the search filter removes every photo from view.
// `query` is the text the user typed, `onClear` wipes the search box.
import { SearchX, X } from 'lucide-react'

function EmptyState({ query, onClear }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
        <SearchX size={26} className="text-amber-600" strokeWidth={1.8} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">No authors match “{query}”</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
          None of the 30 photographers contain that spelling. Try a shorter or different name —
          for example “Alejandro”, “Paul” or “Ben”.
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <X size={16} strokeWidth={2.2} />
        Clear search
      </button>
    </div>
  )
}

export default EmptyState
