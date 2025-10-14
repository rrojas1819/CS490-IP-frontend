import { useState } from 'react'
import { customerAPI } from '../utils/api'
import '../styles/EditCustomerModal.css'

function DeleteCustomerButton({ customerId, onNotify }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')
    const [confirming, setConfirming] = useState(false)

    const handlePrimaryClick = () => {
        if (isDeleting) return
        setConfirming(true)
        setError('')
        if (onNotify) onNotify({ type: null, message: '' })
    }

    const handleCancelConfirm = () => {
        if (isDeleting) return
        setConfirming(false)
    }

    const handleConfirmDelete = async () => {
        const effectiveId = customerId
        if (!effectiveId) {
            setError('Missing customer ID')
            if (onNotify) onNotify({ type: 'error', message: 'Missing customer ID' })
            return
        }
        try {
            setIsDeleting(true)
            setError('')
            const resp = await customerAPI.deleteCustomer(effectiveId)
            console.log('Delete response', resp)
            
            const successMessage = resp?.message || 'Customer deleted successfully'
            if (onNotify) onNotify({ type: 'success', message: successMessage })
            
            setConfirming(false)
        } catch (e) {
            const msg = e?.message || 'Failed to delete customer'
            setError(msg)
            if (onNotify) onNotify({ type: 'error', message: msg })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
    <div className="editCustomerDeleteWrapper">
      <button
        type="button"
        className="editCustomerDeleteBtn"
        onClick={handlePrimaryClick}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Customer'}
      </button>

      {confirming && (
        <div className="miniConfirmBackdrop">
          <div className="miniConfirmModal">
            <div className="miniConfirmTitle">Confirm Customer Deletion</div>
            <div className="miniConfirmText">
              Are you sure you want to permanently delete this customer?
              <br /><br />
              <strong>Note:</strong> This will also delete all rental history for this customer. 
              If the customer has any current rentals, the deletion will be blocked.
            </div>
            <div className="miniConfirmActions">
              <button
                type="button"
                className="editCustomerCancelBtn"
                onClick={handleCancelConfirm}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="editCustomerDeleteBtn"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    )
}

export default DeleteCustomerButton
