import { useState } from 'react'
import { customerAPI } from '../utils/api'
import '../styles/AddCustomerModal.css'

function AddCustomerModal({ isOpen, onClose, onCustomerAdded }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        address2: '',
        district: '',
        city: '',
        country: '',
        postal_code: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [newCustomerId, setNewCustomerId] = useState(null)
    const [newCustomerEmail, setNewCustomerEmail] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        if (name === 'phone') {
            const phoneValue = value.replace(/[^\d\s\-\(\)\+]/g, '')
            setFormData(prev => ({
                ...prev,
                [name]: phoneValue
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const capitalize = (str) => str.trim().toUpperCase()
            
            const formattedData = {
                ...formData,
                first_name: capitalize(formData.first_name),
                last_name: capitalize(formData.last_name),
                address: capitalize(formData.address),
                address2: capitalize(formData.address2),
                district: capitalize(formData.district),
                city: capitalize(formData.city),
                country: capitalize(formData.country),
                postal_code: formData.postal_code.trim().toUpperCase()
            }

            const result = await customerAPI.addCustomer(formattedData)
            setNewCustomerId(result.customer_id)
            setNewCustomerEmail(result.email)
            onCustomerAdded(result)
            setIsSuccess(true)
            setError('')
        } catch (err) {
            setError(err.message || 'Failed to add customer')
            setIsSuccess(false)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setFormData({
            first_name: '',
            last_name: '',
            address: '',
            address2: '',
            district: '',
            city: '',
            country: '',
            postal_code: '',
            phone: ''
        })
        setError('')
        setIsSuccess(false)
        setNewCustomerId(null)
        setNewCustomerEmail(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="addCustomerModalOverlay">
            <div className="addCustomerModal">
                <div className="addCustomerModalHeader">
                    <h2>Add New Customer</h2>
                    <button 
                        type="button" 
                        className="addCustomerModalClose"
                        onClick={handleClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="addCustomerModalForm">
                    {error && (
                        <div className="addCustomerModalError">{error}</div>
                    )}
                    
                    {isSuccess && (
                        <div className="addCustomerModalSuccess">
                            Customer added successfully! Customer ID: {newCustomerId}
                            {newCustomerEmail && (
                                <div>Email: {newCustomerEmail}</div>
                            )}
                        </div>
                    )}

                    <div className="addCustomerModalSection">
                        <h3>Personal Information</h3>
                        <div className="addCustomerModalRow">
                            <div className="addCustomerModalField">
                                <label htmlFor="first_name">First Name *</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="addCustomerModalField">
                                <label htmlFor="last_name">Last Name *</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="addCustomerModalSection">
                        <h3>Address Information</h3>
                        <div className="addCustomerModalRow">
                            <div className="addCustomerModalField addCustomerModalField--full">
                                <label htmlFor="address">Address *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="addCustomerModalRow">
                            <div className="addCustomerModalField">
                                <label htmlFor="address2">Address 2</label>
                                <input
                                    type="text"
                                    id="address2"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="addCustomerModalField">
                                <label htmlFor="district">District/State *</label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="addCustomerModalRow">
                            <div className="addCustomerModalField">
                                <label htmlFor="city">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="addCustomerModalField">
                                <label htmlFor="country">Country *</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="addCustomerModalRow">
                            <div className="addCustomerModalField">
                                <label htmlFor="postal_code">Postal Code</label>
                                <input
                                    type="text"
                                    id="postal_code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/*Come back and fix phone number regex/input*/}
                            <div className="addCustomerModalField">
                                <label htmlFor="phone">Phone *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    pattern="[\d\s\-\(\)\+]+"
                                    title="Please enter a valid phone number (digits, spaces, hyphens, parentheses, and plus sign only)"
                                    placeholder="e.g., (555) 123-4567 or +1 555 123 4567"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="addCustomerModalActions">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="addCustomerModalBtn addCustomerModalBtn--secondary"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="addCustomerModalBtn addCustomerModalBtn--primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomerModal
