import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Building2, ChevronRight } from 'lucide-react'

const CHAINS = [
  {
    id: 'event',
    name: 'Event Cinemas',
    gradient: 'from-fuchsia-500 via-pink-500 to-orange-500',
    glow: 'shadow-[0_0_40px_rgba(236,72,153,0.35)]',
  },
  {
    id: 'hoyts',
    name: 'HOYTS',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.35)]',
  },
  {
    id: 'village',
    name: 'Village Cinemas',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'shadow-[0_0_40px_rgba(251,191,36,0.35)]',
  },
  {
    id: 'palace',
    name: 'Palace Cinemas',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
  },
  {
    id: 'dendy',
    name: 'Dendy Cinemas',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.35)]',
  },
  {
    id: 'reading',
    name: 'Reading Cinemas',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    glow: 'shadow-[0_0_40px_rgba(244,63,94,0.35)]',
  },
]

// Generate 50 demo cinemas distributed across chains
const SUBURBS = [
  'Sydney CBD','Parramatta','Chatswood','Bondi','Newtown','Broadway','Castle Hill','Hurstville','Macquarie','Wetherill Park',
  'Melbourne CBD','South Yarra','Docklands','Carlton','Fitzroy','Brunswick','Richmond','St Kilda','Southbank','Footscray',
  'Brisbane CBD','South Bank','Chermside','Indooroopilly','Carindale','Garden City','Springfield','Toowong','Logan','North Lakes',
  'Perth CBD','Joondalup','Cannington','Morley','Fremantle','Rockingham','Mandurah','Karrinyup','Innaloo','Belmont',
  'Adelaide CBD','Glenelg','Norwood','Marion','Tee Tree Plaza','Prospect','Port Adelaide','Mawson Lakes','Salisbury','Elizabeth',
]

function buildCinemas() {
  const cinemas = []
  let idx = 0
  for (let i = 0; i < 50; i++) {
    const chain = CHAINS[i % CHAINS.length]
    const suburb = SUBURBS[i % SUBURBS.length]
    cinemas.push({
      id: `${chain.id}-${i}`,
      chain: chain.id,
      name: `${chain.name} ${suburb}`,
      suburb,
      address: `${Math.floor(10 + Math.random()*80)} ${suburb} Rd`,
    })
    idx++
  }
  return cinemas
}

const ALL_CINEMAS = buildCinemas()

export default function CinemaPage() {
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
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left backdrop-blur-sm transition-all ${active ? 'ring-2 ring-white/60' : 'hover:bg-white/[0.04] hover:border-white/20'} ${active ? chain.glow : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-tr ${chain.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
                <div className="relative flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${chain.gradient} flex items-center justify-center text-white font-black text-lg shadow-lg`}>{chain.name.split(' ')[0][0]}</div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{chain.name}</h3>
                    <p className="text-slate-300/80 text-sm flex items-center gap-1"><MapPin className="h-4 w-4"/> {ALL_CINEMAS.filter(c=>c.chain===chain.id).length} cinemas</p>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : -6 }}
                  className="mt-4 flex items-center justify-between text-slate-200"
                >
                  <span className="text-sm/none">View locations</span>
                  <ChevronRight className="h-5 w-5"/>
                </motion.div>

                {/* Affect other cards when one is active */}
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
        <AnimatePresence>
          {activeChain && (
            <motion.div
              key={activeChain}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-6"
            >
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
                  <span className="hidden md:inline text-slate-600">|</span>
                  <button onClick={()=>setActiveChain(null)} className="text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">Close</button>
                </div>
              </div>

              <motion.div layout className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((c) => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                      className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 hover:bg-slate-900/70 transition overflow-hidden"
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
                    </motion.div>
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
