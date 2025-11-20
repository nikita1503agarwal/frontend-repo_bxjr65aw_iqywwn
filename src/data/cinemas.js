// Centralized cinema and chain data so multiple pages can share

export const CHAINS = [
  {
    id: 'event',
    name: 'Event Cinemas',
    gradient: 'from-fuchsia-500 via-pink-500 to-orange-500',
    glow: 'shadow-[0_0_40px_rgba(236,72,153,0.35)]',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'hoyts',
    name: 'HOYTS',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    glow: 'shadow-[0_0_40px_rgba(59,130,246,0.35)]',
    image: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'village',
    name: 'Village Cinemas',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'shadow-[0_0_40px_rgba(251,191,36,0.35)]',
    image: 'https://images.unsplash.com/photo-1657139218511-9eac76ce0955?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxWaWxsYWdlJTIwQ2luZW1hc3xlbnwwfDB8fHwxNzYzNjYxNDgyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'palace',
    name: 'Palace Cinemas',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
    image: 'https://images.unsplash.com/photo-1596045923493-9699bc1acc61?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYWxhY2UlMjBDaW5lbWFzfGVufDB8MHx8fDE3NjM2NjE0ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dendy',
    name: 'Dendy Cinemas',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.35)]',
    image: 'https://images.unsplash.com/photo-1485841890310-6a055c88698a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'reading',
    name: 'Reading Cinemas',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    glow: 'shadow-[0_0_40px_rgba(244,63,94,0.35)]',
    image: 'https://images.unsplash.com/photo-1739433438426-9262aeef2bf7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWFkaW5nJTIwQ2luZW1hc3xlbnwwfDB8fHwxNzYzNjYxNDgzfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
]

const SUBURBS = [
  'Sydney CBD','Parramatta','Chatswood','Bondi','Newtown','Broadway','Castle Hill','Hurstville','Macquarie','Wetherill Park',
  'Melbourne CBD','South Yarra','Docklands','Carlton','Fitzroy','Brunswick','Richmond','St Kilda','Southbank','Footscray',
  'Brisbane CBD','South Bank','Chermside','Indooroopilly','Carindale','Garden City','Springfield','Toowong','Logan','North Lakes',
  'Perth CBD','Joondalup','Cannington','Morley','Fremantle','Rockingham','Mandurah','Karrinyup','Innaloo','Belmont',
  'Adelaide CBD','Glenelg','Norwood','Marion','Tee Tree Plaza','Prospect','Port Adelaide','Mawson Lakes','Salisbury','Elizabeth',
]

function buildCinemas() {
  const cinemas = []
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
  }
  return cinemas
}

export const ALL_CINEMAS = buildCinemas()

// Simple helper to generate a consistent list of movies for a cinema
export function getMoviesForCinema(cinemaId) {
  const seeds = [
    {
      title: 'Neon Horizon',
      poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=900&auto=format&fit=crop',
      genre: 'Sci‑Fi',
      rating: 'M',
      runtime: 124,
    },
    {
      title: 'Midnight Parade',
      poster: 'https://images.unsplash.com/photo-1524985069026-bbf2a0ab54f3?q=80&w=900&auto=format&fit=crop',
      genre: 'Drama',
      rating: 'MA15+',
      runtime: 108,
    },
    {
      title: 'Azure Tide',
      poster: 'https://images.unsplash.com/photo-1517602302552-471fe67cdf3b?q=80&w=900&auto=format&fit=crop',
      genre: 'Adventure',
      rating: 'PG',
      runtime: 132,
    },
    {
      title: 'Echoes of Glass',
      poster: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=900&auto=format&fit=crop',
      genre: 'Thriller',
      rating: 'M',
      runtime: 117,
    },
    {
      title: 'Golden Alley',
      poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=900&auto=format&fit=crop',
      genre: 'Comedy',
      rating: 'PG',
      runtime: 102,
    },
    {
      title: 'Orbit 12',
      poster: 'https://images.unsplash.com/photo-1517602302552-471fe67cdf3b?q=80&w=900&auto=format&fit=crop',
      genre: 'Action',
      rating: 'MA15+',
      runtime: 129,
    },
  ]
  // Deterministic shuffle by id
  const hash = Array.from(cinemaId).reduce((a,c)=>a+c.charCodeAt(0),0)
  const list = [...seeds]
  for (let i = list.length - 1; i > 0; i--) {
    const j = (hash + i) % list.length
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  // Multiply to simulate more premieres
  return list.concat(list.slice(0, 3)).map((m, idx) => ({ ...m, id: `${cinemaId}-m${idx}` }))
}
