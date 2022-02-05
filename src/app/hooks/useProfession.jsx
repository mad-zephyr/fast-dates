import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.services'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfession = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessionsList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  function getProfessions(id) {
    return professions.find((prof) => prof._id === id)
  }

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfessions }}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProfessionProvider
