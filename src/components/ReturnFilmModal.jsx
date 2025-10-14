import { useState, useEffect } from 'react'
import { customerAPI } from '../utils/api'
import '../styles/ReturnFilmModal.css'

function ReturnFilmModal({ 
    isOpen, 
    onClose, 
    rental, 
    customer,
    onSuccess 
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            setError('')
            setSuccess('')
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleReturn = async () => {
        if (!rental || !customer) return

        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            await customerAPI.returnFilm(rental.rental_id, customer.customer_id, rental.inventory_id)
            setSuccess('Film returned successfully!')
            
            setTimeout(() => {
                onSuccess && onSuccess()
                handleClose()
            }, 1800)

        } catch (err) {
            setError(err.message || 'Failed to return film. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setError('')
        setSuccess('')
        onClose()
    }

    if (!isOpen || !rental || !customer) return null

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    const calculateDaysRented = () => {
        const rentalDate = new Date(rental.rental_date)
        const now = new Date()
        return Math.floor((now - rentalDate) / (1000 * 60 * 60 * 24))
    }

    const movieDetails = [
        { label: 'Film ID', value: rental.film_id },
        { label: 'Release Year', value: rental.release_year },
        { label: 'Rate', value: `$${rental.rental_rate}/day` },
        { label: 'Duration', value: `${rental.rental_duration} days` }
    ]

    const rentalDetails = [
        { label: 'Rental ID', value: rental.rental_id },
        { label: 'Rental Date', value: formatDateTime(rental.rental_date) },
        { label: 'Days Rented', value: `${calculateDaysRented()} days` },
        { label: 'Customer', value: `${customer.first_name} ${customer.last_name}` }
    ]

    return (
        <div className="returnFilmModalOverlay">
            <div className="returnFilmModal">
                <div className="returnFilmModalHeader">
                    <h2 className="returnFilmModalTitle">Return Film</h2>
                    <button 
                        className="returnFilmModalCloseBtn"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        ×
                    </button>
                </div>

                <div className="returnFilmModalBody">
                    <div className="returnFilmMovieInfo">
                        <h3 className="returnFilmMovieTitle">{rental.title}</h3>
                        <div className="returnFilmMovieDetails">
                            {movieDetails.map((detail, index) => (
                                <span key={index} className="returnFilmMovieDetail">
                                    {detail.label}: {detail.value}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="returnFilmRentalInfo">
                        <h4 className="returnFilmRentalInfoTitle">Rental Details</h4>
                        <div className="returnFilmRentalDetails">
                            {rentalDetails.map((detail, index) => (
                                <div key={index} className="returnFilmRentalRow">
                                    <span className="returnFilmRentalLabel">{detail.label}:</span>
                                    <span className="returnFilmRentalValue">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="returnFilmError">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="returnFilmSuccess">
                            {success}
                        </div>
                    )}

                    <div className="returnFilmModalActions">
                        <button
                            type="button"
                            className="returnFilmCancelBtn"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="returnFilmConfirmBtn"
                            onClick={handleReturn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Returning...' : 'Confirm Return'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnFilmModal
