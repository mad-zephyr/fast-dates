import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TextField({ label, type, name, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState(false)

  const getInputClasses = () => {
    return 'form-control' + (error && touched ? ' is-invalid' : '')
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
        {type === 'password' && (
          <button
            style={{ border: '1px solid #ced4da' }}
            className="btn btn-outline-secondary gray-200"
            type="button"
            onClick={toggleShowPassword}
          >
          <i
            className={
              'bi bi-eye' + (showPassword ? '-slash' : '')
            }
          ></i>
          </button>
        )}
        {error && touched && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}
TextField.defaultProps = {
  type: 'text'
}
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  comparisonData: PropTypes.string
}

export default TextField
