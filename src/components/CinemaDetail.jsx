import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Clock3 } from 'lucide-react'
import { getMoviesForCinema } from '../data/cinemas'

export default function CinemaDetail({ cinema, onBack }) {
  const movies = getMoviesForCinema(cinema.id)
  return (
    <AnimatePresence mode="wait">
      {cinema && (
        <motion.div
          key={cinema.id}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            layout
            className="w-full max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
                <ArrowLeft className="h-5 w-5"/> Back
              </button>
              <div className="text-slate-300 text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4"/> {cinema.address}, {cinema.suburb}
              </div>
            </div>

            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">Now premiering at {cinema.name}</h3>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                  className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="relative h-40">
                    <img src={m.poster} alt="" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-white line-clamp-2">{m.title}</p>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-300">
                      <span>{m.genre}</span>
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3"/>{m.runtime}m</span>
                    </div>
                    <span className="mt-2 inline-block text-[10px] tracking-wide bg-white/10 text-white px-2 py-1 rounded">{m.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
