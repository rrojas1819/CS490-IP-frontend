import { useState } from 'react'
import Header from './components/Header'
import './styles/App.css'
import MovieCard from './components/MovieCard'
function App() {
  

  return (
    <>
      <Header />
      <div className='movieCardRatedOne'>
        <MovieCard movie={"Numebr one rated Movie!"} />
      </div>
      <div className='movieCardContainer'>
        
      </div>
    </>
  )
}

export default App
