import '../styles/MovieCard.css'

function MovieCard({ movie, onOpen }) {
    const handleOpen = () => {
      if (typeof onOpen === 'function') onOpen(movie)
    }
    return (
      <div className="movieCard" onClick={handleOpen} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleOpen() }}>
        <div className="movieCard__media">
          {movie.imageUrl && (
            <img className="movieCard__img" src={movie.imageUrl} alt={movie.title} />
          )}
        </div>
  
        <div className="movieCard__body">
          <h4 className="movieCard__title">
            {movie.title.length > 40  ? `${movie.title.substring(0, 40)}...` : movie.title}
          </h4>
          <span className="movieCard__kebab" aria-hidden="true" />
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  