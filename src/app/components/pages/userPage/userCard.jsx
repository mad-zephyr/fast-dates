import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, QualityCard, MeetingsCard } from '../../common/user'
import { ComponentComment } from '../../common/comments'

const UserCard = () => {
  const params = useParams()
  const { userId } = params

  const users = JSON.parse(window.localStorage.getItem('users'))
  const user = users.find(user => user._id === userId)

  const style = {
    position: 'sticky',
    top: '20px'
  }

  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-md-4 mb-2">
          <div style={style}>
            <Card user={user}/>
            <QualityCard qulities={user?.qualities} />
            <MeetingsCard meetings={user?.completedMeetings}/>
          </div>
        </div>
        <div className="col-md-8">
          <ComponentComment />
        </div>
      </div>
    </div>
  )
}

export default UserCard
