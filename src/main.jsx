import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import CinemaShowtimes from './pages/CinemaShowtimes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cinema/:id" element={<CinemaShowtimes />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
