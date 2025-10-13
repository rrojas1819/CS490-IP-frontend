import '../styles/EditCustomerModal.css'
import DeleteCustomerButton from './DeleteCustomerButton'
import { useState } from 'react'

function CustomerDetailsRightPanel({ formData, handleInputChange, handleSubmit, handleCancel, isLoading, error, emailError, phoneError, isSuccess, changes, customerId, disabledControls = false, onCustomerDeleted }) {
    const [topAlert, setTopAlert] = useState({ type: null, message: '' })
    return (
        <div className="editCustomerModalRight">
            <form onSubmit={handleSubmit} className="editCustomerForm">
                {isSuccess && (
                    <div className="editCustomerSuccess">
                        <div>Customer updated successfully! Changes have been saved.</div>
                        {changes.length > 0 && (
                            <div className="editCustomerChanges">
                                <strong>Changes made:</strong>
                                <ul>
                                    {changes.map((change, index) => (
                                        <li key={index}>{change}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {topAlert.message && (
                    <div className={topAlert.type === 'error' ? 'editCustomerError' : 'editCustomerSuccess'}>
                        {topAlert.message}
                    </div>
                )}

                {error && (
                    <div className="editCustomerError">{error}</div>
                )}

                {emailError && (
                    <div className="editCustomerError">{emailError}</div>
                )}

                {phoneError && (
                    <div className="editCustomerError">{phoneError}</div>
                )}

                <div className="editCustomerFormSection">
                    <h3>Basic Information</h3>
                    <div className="editCustomerFormRow">
                        <div className="editCustomerFormField">
                            <label htmlFor="first_name">First Name *</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                                disabled={disabledControls}
                            />
                        </div>
                        <div className="editCustomerFormField">
                            <label htmlFor="last_name">Last Name *</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                                disabled={disabledControls}
                            />
                        </div>
                    </div>

                    <div className="editCustomerFormRow">
                        <div className="editCustomerFormField">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={disabledControls}
                            />
                        </div>
                        <div className="editCustomerFormField">
                            <label className="editCustomerCheckboxLabel">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active === 1}
                                    onChange={handleInputChange}
                                    disabled={disabledControls}
                                />
                                Active
                            </label>
                        </div>
                    </div>
                </div>

                <div className="editCustomerFormSection">
                    <h3>Address Information</h3>
                    <div className="editCustomerFormField">
                        <label htmlFor="address">Address *</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            disabled={disabledControls}
                        />
                    </div>

                    <div className="editCustomerFormField">
                        <label htmlFor="address2">Address 2</label>
                        <input
                            type="text"
                            id="address2"
                            name="address2"
                            value={formData.address2}
                            onChange={handleInputChange}
                            disabled={disabledControls}
                        />
                    </div>

                    <div className="editCustomerFormRow">
                        <div className="editCustomerFormField">
                            <label htmlFor="district">District/State *</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                disabled={disabledControls}
                            />
                        </div>
                        <div className="editCustomerFormField">
                            <label htmlFor="postal_code">Postal Code</label>
                            <input
                                type="text"
                                id="postal_code"
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleInputChange}
                                disabled={disabledControls}
                            />
                        </div>
                    </div>

                    <div className="editCustomerFormRow">
                        <div className="editCustomerFormField">
                            <label htmlFor="city">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                                disabled={disabledControls}
                            />
                        </div>
                        <div className="editCustomerFormField">
                            <label htmlFor="country">Country *</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                                disabled={disabledControls}
                            />
                        </div>
                    </div>

                    <div className="editCustomerFormField">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={disabledControls}
                        />
                    </div>
                </div>

                <div className="editCustomerFormActions">
                    <DeleteCustomerButton customerId={customerId} onNotify={(payload) => {
                        setTopAlert(payload)
                        if (payload?.type === 'success') {
                            if (onCustomerDeleted) onCustomerDeleted()
                        }
                    }} />
                    <div className="editCustomerRightActions">
                        <button
                            type="button"
                            className="editCustomerCancelBtn"
                            onClick={handleCancel}
                            disabled={isLoading || disabledControls}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="editCustomerSaveBtn"
                            disabled={isLoading || disabledControls}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomerDetailsRightPanel
