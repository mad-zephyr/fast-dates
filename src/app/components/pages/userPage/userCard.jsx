/* eslint-disable react/prop-types */
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import QualitiesList from '../../ui/qualities/qualitiesList'

// eslint-disable-next-line react/prop-types
const UserCard = () => {
  const params = useParams()
  const { userId } = params

  const users = JSON.parse(window.localStorage.getItem('users'))
  const user = users.find(user => user._id === userId)

  return (
    <div className='container col-md-6 offset-md-3'>
      <div className="card shadow-sm">
        <div className="card-body">

          <h4 className='card-title'> {user.name}</h4>
          <h6 className='card-subtitle mb-2 text-muted'>Профессия: {user.profession.name}</h6>
          <QualitiesList qualities={user.qualities} />
          <p className='card-text mb-1'>
            Всего свиданий:
            <b>{user.completedMeetings}</b>
          </p>
          <h6 className='mb-3'>Rate: <b>{user.rate}</b></h6>
          <Link type="button" className='btn btn btn-secondary' to={`/users`}>
            Вернуться
          </Link>
          <Link type="button" className='btn btn-outline-warning me-md-2 ms-2' to={`/users/${userId}/edit`}>
            <i className="bi bi-pencil-square"> Изменить</i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserCard
