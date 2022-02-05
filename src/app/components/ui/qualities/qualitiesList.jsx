import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { isLoading, quality } = useQualities()
  const qualityArr = []

  qualities?.forEach(id => {
    quality?.forEach(qualityObj => qualityObj._id === id && qualityArr.push(qualityObj))
  })

  return (
    <>{
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
