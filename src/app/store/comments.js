import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

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
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        commentDeleted: (state, action) => {
            state.entities.filter(comment => (
                comment._id !== action.payload
            ))
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentCreated, commentsRequestFailed, commentDeleted } = actions

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(pageId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.createComment(payload)
        dispatch(commentCreated(content))
        dispatch(loadCommentsList(payload.pageId))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const removeComment = (commentId, pageId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(commentDeleted(commentId))
        }
    } catch (error) {

    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
