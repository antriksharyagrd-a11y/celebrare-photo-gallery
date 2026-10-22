// src/components/ViewSwitcher.jsx
// Segmented control that switches between the gallery and the
// source-code & setup guide. Pure useState in the parent — no router needed.
import { Images, Code2 } from 'lucide-react'

const OPTIONS = [
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'guide', label: 'Guide & Code', icon: Code2 },
]

function ViewSwitcher({ view, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Switch view"
      className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
    >
      {OPTIONS.map(({ id, label, icon: Icon }) => {
        const active = view === id
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:text-sm ${
              active
                ? 'bg-slate-900 text-amber-300 shadow'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Icon size={16} strokeWidth={2.2} />
            <span className="hidden xs:inline sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ViewSwitcher
