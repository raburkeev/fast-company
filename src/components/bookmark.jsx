import React from "react"

const BookMark = ({onToggleBookMark, userId, user}) => {
    const handleToggleBookMark = () => {
        onToggleBookMark(userId)
    }

    return (
        <button className="btn btn-light" onClick={handleToggleBookMark}>
            {user.bookmark ? <i className="bi bi-bookmark-star-fill"></i> : <i className="bi bi-bookmark-star"></i>}
        </button>
    )
}

export default BookMark