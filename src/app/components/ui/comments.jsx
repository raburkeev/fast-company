import React from 'react'
import AddCommentForm from '../common/comments/addCommentForm'
import CommentsListComponent from '../common/comments/commentsListComponent'
import PropTypes from 'prop-types'
import Loader from '../common/loader'
import {useComments} from '../../hooks/useComments'

const Comments = ({userId}) => {
    const {createComment, comments} = useComments()

    const handleSubmit = (data) => {
        // api.comments.add({...data, pageId: userId}).then(data => setComments([...comments, data]))
        createComment(data)
    }

    return comments
        ? (
            <>
                <AddCommentForm onSubmit={handleSubmit}/>
                <CommentsListComponent userId={userId} comments={comments}/>
            </>
        )
        : <Loader loadingTarget="comments" />
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
