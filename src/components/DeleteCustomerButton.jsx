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
            if (onNotify) onNotify({ type: 'success', message: 'Customer deleted successfully' })
        } catch (e) {
            const msg = e?.message || 'Failed to delete customer'
            setError(msg)
            if (onNotify) onNotify({ type: 'error', message: msg })
        } finally {
            setIsDeleting(false)
            setConfirming(prev => !!error)
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
            <div className="miniConfirmTitle">Confirm Deletion</div>
            <div className="miniConfirmText">Are you sure you want to permanently delete this customer?</div>
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


