/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, loadUsersList, getDataStatus } from '../../../store/users'
import { useParams } from 'react-router-dom'

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const user = useSelector(getUserById(userId))
    const loadUserStatus = useSelector(getDataStatus())

    console.log(user, 'loadUserStatus: ', loadUserStatus)

    if (user && loadUserStatus) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default UserPage
