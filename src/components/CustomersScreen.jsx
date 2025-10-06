import { useEffect, useMemo, useState } from 'react'
import { customerAPI } from '../utils/api'
import '../styles/CustomersScreen.css'

function CustomersScreen() {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

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

    const canPrev = page > 1
    const canNext = page < totalPages

    const visibleCustomers = useMemo(() => {
        const start = (page - 1) * limit
        const end = start + limit
        return Array.isArray(customers) ? customers.slice(start, end) : []
    }, [customers, page, limit])

    const formatDate = (value) => {
        if (!value) return ''
        const d = new Date(value)
        if (Number.isNaN(d.getTime())) return String(value)
        return d.toLocaleString()
    }

    return (
        <div className="customersScreenContainer">
            <div className="customersScreenHeader">
                <h1 className="customersScreenTitle">Customers</h1>
                <div className="customersScreenControls">
                    <label className="customersScreenLimitLabel">
                        Per Page
                        <select
                            className="customersScreenLimitSelect"
                            value={limit}
                            onChange={(e) => {
                                setPage(1)
                                setLimit(Number(e.target.value))
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </label>
                </div>
            </div>

            {error && (
                <div className="customersScreenError">{error}</div>
            )}

            <div className="customersScreenTableWrapper">
                {isLoading ? (
                    <div className="customersScreenLoading">Loading...</div>
                ) : (
                    <div className="customersTable" role="table">
                        <div className="customersTableHeader" role="row">
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Customer ID</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Store ID</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">First Name</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Last Name</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Email</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Address</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">City</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Country</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Active</div>
                            <div className="customersTableCell customersTableCell--head" role="columnheader">Create Date</div>
                        </div>
                        {visibleCustomers.map((c) => (
                            <div className="customersTableRow" role="row" key={`${c.customer_id || c.id || Math.random()}`}>
                                <div className="customersTableCell" role="cell">{c.customer_id}</div>
                                <div className="customersTableCell" role="cell">{c.store_id}</div>
                                <div className="customersTableCell" role="cell">{c.first_name}</div>
                                <div className="customersTableCell" role="cell">{c.last_name}</div>
                                <div className="customersTableCell" role="cell">{c.email}</div>
                                <div className="customersTableCell" role="cell">
                                    {c.address ? `${c.address}${c.address2 ? ', ' + c.address2 : ''}${c.district ? ', ' + c.district : ''}` : 'N/A'}
                                </div>
                                <div className="customersTableCell" role="cell">{c.city || 'N/A'}</div>
                                <div className="customersTableCell" role="cell">{c.country || 'N/A'}</div>
                                <div className="customersTableCell" role="cell">{typeof c.active !== 'undefined' ? (c.active ? 'Active' : 'Inactive') : ''}</div>
                                <div className="customersTableCell" role="cell">{formatDate(c.create_date)}</div>
                            </div>
                        ))}
                    </div>
                )}
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


