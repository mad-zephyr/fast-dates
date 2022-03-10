/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsLoadingStatus, loadCommentsList, getComments, createComment, removeComment } from '../../store/comments'
import { useParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { userId } = params

    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    const comments = useSelector(getComments())
    const currentUserId = useSelector(getCurrentUserId())

    const isLoading = useSelector(getCommentsLoadingStatus())

    const handleSubmit = (data) => {
        const currentComment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        }
        dispatch(createComment(currentComment))
    }

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id))
    }
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading
                            ? <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                            : 'Loading Comments'
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
