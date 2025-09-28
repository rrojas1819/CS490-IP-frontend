import { useState, useEffect } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'
import ActorsSection from './components/ActorsSection'
import { testData } from './test.js'
import { filmAPI } from './utils/api'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  
  
  const [top5RentedMovies, setTop5RentedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Test Data for other sections for now.
  const { categories, top5Actors } = testData

  
  useEffect(() => {
    const fetchTop5Films = async () => {
      try {
        setLoading(true)
        const films = await filmAPI.getTop5RentedFilms()
        setTop5RentedMovies(films)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch top 5 films:', err)
        setError('Failed to load top 5 films')
      } finally {
        setLoading(false)
      }
    }
    fetchTop5Films()
  }, [])

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
            {loading && <p>Loading top 5 films...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
