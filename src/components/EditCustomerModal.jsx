import { useState, useEffect } from 'react'
import { customerAPI } from '../utils/api'
import CustomerDetailsLeftPanel from './CustomerDetailsLeftPanel'
import CustomerDetailsRightPanel from './CustomerDetailsRightPanel'
import '../styles/EditCustomerModal.css'

function EditCustomerModal({ isOpen, onClose, customer, onCustomerUpdated }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        active: 1,
        address: '',
        address2: '',
        district: '',
        city: '',
        country: '',
        postal_code: '',
        phone: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [changes, setChanges] = useState([])
    const [lastSavedData, setLastSavedData] = useState(null)
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        if (customer && isOpen) {
            const initialData = {
                first_name: customer.first_name || '',
                last_name: customer.last_name || '',
                email: customer.email || '',
                active: customer.active !== undefined ? customer.active : 1,
                address: customer.address || '',
                address2: customer.address2 || '',
                district: customer.district || '',
                city: customer.city || '',
                country: customer.country || '',
                postal_code: customer.postal_code || '',
                phone: customer.phone || ''
            }
            
            setFormData(initialData)
            setLastSavedData(initialData)
            setError('')
            setIsSuccess(false)
            setChanges([])
            setIsDeleted(false)
        }
    }, [customer, isOpen])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!customer?.customer_id) return

        setIsLoading(true)
        setError('')

        try {
            const fieldLabels = {
                first_name: 'First Name',
                last_name: 'Last Name',
                email: 'Email',
                active: 'Active Status',
                address: 'Address',
                address2: 'Address 2',
                district: 'District',
                city: 'City',
                country: 'Country',
                postal_code: 'Postal Code',
                phone: 'Phone'
            }

            const detectedChanges = []
            Object.keys(formData).forEach(key => {
                const oldValue = lastSavedData[key]
                const newValue = formData[key]
                
                if (oldValue !== newValue) {
                    const label = fieldLabels[key] || key
                    let oldDisplay = oldValue || '(empty)'
                    let newDisplay = newValue || '(empty)'
                    
                    if (key === 'active') {
                        oldDisplay = oldValue === 1 ? 'Active' : 'Inactive'
                        newDisplay = newValue === 1 ? 'Active' : 'Inactive'
                    }
                    
                    detectedChanges.push(`${label}: ${oldDisplay} → ${newDisplay}`)
                }
            })

            await customerAPI.updateCustomer(customer.customer_id, formData)
            onCustomerUpdated()
            setChanges(detectedChanges)
            setLastSavedData({ ...formData })
            setIsSuccess(true)
            setError('')
        } catch (err) {
            setError('Failed to update customer. Please try again.')
            console.error('Error updating customer:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setError('')
        setIsSuccess(false)
        setChanges([])
        setLastSavedData(null)
        onClose()
    }

    const handleCustomerDeleted = () => {
        setIsDeleted(true)
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            active: 1,
            address: '',
            address2: '',
            district: '',
            city: '',
            country: '',
            postal_code: '',
            phone: ''
        })
    }

    if (!isOpen || !customer) return null

    return (
        <div className="editCustomerModalOverlay">
            <div className="editCustomerModal">
                <div className="editCustomerModalHeader">
                    <h2>Edit Customer</h2>
                    <button 
                        className="editCustomerModalClose" 
                        onClick={handleClose}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <div className="editCustomerModalContent">
                    <CustomerDetailsLeftPanel customer={isDeleted ? {} : customer} />

                    <CustomerDetailsRightPanel
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleClose}
                        isLoading={isLoading || isDeleted}
                        error={error}
                        isSuccess={isSuccess}
                        changes={changes}
                        customerId={customer.customer_id}
                        disabledControls={isDeleted}
                        onCustomerDeleted={handleCustomerDeleted}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditCustomerModal
