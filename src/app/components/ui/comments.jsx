import React, {useEffect} from 'react'
import AddCommentForm from '../common/comments/addCommentForm'
import CommentsListComponent from '../common/comments/commentsListComponent'
import PropTypes from 'prop-types'
import Loader from '../common/loader'
import {useComments} from '../../hooks/useComments'
import {useDispatch, useSelector} from 'react-redux'
import {getComments, getCommentsLoadingStatus, loadCommentsList} from '../../store/comments'

const Comments = ({userId}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])
    const {createComment, removeComment} = useComments()

    const handleSubmit = (data) => {
        createComment(data)
    }

    const handleRemove = (commentId) => {
        removeComment(commentId)
    }

    return (
        <>
            <AddCommentForm onSubmit={handleSubmit}/>
            {!isLoading
                ? <CommentsListComponent userId={userId} comments={comments} onRemove={handleRemove}/>
                : <Loader loadingTarget={'comments'}/>
            }
        </>
    )
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
