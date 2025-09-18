import { useState } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import './styles/App.css'
import MovieCard from './components/MovieCard'
import './styles/Selection.css'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  
  const categories = ['Long', 'Short', 'Rated One'] //Examples
  const movies = [
    { title: 'Movie 1', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 2', imageUrl: 'https://via.placeholder.com/150' },
    { title: 'Movie 3', imageUrl: 'https://via.placeholder.com/150' },
  ]

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Header activeTab={activeTab} onTabClick={handleTabClick} />
      
      {activeTab === 'Home' && (
        <>
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
      )}
      
      {activeTab === 'Movies' && <MovieSearch />}
      {activeTab === 'Customer Info' && <div>Customer Info content coming soon...</div>}
    </>
  )
}

export default App
