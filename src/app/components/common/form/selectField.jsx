import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SelectField = (props) => {
  const { label, options, onChange, value, name, defaultOption, error, onSubmit } = props
  const [touched, setTouched] = useState()

  useEffect(() => {
    setTouched(false)
  }, [onSubmit])

  const getInputClasses = () => {
    return 'form-select' + (error && touched ? ' is-invalid' : '')
  }
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(optionName => (
      { name: options[optionName].name, _id: options[optionName]._id }
    ))
    : options

  return (
    <div className="col-md-3 mb-3 w-100">
      <label>
        {label}
      </label>

      <select
        className={getInputClasses()}
        onBlur={() => setTouched(true)}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        { defaultOption && <option disabled value=''>{defaultOption}</option> }

        { optionsArray && optionsArray.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}

      </select>
      {error && <div className="invalid-feedback"> {error} </div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.bool,
  changeTouchState: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField
