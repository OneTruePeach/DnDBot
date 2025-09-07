import React from 'react'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router'
import SongPage from './pages/SongPage'

const App = () => {
  return (
    <div data-theme="pastel">
      <Routes>
        <Route path="/" element={<SongPage />} />

      </Routes>
    </div>
  )
}

export default App