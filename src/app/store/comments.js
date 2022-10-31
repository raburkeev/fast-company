import {createSlice} from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import {nanoid} from 'nanoid'
import localStorageService from '../services/localStorage.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload)
        },
        commentRemoveFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const {reducer: commentsReducer, actions} = commentsSlice
const {commentsRequested, commentsReceived, commentsRequestFailed, commentCreated, commentCreateFailed, commentRemoved, commentRemoveFailed} = actions

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const {content} = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = ({data, pageId}) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        userId: localStorageService.getUserId(),
        pageId,
        created_at: Date.now()
    }
    try {
        const {content} = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentCreateFailed(error.message))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    try {
        await commentService.removeComment(commentId)
        dispatch(commentRemoved(commentId))
    } catch (error) {
        dispatch(commentRemoveFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
