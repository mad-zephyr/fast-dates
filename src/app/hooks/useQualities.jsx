import React, { useContext, useEffect, useState } from 'react'
import qualityService from '../services/quality.services'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const QulitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QulitiesContext)
}

export const QualitiesProvider = ({ children }) => {
  const [qulities, setQulities] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getQuality()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getQuality(id) {
    try {
      const { content } = await qualityService.get(id)
      setQulities(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <QulitiesContext.Provider value={{ isLoading, qulities }}>
      {children}
    </QulitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
