import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../../../store/users'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus())
    const { userId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList())
    }, [userId])

    if (!dataStatus) return 'Loading load Users List'
    return children
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UsersLoader
