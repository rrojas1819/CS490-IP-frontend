import '../styles/MovieScreen.css'

function MovieScreen({ movie, onBack, onOpenActor }) {
    if (!movie) return null

    const {
        title,
        imageUrl,
        description,
        genre,
        rating,
        actors,
        ranking,
        length,
        replacement_cost,
        special_features,
        rental_duration,
        rental_rate,
        language_id,
        original_language_id,
        last_update,
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
                            {length && <span className="movieScreenMetaItem">{length} min</span>}
                            {rental_duration && <span className="movieScreenMetaItem">{rental_duration} days</span>}
                        </div>
                        <div className="movieScreenRentInfo">
                            {rental_rate && (
                                <span className="movieScreenRentalRate">${rental_rate}/day</span>
                            )}
                            <button type="button" className="movieScreenRentBtn movieScreenRentBtn--inline">Rent</button>
                        </div>
                    </div>

                    {description && (
                        <>
                            <h2 className="movieScreenSectionTitle">Description</h2>
                            <p className="movieScreenDescription">{description}</p>
                        </>
                    )}

                    <div className="movieScreenDetails">
                        <h2 className="movieScreenSectionTitle">Movie Details</h2>
                        
                        <div className="movieScreenDetailsGrid">
                            {filmId !== undefined && filmId !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Film ID:</strong> {filmId}
                                </div>
                            )}
                            {length !== undefined && length !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Length:</strong> {length} minutes
                                </div>
                            )}
                            {rental_duration !== undefined && rental_duration !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Rental Duration:</strong> {rental_duration} days
                                </div>
                            )}
                            {rental_rate !== undefined && rental_rate !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Rental Rate:</strong> ${rental_rate}/day
                                </div>
                            )}
                            {replacement_cost !== undefined && replacement_cost !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Replacement Cost:</strong> ${replacement_cost}
                                </div>
                            )}
                            {language_id !== undefined && language_id !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Language ID:</strong> {language_id}
                                </div>
                            )}
                            {original_language_id !== undefined && original_language_id !== null && (
                                <div className="movieScreenDetailItem">
                                    <strong>Original Language ID:</strong> {original_language_id}
                                </div>
                            )}
                            {last_update && (
                                <div className="movieScreenDetailItem">
                                    <strong>Last Updated:</strong> {new Date(last_update).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                        
                        {special_features && (
                            <div className="movieScreenDetailItem movieScreenDetailItem--full">
                                <strong>Special Features:</strong> {special_features}
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