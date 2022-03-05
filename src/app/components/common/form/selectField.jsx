import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
  const getInputClasses = () => {
    return `form-select${error ? ' is-invalid' : ''}`
  }
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map(optionName => ({
          name: options[optionName].name,
          _id: options[optionName]._id
        }))
      : options

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        value={value}
        onChange={handleChange}
        name={name}
      >
        <option disabled value={defaultOption}>
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map(option => (
            <option value={option._id || option.value} key={option._id || option.value}>
              {option.name || option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default SelectField
