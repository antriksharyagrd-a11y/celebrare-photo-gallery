// src/components/ErrorState.jsx
// Friendly error panel shown when the API request fails.
// `message` explains what went wrong, `onRetry` re-runs the fetch.
import { CloudOff, RefreshCw } from 'lucide-react'

function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
        <CloudOff size={26} className="text-rose-500" strokeWidth={1.8} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">Couldn&apos;t load the photos</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{message}</p>
      </div>
      <p className="text-xs text-slate-400">
        Tip: open the browser console or the Network tab to see the failed request.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
      >
        <RefreshCw size={16} strokeWidth={2.2} />
        Try again
      </button>
    </div>
  )
}

export default ErrorState
