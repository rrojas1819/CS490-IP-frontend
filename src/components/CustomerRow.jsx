import '../styles/CustomerRow.css'

function CustomerRow({ customer, onEdit, onViewHistory }) {
    const getCustomerCellData = (customer) => [
        customer.customer_id,
        customer.store_id,
        customer.first_name,
        customer.last_name,
        customer.email,
        [customer.address, customer.address2, customer.district]
            .filter(Boolean)
            .join(', ') || 'N/A',
        customer.city || 'N/A',
        customer.country || 'N/A',
        typeof customer.active !== 'undefined' ? (customer.active ? 'Active' : 'Inactive') : '',
        formatDate(customer.create_date)
    ]

    const formatDate = (value) => {
        if (!value) return ''
        const d = new Date(value)
        if (Number.isNaN(d.getTime())) return String(value)
        return d.toLocaleString()
    }

    const handleEditClick = (e) => {
        e.stopPropagation()
        onEdit(customer)
    }

    const handleViewHistoryClick = (e) => {
        e.stopPropagation()
        onViewHistory(customer)
    }

    return (
        <div className="customersTableRow" role="row">
            {getCustomerCellData(customer).map((data, index) => (
                <div key={index} className="customersTableCell" role="cell">
                    {data}
                </div>
            ))}
            <div className="customersTableCell customersTableCell--actions" role="cell">
                <button 
                    className="customerEditBtn"
                    onClick={handleEditClick}
                    title="Edit Customer"
                >
                    Edit
                </button>
                <button 
                    className="customerViewHistoryBtn"
                    onClick={handleViewHistoryClick}
                    title="View Rental History"
                >
                    View History
                </button>
            </div>
        </div>
    )
}

export default CustomerRow
