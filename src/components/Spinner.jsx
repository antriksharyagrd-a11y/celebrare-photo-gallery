// src/components/Spinner.jsx
// A loading spinner built with a single div and pure Tailwind classes.
// animate-spin + a transparent-top border produces the rotating ring.

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div
        role="status"
        aria-label="Loading photos"
        className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500"
      />
      <p className="text-sm font-medium text-slate-500">Fetching 30 photos from Picsum…</p>
    </div>
  )
}

export default Spinner
