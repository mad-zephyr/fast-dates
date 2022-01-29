import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AddCommentForm, CommentsList } from '.'
import API from '../../../api'

const ComponentComment = () => {
  const [commentsStatus, updateCommentsStatus] = useState([])
  const [commentsData, setCommentsData] = useState([])
  const [usersNames, setUsersNames] = useState([])
  const params = useParams()
  const { userId } = params

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId)
      .then(data => {
        data = data.reverse()
        setCommentsData(data)
      })
  }, [commentsStatus])

  useEffect(() => {
    API.users.fetchAll().then(data => {
      const names = data.map(data => {
        return {
          _id: data._id,
          name: data.name
        }
      })
      setUsersNames(names)
    })
  }, [])

  const handleUpdateComments = () => {
    updateCommentsStatus(prevCommentStatus => {
      return (prevCommentStatus += 1)
    })
  }

  return (
    <>
      <AddCommentForm
        onChange={handleUpdateComments}
        userId={userId}
      />
      {commentsData && <CommentsList
        commentsData={commentsData}
        userId={userId}
        usersNames={usersNames}
        onChange={handleUpdateComments}
      />}
    </>
  )
}

export default ComponentComment
