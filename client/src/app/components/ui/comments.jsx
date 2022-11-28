import React, {useEffect} from 'react'
import AddCommentForm from '../common/comments/addCommentForm'
import CommentsListComponent from '../common/comments/commentsListComponent'
import PropTypes from 'prop-types'
import Loader from '../common/loader'
import {useDispatch, useSelector} from 'react-redux'
import {getComments, getCommentsLoadingStatus, loadCommentsList} from '../../store/comments'

const Comments = ({userId}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getCommentsLoadingStatus())
    const comments = useSelector(getComments())
    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    return (
        <>
            <AddCommentForm />
            {!isLoading
                ? <CommentsListComponent userId={userId} comments={comments}/>
                : <Loader loadingTarget={'comments'}/>
            }
        </>
    )
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
