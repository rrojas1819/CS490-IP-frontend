import { useState } from 'react'
import '../styles/MovieScreen.css'
import RentReturnModal from './RentReturnModal'

function MovieScreen({ movie, onBack, onOpenActor }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: 'rent'
    })
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
        total_copies,
        rented_copies,
        available_copies,
    } = movie

    const releaseYear = movie.release_year
    const filmId = movie.film_id

    const actorList = Array.isArray(actors) ? actors : []

    const handleOpenModal = (mode) => {
        setModalState({
            isOpen: true,
            mode
        })
    }

    const handleCloseModal = () => {
        setModalState({
            isOpen: false,
            mode: 'rent'
        })
    }

    const handleModalSuccess = (data) => {
    }

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
                            <button 
                                type="button" 
                                className={`movieScreenReturnBtn movieScreenReturnBtn--inline ${rented_copies === 0 ? 'movieScreenReturnBtn--disabled' : ''}`}
                                disabled={rented_copies === 0}
                                onClick={() => rented_copies > 0 && handleOpenModal('return')}
                            >
                                Return
                            </button>
                            <button 
                                type="button" 
                                className={`movieScreenRentBtn movieScreenRentBtn--inline ${available_copies === 0 ? 'movieScreenRentBtn--disabled' : ''}`}
                                disabled={available_copies === 0}
                                onClick={() => available_copies > 0 && handleOpenModal('rent')}
                            >
                                {available_copies === 0 ? 'Out of Stock' : 'Rent'}
                            </button>
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
                        
                        {(total_copies !== undefined || rented_copies !== undefined || available_copies !== undefined) && (
                            <div className="movieScreenInventorySection">
                                <h3 className="movieScreenSectionTitle">Inventory Status</h3>
                                <div className="movieScreenInventoryGrid">
                                    {total_copies !== undefined && total_copies !== null && (
                                        <div className="movieScreenInventoryItem">
                                            <strong>Total Copies:</strong> {total_copies}
                                        </div>
                                    )}
                                    {rented_copies !== undefined && rented_copies !== null && (
                                        <div className="movieScreenInventoryItem">
                                            <strong>Currently Rented:</strong> {rented_copies}
                                        </div>
                                    )}
                                    {available_copies !== undefined && available_copies !== null && (
                                        <div className="movieScreenInventoryItem movieScreenInventoryItem--available">
                                            <strong>Available:</strong> {available_copies}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
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

            <RentReturnModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                movie={movie}
                mode={modalState.mode}
                onSuccess={handleModalSuccess}
            />
        </div>
    )
}

export default MovieScreen