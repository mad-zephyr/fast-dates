import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/userPage/userPage'
import UsersListPage from '../components/pages/usersListPage/index'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const params = useParams()
  const { userId } = params

  return (
    <UserProvider>
      <div className='container'>
        { userId
            ? <UserPage userId={userId} />
            : <UsersListPage />
        }
      </div>
    </UserProvider>
  )
}

export default Users
