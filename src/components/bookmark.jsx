import React from 'react'

const BookMark = ({ onToggleBookMark, userId, user }) => {
    const handleToggleBookMark = () => {
        onToggleBookMark(userId)
    }

    return (
        <button className='btn btn-light' onClick={handleToggleBookMark}>
            <i
                className={`bi bi-bookmark-star${user.bookmark ? '-fill' : ''}`}
            ></i>
        </button>
    )
}

export default BookMark
