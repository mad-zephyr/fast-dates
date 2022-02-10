import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.services'
import { toast } from 'react-toastify'
import { setToken } from '../services/localStorage.services'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE}`
    const { profession, qualities, sex } = rest

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setToken(data)
      await createUser({ _id: data.localId, email, password, profession, qualities, sex })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObj = { email: 'Пользователь с таким email уже существует' }
          throw errorObj
        }
      }
    }
  }

  async function singIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setToken(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObj = { email: 'Проверьте введенный email', password: 'Проверьте введенный пароль' }
          throw errorObj
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <AuthContext.Provider value={{ signUp, singIn, currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
