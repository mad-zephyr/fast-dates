import React from 'react'
import PropTypes from 'prop-types'
import UserEditForm from '../../ui/userEditForm'
import { useParams } from 'react-router-dom'
import UserCard from './userCard'

const UserPage = () => {
  const params = useParams()
  const { edit } = params

  if (edit === 'edit') {
    return <UserEditForm />
  } else {
    return <UserCard />
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
