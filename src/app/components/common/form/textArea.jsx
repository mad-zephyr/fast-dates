import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function TextArea({ label, rows, name, value, onChange, error, onSubmit }) {
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setTouched(false)
  }, [onSubmit])

  const getInputClasses = () => {
    return 'form-control' + (error && touched ? ' is-invalid' : '')
  }

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          type='text'
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          onBlur={() => setTouched(true)}
        />
        {error && touched && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}
TextArea.defaultProps = {
  type: 'text'
}
TextArea.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  onSubmit: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  comparisonData: PropTypes.string
}

export default TextArea
