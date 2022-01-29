import React from 'react'
import PropTypes from 'prop-types'

const QualityCard = (props) => {
  const { qulities } = props

  const allQualities = qulities.map(quality => (
    <span key={quality._id} className={`badge bg-${quality.color} ms-1`}>{quality.name}</span>
  ))

  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center ">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          {allQualities}
        </p>
      </div>
    </div>
  )
}

QualityCard.propTypes = {
  qulities: PropTypes.arrayOf(PropTypes.object)
}

export default QualityCard
