import '../styles/ActorScreen.css'

function ActorScreen({ actor, onBack, onOpenMovie }) {
    if (!actor) return null

    const fullName = `${actor.first_name} ${actor.last_name}`

    return (
        <div className="actorScreenContainer">
            {onBack && (
                <button onClick={onBack} className="actorScreenBackBtn">Back</button>
            )}

            <div className="actorScreenLayout">
                <div className="actorScreenBody">
                    <h1 className="actorScreenTitle">{fullName}</h1>
                    <div className="actorScreenHeaderRow">
                        <div className="actorScreenMeta">
                            {actor.actor_id !== undefined && (
                                <span className="actorScreenMetaItem">Actor ID: {actor.actor_id}</span>
                            )}
                            {actor.total_movies !== undefined && (
                                <span className="actorScreenMetaItem">Total Movies: {actor.total_movies}</span>
                            )}
                        </div>
                    </div>

                    {Array.isArray(actor.top_5_films) && actor.top_5_films.length > 0 && (
                        <div className="actorScreenActorsSection">
                            <h3 className="actorScreenSectionTitle">Top 5 Films</h3>
                            <div className="actorScreenActors">
                                {actor.top_5_films.map((film) => (
                                    <button
                                        type="button"
                                        className="actorScreenActorCard"
                                        key={film.film_id}
                                        onClick={() => typeof onOpenMovie === 'function' && onOpenMovie(film)}
                                    >
                                        <div className="actorScreenFilmTitle">{film.title}</div>
                                        <div className="actorScreenFilmMeta">
                                            {film.release_year} • Rated {film.rating} • Rented {film.times_rented}x
                                        </div>
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

export default ActorScreen


