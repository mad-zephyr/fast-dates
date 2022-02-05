import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }

  return (
    <div className="container mt-5">
      <h1>Main Page</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><b>Status:</b> {status}</li>
        <li><b>Progress:</b> {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button
        className='btn btn-primary'
        onClick={handleClick}
      >Инициализировать</button>
    </div>
  )
}

export default Main
