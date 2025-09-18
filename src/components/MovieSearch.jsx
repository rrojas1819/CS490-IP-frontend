import { useState } from 'react'
import MovieCard from './MovieCard'
import '../styles/MovieSearch.css'

function MovieSearch() {
  const [displayedMovies, setDisplayedMovies] = useState(15)
  const [searchQuery, setSearchQuery] = useState('') 
  
  const allMovies = [
    { title: 'Movie 1', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 2', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 3', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 4', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 5', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 6', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 7', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 8', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 9', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 10', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 11', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 12', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 13', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 14', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 15', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 16', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 17', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 18', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 19', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 20', imageUrl: 'https://via.placeholder.com/150' },
  ]

  const handleMoreClick = () => {
    setDisplayedMovies(prev => Math.min(prev + 10, allMovies.length))
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredMovies = allMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const visibleMovies = searchQuery ? filteredMovies : allMovies.slice(0, displayedMovies)

  return (
    <div className="movieSearchContainer">
      <h1 className="movieSearchTitle">Movie Search</h1>
      
      <div className="searchInputContainer">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="searchInput"
        />
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
