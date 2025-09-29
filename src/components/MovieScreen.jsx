import '../styles/MovieScreen.css'

function MovieScreen({ movie, onBack, onOpenActor }) {
    if (!movie) return null
/*I should add some symbol or something to showcase the rank number I'll do that later */
    const {
        title,
        imageUrl,
        description,
        genre,
        rating,
        actors,
        ranking,
    } = movie

    const releaseYear = movie.release_year
    const filmId = movie.film_id

    const actorList = Array.isArray(actors) ? actors : []

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
                    <div className="movieScreenTitleRow">
                        <h1 className="movieScreenTitle">{title || 'Movie'}</h1>
                        {ranking && (
                            <div className="movieScreenRanking">
                                <span className="movieScreenRankingNumber">#{ranking}</span>
                                <span className="movieScreenRankingLabel">Top 5</span>
                            </div>
                        )}
                    </div>
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

                    {actorList.length > 0 && (
                        <div className="movieScreenActorsSection">
                            <h3 className="movieScreenSectionTitle">Actors</h3>
                            <div className="movieScreenActors">
                                {actorList.map((a) => (
                                    <button
                                        type="button"
                                        className="movieScreenActorCard"
                                        key={a.actor_id}
                                        onClick={() => typeof onOpenActor === 'function' && onOpenActor(a)}
                                    >
                                        {a.first_name} {a.last_name}
                                    </button>
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