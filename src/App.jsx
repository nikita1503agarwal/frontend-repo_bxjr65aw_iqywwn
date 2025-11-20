import { useState } from 'react'
import CinemaPage from './components/CinemaPage'

function App() {
  const [page] = useState('cinemas')

  return (
    <div className="min-h-screen">
      {page === 'cinemas' && <CinemaPage />}
    </div>
  )
}

export default App
