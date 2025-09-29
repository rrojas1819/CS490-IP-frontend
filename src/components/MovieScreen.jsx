import '../styles/MovieScreen.css'

function MovieScreen({ movie, onBack }) {
    if (!movie) return null

    const {
        title,
        imageUrl,
        description,
        genre,
        rating,
        actors,
    } = movie

    const releaseYear = movie.release_year
    const filmId = movie.film_id

    const actorNames = (actors || []).map((a) => `${a.first_name} ${a.last_name}`)

    return (
        <div className="movieScreenContainer">
            {onBack && (
                <button onClick={onBack} className="movieScreenBackBtn">Back</button>
            )}

            <div className="movieScreenLayout">
                {imageUrl && (
                    <img src={imageUrl} alt={title} className="movieScreenPoster" />
                )}

                <div className="movieScreenBody">
                    <h1 className="movieScreenTitle">{title || 'Movie'}</h1>
                    <div className="movieScreenHeaderRow">
                        <div className="movieScreenMeta">
                            {genre && <span className="movieScreenMetaItem">{genre}</span>}
                            {rating && <span className="movieScreenMetaItem">Rated {rating}</span>}
                            {releaseYear && <span className="movieScreenMetaItem">{releaseYear}</span>}
                        </div>
                        <button type="button" className="movieScreenRentBtn movieScreenRentBtn--inline">Rent</button>
                    </div>

                    {description && (
                        <>
                            <h2 className="movieScreenSectionTitle">Description</h2>
                            <p className="movieScreenDescription">{description}</p>
                        </>
                    )}

                    <div className="movieScreenDetails">
                        {filmId !== undefined && filmId !== null && (
                            <div className="movieScreenDetailItem">
                                <strong>Film ID:</strong> {filmId}
                            </div>
                        )}
                       
                       
                    </div>

                    {actorNames.length > 0 && (
                        <div className="movieScreenActorsSection">
                            <h3 className="movieScreenSectionTitle">Actors</h3>
                            <div className="movieScreenActors">
                                {actorNames.map((name) => (
                                    <div className="movieScreenActorCard" key={name}>{name}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieScreen