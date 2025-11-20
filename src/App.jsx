import { useState } from 'react'
import CinemaPage from './components/CinemaPage'
import CinemaDetail from './components/CinemaDetail'

function App() {
  const [selectedCinema, setSelectedCinema] = useState(null)

  return (
    <div className="min-h-screen">
      <CinemaPage onOpenCinema={(c)=>setSelectedCinema(c)} />
      <CinemaDetail cinema={selectedCinema} onBack={()=>setSelectedCinema(null)} />
    </div>
  )
}

export default App
