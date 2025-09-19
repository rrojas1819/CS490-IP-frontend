import { useState } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'
import ActorsSection from './components/ActorsSection'
import { testData } from './test.js'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  
  const { topRentedMovie, categories, allMovies, top5RentedMovies, top5Actors } = testData

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Header activeTab={activeTab} onTabClick={handleTabClick} />
      
      {activeTab === 'Home' && (
        <>
          <div className='top5Container'>
            <h1 className='topRentedTitle'>Top 5 Rented Movies</h1>
            <div className='movieCardContainerTop5'>
              {top5RentedMovies.map((movie, index) => (
                <div key={movie.title} className='top5MovieItem'>
                  <MovieCard movie={movie} />
                  <div className='rankNumber'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          
          {categories.map((category, index) => (
            <div className='selectionContainer' key={index}>
              <h1 className='movieCardCategory'>{category.name}</h1>
              <div className='movieCardContainer'>
                {category.movies.map((movie, movieIndex) => (
                  <MovieCard movie={movie} key={movieIndex} />
                ))}
              </div>
              
              {index === 2 && (
                <ActorsSection actors={top5Actors} title="Top 5 Actors" />
              )}
            </div>
          ))}
        </>
      )}
      
      {activeTab === 'Movies' && <MovieSearch />}
      {activeTab === 'Customer Info' && <div>Customer Info content coming soon...</div>}
    </>
  )
}

export default App
