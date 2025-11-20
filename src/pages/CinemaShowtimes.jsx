import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Building2, Clock3 } from 'lucide-react'
import { ALL_CINEMAS, CHAINS, getMoviesForCinema } from '../data/cinemas'

export default function CinemaShowtimes() {
  const { id } = useParams()
  const navigate = useNavigate()

  const cinema = useMemo(() => ALL_CINEMAS.find(c => c.id === id), [id])
  const chain = useMemo(() => CHAINS.find(ch => ch.id === cinema?.chain), [cinema])
  const movies = useMemo(() => cinema ? getMoviesForCinema(cinema.id) : [], [cinema])

  if (!cinema) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Cinema not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <div className="relative">
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img src={chain?.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className={`absolute inset-0 mix-blend-overlay bg-gradient-to-tr ${chain?.gradient} opacity-70`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-6 -mt-16 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center justify-between">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
                <ArrowLeft className="h-5 w-5"/> Back
              </button>
              <div className="hidden md:flex items-center gap-2 text-slate-300">
                <Building2 className="h-5 w-5"/>
                {chain?.name}
              </div>
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-white">{cinema.name}</h1>
            <p className="mt-1 text-slate-300 text-sm inline-flex items-center gap-2"><MapPin className="h-4 w-4"/> {cinema.address}, {cinema.suburb}</p>
          </div>
        </div>
      </div>

      {/* Movies grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-white font-semibold text-lg">Premiering</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="relative h-44">
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
      </div>
    </div>
  )
}
