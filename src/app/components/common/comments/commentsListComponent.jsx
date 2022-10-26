import React from 'react'
import PropTypes from 'prop-types'
import CommentComponent from './commentComponent'
import _ from 'lodash'

const CommentsListComponent = ({comments, onRemove}) => {
    const handleRemove = (commentId) => {
        onRemove(commentId)
    }
    const sortedComments = _.orderBy(comments, 'created_at', 'desc')

    return JSON.stringify(sortedComments) !== '[]'
        ? (
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr/>
                    {sortedComments.map(comment => (
                        <CommentComponent key={comment._id} {...comment} onRemove={handleRemove}/>
                    ))}
                </div>
            </div>
        )
        : null
}

CommentsListComponent.propTypes = {
    comments: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default CommentsListComponent
