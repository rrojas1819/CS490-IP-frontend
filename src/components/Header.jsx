import Tab from './Tab'
import '../styles/Header.css'
import '../styles/Tab.css'
function Header() {
  const tabNames = ['Home', 'Movies', 'Customer Info'];
    
  return (
    <header className='headerContainer'>
      <h1 className='header-title'>Sakila Movies</h1>
      <div className='tabContainer'>
        {tabNames.map((name, index) => (
            //console.log(name),
            <Tab key={index} name={name} />
        ))}
      </div>
        <div className='aboutCorner' >About</div>
      
    </header>
  )
}

export default Header