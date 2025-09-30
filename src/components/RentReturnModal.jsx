import { useState, useEffect } from 'react'
import '../styles/RentReturnModal.css'
import { customerAPI } from '../utils/api'

function RentReturnModal({ 
    isOpen, 
    onClose, 
    movie, 
    mode,
    onSuccess 
}) {
    const [formData, setFormData] = useState({
        customer_id: '',
        rental_id: '',
        inventory_id: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [rentalInfo, setRentalInfo] = useState(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            let data
            if (mode === 'rent') {
                data = await customerAPI.rentFilm(movie.film_id, formData.customer_id)
            } else {
                data = await customerAPI.returnFilm(formData.rental_id, formData.customer_id, formData.inventory_id)
            }

            if (mode === 'rent') {
                setSuccess('Movie rented successfully!')
                setRentalInfo({
                    rental_id: data.rental_id || data.rentalId,
                    inventory_id: data.inventory_id || data.inventoryId
                })
            } else {
                setSuccess('Movie returned successfully!')
            }
            
            onSuccess && onSuccess(data)

        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setFormData({
            customer_id: '',
            rental_id: '',
            inventory_id: ''
        })
        setError('')
        setSuccess('')
        setRentalInfo(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="rentReturnModalOverlay">
            <div className="rentReturnModal">
                <div className="rentReturnModalHeader">
                    <h2 className="rentReturnModalTitle">
                        {mode === 'rent' ? 'Rent Movie' : 'Return Movie'}
                    </h2>
                    <button 
                        className="rentReturnModalCloseBtn"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        ×
                    </button>
                </div>

                <div className="rentReturnModalBody">
                    {movie && (
                        <div className="rentReturnMovieInfo">
                            <h3 className="rentReturnMovieTitle">{movie.title}</h3>
                            <div className="rentReturnMovieDetails">
                                <span className="rentReturnMovieDetail">Film ID: {movie.film_id}</span>
                                <span className="rentReturnMovieDetail">Rate: ${movie.rental_rate}/day</span>
                                <span className="rentReturnMovieDetail">Duration: {movie.rental_duration} days</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="rentReturnForm">
                        <div className="rentReturnFormGroup">
                            <label htmlFor="customer_id" className="rentReturnLabel">
                                Customer ID
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="customer_id"
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={handleInputChange}
                                className="rentReturnInput"
                                placeholder="Enter customer ID"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {mode === 'return' && (
                            <>
                                <div className="rentReturnFormGroup">
                                    <label htmlFor="rental_id" className="rentReturnLabel">
                                        Rental ID
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        id="rental_id"
                                        name="rental_id"
                                        value={formData.rental_id}
                                        onChange={handleInputChange}
                                        className="rentReturnInput"
                                        placeholder="Enter rental ID"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="rentReturnFormGroup">
                                    <label htmlFor="inventory_id" className="rentReturnLabel">
                                        Inventory ID
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        id="inventory_id"
                                        name="inventory_id"
                                        value={formData.inventory_id}
                                        onChange={handleInputChange}
                                        className="rentReturnInput"
                                        placeholder="Enter inventory ID"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="rentReturnError">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rentReturnSuccess">
                                {success}
                                {rentalInfo && (
                                    <div className="rentReturnRentalInfo">
                                        <div className="rentReturnRentalInfoTitle">Save these details for returning:</div>
                                        <div className="rentReturnRentalInfoItem">
                                            <strong>Rental ID:</strong> {rentalInfo.rental_id}
                                        </div>
                                        <div className="rentReturnRentalInfoItem">
                                            <strong>Inventory ID:</strong> {rentalInfo.inventory_id}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="rentReturnModalActions">
                            <button
                                type="button"
                                className="rentReturnCancelBtn"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`rentReturnSubmitBtn ${mode === 'rent' ? 'rentReturnSubmitBtn--rent' : 'rentReturnSubmitBtn--return'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : (mode === 'rent' ? 'Rent Movie' : 'Return Movie')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RentReturnModal
