import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useUser } from '../../../hooks/useUsers'

const QualitiesList = ({ qualities }) => {
  const { quality } = useUser()
  const qualityArr = []

  qualities.forEach(id => {
    quality.forEach(qualityObj => qualityObj._id === id && qualityArr.push(qualityObj))
  })

  return (
    <>
      {qualityArr.map((qual) => <Quality key={qual._id} {...qual} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
