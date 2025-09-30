import { useState, useEffect } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import MovieScreen from './components/MovieScreen'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'
import ActorsSection from './components/ActorsSection'
import ActorScreen from './components/ActorScreen'
import { filmAPI, actorAPI } from './utils/api'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedActor, setSelectedActor] = useState(null)
  const [navigationHistory, setNavigationHistory] = useState([])
  
  
  const [top5RentedMovies, setTop5RentedMovies] = useState([])
  const [top5Actors, setTop5Actors] = useState([])
  const [filmGroupGenre, setFilmGroupGenre] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
 

  
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

  useEffect(() => {
    const fetchTop5Actors = async () => {
      try {
        setLoading(true)
        const actors = await actorAPI.getTop5Actors()
        setTop5Actors(actors)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch top 5 actors:', err)
        setError('Failed to load top 5 actors')
      } finally {
        setLoading(false)
      }
    }
    fetchTop5Actors()
  }, [])
  
  useEffect(() => {
    const fetchFilmGroupGenre = async () => {
      try {
        setLoading(true)
        const films = await filmAPI.getFilmGroupGenre()
        
        // Group films by genre
        const groupedFilms = films.reduce((acc, film) => {
          const genre = film.genre
          if (!acc[genre]) {
            acc[genre] = { name: genre, movies: [] }
          }
          acc[genre].movies.push(film)
          return acc
        }, {})
        
        
        const filmGroupGenre = Object.values(groupedFilms)
        setFilmGroupGenre(filmGroupGenre)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch film group genre:', err)
        setError('Failed to load film group genre')
      } finally {
        setLoading(false)
      }
    }
    fetchFilmGroupGenre()
  }, [])

  const saveCurrentState = () => ({
    activeTab,
    selectedMovie,
    selectedActor
  })

  const restoreState = (state) => {
    setActiveTab(state.activeTab)
    setSelectedMovie(state.selectedMovie)
    setSelectedActor(state.selectedActor)
  }

  const clearAllSelections = () => {
    setSelectedMovie(null)
    setSelectedActor(null)
  }

  const pushToHistory = (state) => {
    setNavigationHistory(prev => [...prev, state])
  }

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousState = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory(prev => prev.slice(0, -1))
      restoreState(previousState)
    } else {
      clearAllSelections()
      setActiveTab('Home')
    }
  }

  const handleTabClick = (tabName) => {
    setNavigationHistory([])
    clearAllSelections()
    setActiveTab(tabName)
  }

  const handleOpenMovie = async (movie, ranking = null) => {
    try {
      setLoading(true)
      pushToHistory(saveCurrentState())
      
      const detailedMovie = await filmAPI.getFilmById(movie.film_id)
      
      if (ranking !== null) {
        detailedMovie.ranking = ranking
      }
      clearAllSelections()
      setSelectedMovie(detailedMovie)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch movie details:', err)
      setError('Failed to load movie details')
      clearAllSelections()
      setSelectedMovie(movie)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenActor = (actor) => {
    pushToHistory(saveCurrentState())
    clearAllSelections()
    setSelectedActor(actor)
  }

  const refreshMovieData = async (movie) => {
    try {
      const detailedMovie = await filmAPI.getFilmById(movie.film_id)
      setSelectedMovie(detailedMovie)
    } catch (err) {
      console.error('Failed to refresh movie details:', err)
    }
  }

  return (
    <>
      <Header activeTab={activeTab} onTabClick={handleTabClick} />
      
      {activeTab === 'Home' && !selectedMovie && !selectedActor && (
        <>
          <div className='top5Container'>
            <h1 className='topRentedTitle'>Top 5 Rented Movies</h1>
            {loading && <p>Loading top 5 films...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='movieCardContainerTop5'>
              {top5RentedMovies.map((movie, index) => (
                <div key={movie.title} className='top5MovieItem'>
                  <MovieCard movie={movie} onOpen={() => handleOpenMovie(movie, index + 1)} />
                  <div className='rankNumber'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          
          {filmGroupGenre.length > 0 && filmGroupGenre.map((category, index) => (
            <div className='selectionContainer' key={index}>
              <h1 className='movieCardCategory'>{category.name}</h1>
              <div className='movieCardContainer'>
                {category.movies && category.movies.map((movie, movieIndex) => (
                  <MovieCard movie={movie} key={movieIndex} onOpen={handleOpenMovie} />
                ))}
              </div>
              
              {index === 2 && (
                <ActorsSection actors={top5Actors} title="Top 5 Actors" onOpenActor={handleOpenActor} />
              )}
            </div>
          ))}
        </>
      )}

      {activeTab === 'Home' && selectedMovie && (
        <>
          {loading && <p>Loading movie details...</p>}
           <MovieScreen
             movie={selectedMovie}
             onBack={goBack}
             onOpenActor={handleOpenActor}
             onRefreshMovie={refreshMovieData}
           />
        </>
      )}
      {activeTab === 'Home' && selectedActor && (
        <ActorScreen
          actor={selectedActor}
          onBack={goBack}
          onOpenMovie={handleOpenMovie}
        />
      )}
      
      {activeTab === 'Movies' && !selectedMovie && (
        <MovieSearch onOpenMovie={handleOpenMovie} />
      )}
      {activeTab === 'Movies' && selectedMovie && (
        <>
          {loading && <p>Loading movie details...</p>}
           <MovieScreen movie={selectedMovie} onBack={goBack} onRefreshMovie={refreshMovieData} />
        </>
      )}

      {activeTab === 'Customer Info' && <div>Customer Info content coming soon...</div>}
    </>
  )
}

export default App
