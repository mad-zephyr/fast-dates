import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ label, name, onChange, value, options }) => {
  return (
    <div className="mb-2">
      <label className='form-label'>{label}</label>
      <div>
        {options.map(option => (
        <div key={`${option.name}_${option.value}`} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${option.name}_${option.value}`}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
          />
          <label
            className="form-check-label"
            htmlFor={`${option.name}_${option.value}`}>
              {option.name}
          </label>
        </div>
      ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default RadioField
