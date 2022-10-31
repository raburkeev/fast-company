import React from 'react'
import PropTypes from 'prop-types'
import {dateFunction} from '../../../utils/date/dateFunction'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentUserId, getUserById} from '../../../store/users'
import {removeComment} from '../../../store/comments'

const CommentComponent = ({content, userId, _id: id, created_at: created}) => {
    const dispatch = useDispatch()
    const user = useSelector(getUserById(userId))
    const currentUserId = useSelector(getCurrentUserId())

    const onRemove = () => {
        dispatch(removeComment(id))
    }

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.img}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user.name}
                                        <span className="small">{` ${dateFunction(created)}`}</span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button className="btn btn-sm text-primary d-flex align-items-center" onClick={onRemove}
                                        >
                                            <i className="bi bi-x-lg"/>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentComponent.propTypes = {
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    userName: PropTypes.string,
    created_at: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
}

export default CommentComponent
