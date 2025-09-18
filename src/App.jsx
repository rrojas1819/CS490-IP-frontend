import { useState } from 'react'
import Header from './components/Header'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'
function App() {
  const categories = ['Long', 'Short', 'Rated One'] //Examples
  const movies = [
    { title: 'Movie 1', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 2', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 3', imageUrl: 'https://via.placeholder.com/150' },
  ]
  return (
    <>
      <Header />
      <div className='movieCardRatedOneContainer'>
        <div className='movieCardContainerRatedOne'>
          <MovieCard movie={"Number one rated Movie!"} />
        </div>
      </div>
      
        {categories.map((category, index) => (
          <div className='selectionContainer' key={index}>
            <h1 className='movieCardCategory'>{category}</h1>
            <div className='movieCardContainer'>

              {movies.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))}
            </div>
            
          </div>
        ))}

    </>
  )
}

export default App
