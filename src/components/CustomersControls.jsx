import '../styles/CustomersControls.css'

function CustomersControls({ 
    searchTerm, 
    setSearchTerm, 
    isSearching, 
    isSearchMode, 
    clearSearch, 
    limit, 
    setLimit, 
    setPage,
    onAddCustomer
}) {
    const paginationOptions = [10, 20, 50, 100]

    return (
        <div className="customersScreenControls">
            <div className="customersScreenSearch">
                <div className="customersScreenSearchInputWrapper">
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="customersScreenSearchInput"
                    />
                    {isSearching && (
                        <div className="customersScreenSearchSpinner"></div>
                    )}
                </div>
                {isSearchMode && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="customersScreenClearSearch"
                    >
                        Clear
                    </button>
                )}
            </div>
            <div className="customersScreenActions">
                <button
                    type="button"
                    onClick={onAddCustomer}
                    className="customersScreenAddBtn"
                >
                    Add Customer
                </button>
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
                        {paginationOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    )
}

export default CustomersControls
