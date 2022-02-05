import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../../avatar'
import showWhenCreatedComment from '../../../utils/showWhenCreatedComment'
import { Comment } from '.'
import API from '../../../api'

const AvatarIcon = () => {
  return (
    <Avatar
      size={65}
      classes={'rounded-circle shadow-1-strong me-3'}
    />
  )
}
const MemorizedAvatar = React.memo(AvatarIcon)

const CommentsList = ({ commentsData, usersNames, onChange }) => {
  const handlerDeleteComment = (id) => {
    API.comments.remove(id)
    onChange()
  }

  const comments = commentsData.map(comment => {
    const { _id: id, created_at: createdAt } = comment
    const user = usersNames?.find(user => {
      return user._id === comment.userId
    })

    return (
        <div className="d-flex flex-start mb-3" key={id}>
          <MemorizedAvatar />

          <div className=" flex-grow-1 flex-shrink-1">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1">
                  {user?.name}
                  <span className="small" style={{ color: 'grey' }}>
                    {' '}{showWhenCreatedComment(createdAt)}
                  </span>
                </p>

                <button
                  onClick={() => { handlerDeleteComment(id) }}
                  className="btn btn-sm text-primary d-flex align-items-center">
                  <i className="bi bi-x-lg"></i>
                </button>

              </div>
              <p
                className="small mb-0"
                style={{ whiteSpace: 'pre-line' }}
              > {comment.content} </p>
            </div>
          <hr style={{ opacity: '0.1' }} />
          </div>
        </div>
    )
  })

  return comments.length > 0 && usersNames.length > 0
    ? <Comment title='Comments'>
        {comments}
      </Comment>
    : comments.length > 0
    ? <Comment title='Comments' >
        <h5>Загурзка комментариев...</h5>
      </Comment>
    : <Comment>
        <h6> Комментариев пока нет</h6>
      </Comment>
}

CommentsList.propTypes = {
  onChange: PropTypes.func,
  userId: PropTypes.string,
  usersNames: PropTypes.array,
  commentsData: PropTypes.array
}

export default CommentsList
