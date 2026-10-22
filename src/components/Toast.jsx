// src/components/Toast.jsx
// A small confirmation pill that appears at the bottom of the screen
// after adding/removing a favourite. framer-motion handles the
// slide-in animation; everything else is plain Tailwind.
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

function Toast({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      role="status"
      className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2.5 rounded-full bg-slate-900 py-2.5 pl-3.5 pr-5 text-sm font-medium text-amber-50 shadow-2xl ring-1 ring-white/10">
        <CheckCircle2 size={17} className="text-emerald-400" strokeWidth={2.2} />
        {message}
      </div>
    </motion.div>
  )
}

export default Toast
