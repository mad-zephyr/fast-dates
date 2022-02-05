import React from 'react'
import PropTypes from 'prop-types'
import { useProfession } from '../../hooks/useProfession'

const Profession = ({ id }) => {
  const { isLoading, getProfessions } = useProfession()
  const prof = getProfessions(id)

  return isLoading
    ? 'Loading...'
    : <p>{prof?.name}</p>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
