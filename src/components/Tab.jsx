import '../styles/Tab.css'

function Tab({ name, isActive, onClick }) {
  return (
    <h1 
      className={`tabTitle ${isActive ? 'active' : ''}`}
      onClick={() => onClick(name)}
    >
      {name}
    </h1>
  )
}

export default Tab