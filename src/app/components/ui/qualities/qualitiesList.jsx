import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useSelector, useDispatch } from 'react-redux'
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesById(qualities))
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])
    if (isLoading) return 'Loading...'
    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality key={quality._id} quality={quality} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
