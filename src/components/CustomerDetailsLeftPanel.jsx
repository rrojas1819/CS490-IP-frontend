import '../styles/EditCustomerModal.css'

function CustomerDetailsLeftPanel({ customer }) {
    const customerDetails = [
        { label: 'Customer ID', value: customer?.customer_id },
        { label: 'Store ID', value: customer?.store_id },
        { label: 'Create Date', value: customer?.create_date ? new Date(customer.create_date).toLocaleString() : '' },
        { label: 'Last Update', value: customer?.last_update ? new Date(customer.last_update).toLocaleString() : '' }
    ]

    return (
        <div className="editCustomerModalLeft">
            <h3>Customer Details</h3>
            <div className="editCustomerDetails">
                {customerDetails.map((detail, index) => (
                    <div key={index} className="editCustomerDetailItem">
                        <strong>{detail.label}:</strong> {detail.value}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerDetailsLeftPanel
