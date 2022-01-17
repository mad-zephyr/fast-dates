import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/userPage/userPage'
import UsersListPage from '../components/pages/usersListPage/index'
const Users = () => {
    const params = useParams()
    const { userId } = params
    return <div className='container'>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}
    </div>
}

export default Users
