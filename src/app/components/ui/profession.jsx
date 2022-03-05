import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions'

const Profession = ({ id }) => {
    const currentProfession = useSelector(getProfessionById(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())
    if (!isLoading) {
        return <p>{currentProfession.name}</p>
    } else return 'Loading...'
}
Profession.propTypes = {
    id: PropTypes.string
}
export default Profession
