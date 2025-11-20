import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Building2, ChevronRight } from 'lucide-react'
import { CHAINS, ALL_CINEMAS } from '../data/cinemas'

export default function CinemaPage({ onOpenCinema }) {
  const [activeChain, setActiveChain] = useState(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return ALL_CINEMAS.filter(c => (!activeChain || c.chain === activeChain) && (
      c.name.toLowerCase().includes(q) || c.suburb.toLowerCase().includes(q)
    ))
  }, [activeChain, query])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveChain(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-500 blur-[140px]" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-blue-500 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Find a Cinema</h1>
            <p className="mt-2 text-slate-300">Tap a chain to reveal nearby locations. Smooth, cinematic transitions built-in.</p>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-400">
            <Building2 className="h-5 w-5"/>
            <span>{ALL_CINEMAS.length} cinemas</span>
          </div>
        </header>

        {/* Chain Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAINS.map((chain, i) => {
            const active = activeChain === chain.id
            return (
              <motion.button
                key={chain.id}
                layout
                onClick={() => setActiveChain(active ? null : chain.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 120, damping: 18 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-0 text-left backdrop-blur-sm transition-all ${active ? 'ring-2 ring-white/60' : 'hover:bg-white/[0.04] hover:border-white/20'} ${active ? chain.glow : ''}`}
              >
                {/* Background image with blend overlay */}
                <div className="relative h-40 md:h-48">
                  <img src={chain.image} alt="" className="absolute inset-0 h-full w-full object-cover"/>
                  <div className={`absolute inset-0 mix-blend-overlay bg-gradient-to-tr ${chain.gradient} opacity-70`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="relative z-10 flex h-full items-end p-5">
                    <div>
                      <h3 className="text-white font-semibold text-xl drop-shadow">{chain.name}</h3>
                      <p className="text-slate-200/90 text-sm flex items-center gap-1"><MapPin className="h-4 w-4"/> {ALL_CINEMAS.filter(c=>c.chain===chain.id).length} cinemas</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : -6 }}
                  className="px-5 pb-4 flex items-center justify-between text-slate-200"
                >
                  <span className="text-sm/none">View locations</span>
                  <ChevronRight className="h-5 w-5"/>
                </motion.div>

                {/* Dim other cards when one is active */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: activeChain && !active ? 0.96 : 1,
                    opacity: activeChain && !active ? 0.55 : 1,
                    filter: activeChain && !active ? 'grayscale(30%) blur(0.5px)' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute inset-0 pointer-events-none"
                />
              </motion.button>
            )
          })}
        </motion.div>

        {/* Reveal panel */}
        <AnimatePresence mode="wait">
          {activeChain && (
            <motion.div
              key={activeChain}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 md:p-6"
            >
              {/* Chain switcher: scrollable pill carousel */}
              <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
                {CHAINS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveChain(c.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm border transition ${activeChain===c.id ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'}`}
                  >
                    {c.name}
                  </button>
                ))}
                <button
                  onClick={() => setActiveChain(null)}
                  className="ml-auto shrink-0 rounded-full px-4 py-2 text-sm border bg-transparent text-slate-300 border-white/10 hover:bg-white/10"
                >
                  Clear
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
                  <input
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Search by suburb or cinema name"
                    className="w-full rounded-xl bg-slate-900/60 border border-white/10 pl-10 pr-12 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  {query && (
                    <button onClick={()=>setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                      <X className="h-5 w-5"/>
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between md:justify-end gap-3 text-slate-300">
                  <span className="text-sm whitespace-nowrap">{filtered.length} shown</span>
                </div>
              </div>

              <motion.div layout className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((c) => (
                    <motion.button
                      key={c.id}
                      onClick={() => onOpenCinema?.(c)}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                      className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 hover:bg-slate-900/70 transition overflow-hidden text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
                          <MapPin className="h-5 w-5"/>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{c.name}</p>
                          <p className="text-sm text-slate-400 truncate">{c.address}, {c.suburb}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
