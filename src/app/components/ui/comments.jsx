import React from 'react'
import AddCommentForm from '../common/comments/addCommentForm'
import CommentsListComponent from '../common/comments/commentsListComponent'
import PropTypes from 'prop-types'
import Loader from '../common/loader'
import {useComments} from '../../hooks/useComments'

const Comments = ({userId}) => {
    const {createComment, comments, removeComment} = useComments()

    const handleSubmit = (data) => {
        createComment(data)
    }

    const handleRemove = (commentId) => {
        removeComment(commentId)
    }

    return comments
        ? (
            <>
                <AddCommentForm onSubmit={handleSubmit}/>
                <CommentsListComponent userId={userId} comments={comments} onRemove={handleRemove}/>
            </>
        )
        : <Loader loadingTarget="comments" />
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
