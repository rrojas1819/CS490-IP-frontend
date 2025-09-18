import { useState } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'
import { testData } from './test.js'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  
  const { topRentedMovie, categories } = testData

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Header activeTab={activeTab} onTabClick={handleTabClick} />
      
      {activeTab === 'Home' && (
        <>
          <div className='movieCardRentedOneContainer'>
            <h1 className='topRentedTitle'>Top Rented Movie</h1>
            <div className='movieCardContainerRentedOne'>
              <MovieCard movie={topRentedMovie} />
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
