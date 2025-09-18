import { useState } from 'react'
import MovieCard from './MovieCard'
import '../styles/MovieSearch.css'
import { testData } from '../test.js'

function MovieSearch() {
  const [displayedMovies, setDisplayedMovies] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('movie')
  const [filterValue, setFilterValue] = useState('') 
  
  const allMovies = testData.allMovies

  const handleMoreClick = () => {
    setDisplayedMovies(prev => Math.min(prev + 10, allMovies.length))
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value)
    setSearchQuery('')
  }

  const filteredMovies = allMovies.filter(movie => {
    if (searchQuery) {
      switch (filterType) {
        case 'actor':
          return movie.actors.some(actor => 
            actor.toLowerCase().includes(searchQuery.toLowerCase())
          )
        case 'genre':
          return movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
        default:
          return movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      }
    }
    
    return true
  })

  const visibleMovies = searchQuery ? filteredMovies : allMovies.slice(0, displayedMovies)

  return (
    <div className="movieSearchContainer">
      <h1 className="movieSearchTitle">Movie Search</h1>
      
      <div className="searchContainer">
        <div className="searchInputContainer">
          <input
            type="text"
            placeholder={`Search by ${filterType === 'actor' ? 'actor name' : filterType === 'genre' ? 'genre' : 'movie title'}...`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="searchInput"
          />
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="searchTypeSelect"
          >
            <option value="movie">Movie Title</option>
            <option value="actor">Actor</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </div>
      
      <div className="movieSearchBox">
        <div className="movieGrid">
          {visibleMovies.map((movie, index) => (
            <div className="movieItem" key={index}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {!searchQuery && displayedMovies < allMovies.length && (
          <button className="moreButton" onClick={handleMoreClick}>
            More
          </button>
        )}
      </div>
    </div>
  )
}

export default MovieSearch
