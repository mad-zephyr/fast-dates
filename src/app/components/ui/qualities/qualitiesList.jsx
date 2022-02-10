import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities: qualitiesUser }) => {
  const { isLoading, qualities } = useQualities()
  const qualityArr = []

  qualitiesUser?.forEach(id => {
    qualities?.forEach(qualityObj => qualityObj._id === id && qualityArr.push(qualityObj))
  })

  return (
    <>
      {
        !isLoading
          ? qualityArr.map((qual) => <Quality key={qual._id} {...qual} />)
          : 'Loading...'
      }
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
