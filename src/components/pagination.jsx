import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)

    return (
        <nav className="d-flex justify-content-center">
            <ul className="pagination">
                {currentPage !== 1 ? (
                    <li>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                ) : null}
                {pages.map((page) => (
                    <li
                        className={`page-item ${
                            page === currentPage ? 'active' : ''
                        }`}
                        key={`page_${page}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                {currentPage !== pages.length ? (
                    <li>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                ) : null}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}

export default Pagination
