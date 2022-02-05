import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Avatar from '../../avatar'

const Card = (props) => {
  const { user } = props
  const history = useHistory()

  const handlerEdit = () => {
    const location = history.location.pathname
    history.push(`${location}/edit`)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button onClick={handlerEdit} className="position-absolute top-0 end-0 btn btn-light btn-sm">
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <Avatar size={150} />
          <div className="mt-3">
            <h4>{user?.name}</h4>
            <p className="text-secondary mb-1">{user?.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user?.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  user: PropTypes.object
}

export default Card
