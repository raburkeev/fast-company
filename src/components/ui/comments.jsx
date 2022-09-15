import React, {useEffect, useState} from 'react'
import AddCommentForm from '../common/comments/addCommentForm'
import CommentsListComponent from '../common/comments/commentsListComponent'
import PropTypes from 'prop-types'
import api from '../../api'
import Loader from '../common/loader'

const Comments = ({userId}) => {
    const [comments, setComments] = useState(null)
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then(data => setComments(data))
    }, [])
    return comments
        ? (
            <>
                <AddCommentForm userId={userId} comments={comments} setComments={setComments}/>
                <CommentsListComponent userId={userId} comments={comments} setComments={setComments}/>
            </>
        )
        : <Loader loadingTarget="comments" />
}

Comments.propTypes = {
    userId: PropTypes.string.isRequired
}

export default Comments
