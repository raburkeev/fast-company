import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
        } else {
            onSort({ path: item, order: 'asc' })
        }
    }

    const showArrowOnSelectedSort = (column) => {
        if (column.path) {
            if (column.path === selectedSort.path && selectedSort.order === 'asc') {
                return <i className="bi bi-caret-down-fill mx-1" />
            } else if (column.path === selectedSort.path && selectedSort.order === 'desc') {
                return <i className="bi bi-caret-up-fill mx-1" />
            }
        }
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        scope="col"
                        {...{ role: columns[column].path && 'button' }}
                    >
                        {columns[column].name}
                        {showArrowOnSelectedSort(columns[column])}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader
