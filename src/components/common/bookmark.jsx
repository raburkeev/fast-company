import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ onToggleBookMark, userId, user }) => {
    const handleToggleBookMark = () => {
        onToggleBookMark(userId)
    }

    return (
        <button className="btn btn-light" onClick={handleToggleBookMark}>
            <i
                className={`bi bi-bookmark-star${user.bookmark ? '-fill' : ''}`}
            />
        </button>
    )
}

BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}

export default BookMark
