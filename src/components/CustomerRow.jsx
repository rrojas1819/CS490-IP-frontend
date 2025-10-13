import '../styles/CustomerRow.css'

function CustomerRow({ customer, onEdit }) {
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

    const handleRowClick = (e) => {
        if (e.target.closest('.customerEditBtn')) {
            return
        }
        onEdit(customer)
    }

    const handleEditClick = (e) => {
        e.stopPropagation()
        onEdit(customer)
    }

    return (
        <div className="customersTableRow" role="row" onClick={handleRowClick}>
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
            </div>
        </div>
    )
}

export default CustomerRow
