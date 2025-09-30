import { useState, useEffect, useRef } from 'react'
import MovieCard from './MovieCard'
import { filmAPI, actorAPI } from '../utils/api'
import '../styles/MovieSearch.css'

function MovieSearch({ onOpenMovie }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('movie')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          setIsSearching(true)
          let results = []
          
          switch (filterType) {
            case 'movie':
              results = await filmAPI.searchFilmsByTitle(searchQuery)
              break
            case 'genre':
              results = await filmAPI.searchFilmsByGenre(searchQuery)
              break
            case 'actor':
              results = await actorAPI.searchFilmsByActorName(searchQuery)
              break
            default:
              results = await filmAPI.searchFilmsByTitle(searchQuery)
          }
          
          setSearchResults(results)
        } catch (error) {
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }, 350)
    } else {
      setSearchResults([])
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, filterType])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    if (value.trim() === '') {
      setSearchResults([])
    }
  }

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value)
    setSearchQuery('')
    setSearchResults([])
  }

  const visibleMovies = searchQuery ? searchResults : []

  return (
    <div className="movieSearchContainer">
      <h1 className="movieSearchTitle">Movie Search</h1>
      
      <div className="searchContainer">
        <div className="searchInputContainer">
          <div className="searchInputWrapper">
            <input
              type="text"
              placeholder={`Search by ${filterType === 'actor' ? 'actor name' : filterType === 'genre' ? 'genre' : 'movie title'}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="searchInput"
            />
            {isSearching && (
              <div className="searchLoading">
                <div className="loadingSpinner"></div>
              </div>
            )}
          </div>
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
        {visibleMovies.length > 0 ? (
          <div className="movieGrid">
            {visibleMovies.map((movie, index) => (
              <div className="movieItem" key={index}>
                <MovieCard movie={movie} onOpen={onOpenMovie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="noResults">
            <h2>No Results Found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieSearch
