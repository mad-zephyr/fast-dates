import React from 'react'
import PropTypes from 'prop-types'

const Comment = (props) => {
  const { children, title } = props
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>{title}</h2>
        { title && <hr />}
        <div className="bg-light card-body mb-3">
          <div className="row">
            <div className="col">
            {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default Comment
