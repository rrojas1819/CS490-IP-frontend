import { useEffect, useMemo, useState, useCallback } from 'react'
import { customerAPI } from '../utils/api'
import CustomerRow from './CustomerRow'
import CustomersControls from './CustomersControls'
import '../styles/CustomersScreen.css'

function CustomersScreen() {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [isSearchMode, setIsSearchMode] = useState(false)

    const totalPages = useMemo(() => {
        if (!total || !limit) return 1
        return Math.max(1, Math.ceil(total / limit))
    }, [total, limit])

    useEffect(() => {
        let isCancelled = false
        async function load() {
            setIsLoading(true)
            setError('')
            try {
                const data = await customerAPI.listCustomers()
                const hasEnvelope = Array.isArray(data?.customers)
                const list = hasEnvelope ? data.customers : (Array.isArray(data) ? data : [])
                const totalCount = list.length
                if (!isCancelled) {
                    setCustomers(list)
                    setTotal(totalCount)
                }
            } catch (e) {
                if (!isCancelled) setError('Failed to load customers.')
            } finally {
                if (!isCancelled) setIsLoading(false)
            }
        }
        load()
        return () => {
            isCancelled = true
        }
    }, [])


    const searchCustomers = useCallback(async (term) => {
        if (!term.trim()) {
            setIsSearchMode(false)
            setSearchResults([])
            return
        }

        setIsSearching(true)
        setError('')
        try {
            const data = await customerAPI.searchCustomersByParam(term)
            const hasEnvelope = Array.isArray(data?.customers)
            const results = hasEnvelope ? data.customers : (Array.isArray(data) ? data : [])
            setSearchResults(results)
            setIsSearchMode(true)
            setTotal(results.length)
            setPage(1)
        } catch (e) {
            setError('Failed to search customers.')
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }, [])

    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchCustomers(searchTerm)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchTerm, searchCustomers])

    const clearSearch = () => {
        setSearchTerm('')
        setIsSearchMode(false)
        setSearchResults([])
        setPage(1)
    }


    const tableHeaders = [
        'Customer ID', 'Store ID', 'First Name', 'Last Name', 'Email',
        'Address', 'City', 'Country', 'Active', 'Create Date'
    ]


    const canPrev = page > 1
    const canNext = page < totalPages

    const visibleCustomers = useMemo(() => {
        const dataSource = isSearchMode ? searchResults : customers
        const start = (page - 1) * limit
        const end = start + limit
        return Array.isArray(dataSource) ? dataSource.slice(start, end) : []
    }, [isSearchMode, searchResults, customers, page, limit])


    return (
        <div className="customersScreenContainer">
            <div className="customersScreenHeader">
                <h1 className="customersScreenTitle">Customers</h1>
                <CustomersControls
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isSearching={isSearching}
                    isSearchMode={isSearchMode}
                    clearSearch={clearSearch}
                    limit={limit}
                    setLimit={setLimit}
                    setPage={setPage}
                />
            </div>

            {error && (
                <div className="customersScreenError">{error}</div>
            )}

            <div className="customersScreenTableWrapper">
                <div className={`customersTable ${isLoading || isSearching ? 'loading' : ''}`} role="table">
                    <div className="customersTableHeader" role="row">
                        {tableHeaders.map((header, index) => (
                            <div key={index} className="customersTableCell customersTableCell--head" role="columnheader">
                                {header}
                            </div>
                        ))}
                    </div>
                    {visibleCustomers.map((customer) => (
                        <CustomerRow 
                            key={customer.customer_id || customer.id} 
                            customer={customer}
                        />
                    ))}
                    {isLoading || isSearching ? (
                        <div className="customersScreenLoadingOverlay">
                            {isSearching ? 'Searching...' : 'Loading...'}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="customersScreenPagination">
                <button
                    type="button"
                    className={`customersScreenPageBtn ${!canPrev ? 'customersScreenPageBtn--disabled' : ''}`}
                    disabled={!canPrev}
                    onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
                >
                    Prev
                </button>
                <div className="customersScreenPageInfo">
                    Page {page} of {totalPages}
                </div>
                <button
                    type="button"
                    className={`customersScreenPageBtn ${!canNext ? 'customersScreenPageBtn--disabled' : ''}`}
                    disabled={!canNext}
                    onClick={() => canNext && setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default CustomersScreen


