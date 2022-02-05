import { useState, useEffect } from 'react'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import httpService from '../services/http.services'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In progress',
    seccessed: 'Done',
    error: 'Error occured'
  }
  const [status, setStatus] = useState(statusConsts.idle)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)

  const sumCount = qualities.length + users.length + professions.length
  const incementCount = (params) => {
    setCount(prevState => (prevState += 1))
  }
  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }
    const newProgress = Math.floor((count / sumCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConsts.seccessed)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put(`profession/${prof._id}`, prof)
        incementCount()
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user)
        incementCount()
      }
      for (const quality of qualities) {
        await httpService.put(`quality/${quality._id}`, quality)
        incementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConsts.error)
    }
  }

  return { error, initialize, progress, status }
}

export default useMockData
