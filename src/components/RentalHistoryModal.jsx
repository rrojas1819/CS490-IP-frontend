import { useEffect, useState } from 'react'
import { customerAPI } from '../utils/api'
import '../styles/RentalHistoryModal.css'

function RentalHistoryModal({ isOpen, onClose, customer }) {
    const [rentalHistory, setRentalHistory] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const tableHeaders = [
        'Film Title',
        'Rental Date', 
        'Return Date',
        'Status',
        'Days Rented',
        'Rating',
        'Rental Rate'
    ]

    const getRentalRowData = (rental) => [
        <div key="film">
            <div className="rentalHistoryFilmTitle">{rental.title}</div>
            <div className="rentalHistoryFilmYear">({rental.release_year})</div>
        </div>,
        formatDateTime(rental.rental_date),
        rental.return_date ? formatDateTime(rental.return_date) : 'Not Returned',
        <span 
            key="status"
            className={`rentalHistoryStatus rentalHistoryStatus--${rental.rental_status.toLowerCase().replace(' ', '-')}`}
        >
            {rental.rental_status}
        </span>,
        `${rental.days_rented} days`,
        rental.rating || 'N/A',
        rental.rental_rate ? `$${rental.rental_rate}` : 'N/A'
    ]

    useEffect(() => {
        if (isOpen && customer) {
            loadRentalHistory()
        }
    }, [isOpen, customer])

    const loadRentalHistory = async () => {
        if (!customer?.customer_id) return

        setIsLoading(true)
        setError('')
        try {
            const data = await customerAPI.getRentalHistory(customer.customer_id)
            setRentalHistory(data)
        } catch (err) {
            setError('Failed to load rental history')
            console.error('Error loading rental history:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    if (!isOpen) return null

    return (
        <div className="rentalHistoryModalOverlay">
            <div className="rentalHistoryModal">
                <div className="rentalHistoryModalHeader">
                    <h2>Rental History</h2>
                    <button 
                        className="rentalHistoryModalCloseBtn"
                        onClick={onClose}
                        title="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="rentalHistoryModalContent">
                    <div className="rentalHistoryCustomerSection">
                        <h3>Customer Information</h3>
                        <div className="rentalHistoryCustomerInfo">
                            <div className="rentalHistoryCustomerColumn">
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Name:</span>
                                    <span className="rentalHistoryCustomerValue">
                                        {customer?.first_name} {customer?.last_name}
                                    </span>
                                </div>
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Email:</span>
                                    <span className="rentalHistoryCustomerValue">{customer?.email}</span>
                                </div>
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Customer ID:</span>
                                    <span className="rentalHistoryCustomerValue">{customer?.customer_id}</span>
                                </div>
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Status:</span>
                                    <span className="rentalHistoryCustomerValue">
                                        {customer?.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                            <div className="rentalHistoryCustomerColumn">
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Address:</span>
                                    <span className="rentalHistoryCustomerValue">
                                        {[customer?.address, customer?.address2, customer?.district]
                                            .filter(Boolean)
                                            .join(', ') || 'N/A'}
                                    </span>
                                </div>
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">City:</span>
                                    <span className="rentalHistoryCustomerValue">{customer?.city || 'N/A'}</span>
                                </div>
                                <div className="rentalHistoryCustomerRow">
                                    <span className="rentalHistoryCustomerLabel">Country:</span>
                                    <span className="rentalHistoryCustomerValue">{customer?.country || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rentalHistorySection">
                        <h3>Rental History</h3>
                        
                        {isLoading && (
                            <div className="rentalHistoryLoading">Loading rental history...</div>
                        )}

                        {error && (
                            <div className="rentalHistoryError">{error}</div>
                        )}

                        {rentalHistory && !isLoading && (
                            <div className="rentalHistoryStats">
                                <div className="rentalHistoryStat">
                                    <span className="rentalHistoryStatLabel">Total Rentals:</span>
                                    <span className="rentalHistoryStatValue">{rentalHistory.total_rentals}</span>
                                </div>
                                <div className="rentalHistoryStat">
                                    <span className="rentalHistoryStatLabel">Current Rentals:</span>
                                    <span className="rentalHistoryStatValue">{rentalHistory.current_rentals}</span>
                                </div>
                                <div className="rentalHistoryStat">
                                    <span className="rentalHistoryStatLabel">Past Rentals:</span>
                                    <span className="rentalHistoryStatValue">{rentalHistory.past_rentals}</span>
                                </div>
                            </div>
                        )}

                        {rentalHistory && !isLoading && rentalHistory.all_rentals && rentalHistory.all_rentals.length > 0 && (
                            <div className="rentalHistoryTableWrapper">
                                <div className="rentalHistoryTable">
                                    <div className="rentalHistoryTableHeader">
                                        {tableHeaders.map((header, index) => (
                                            <div key={index} className="rentalHistoryTableCell">
                                                {header}
                                            </div>
                                        ))}
                                    </div>
                                    {rentalHistory.all_rentals.map((rental) => (
                                        <div key={rental.rental_id} className="rentalHistoryTableRow">
                                            {getRentalRowData(rental).map((cellData, index) => (
                                                <div key={index} className="rentalHistoryTableCell">
                                                    {cellData}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {rentalHistory && !isLoading && (!rentalHistory.all_rentals || rentalHistory.all_rentals.length === 0) && (
                            <div className="rentalHistoryEmpty">
                                No rental history found for this customer.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentalHistoryModal
