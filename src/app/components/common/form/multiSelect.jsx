import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import cn from 'classnames'

const MultiSelectField = ({ label, options, onChange, name, error, value }) => {
  const [touched, setTouched] = useState(false)

  const qualities = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(qualityName => (
      { value: options[qualityName]._id, label: options[qualityName].name }
    ))
    : options

  const handleChange = (selectedData) => {
    onChange({ target: { name: name, value: selectedData } })
  }

  return (
    <>
      <label>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        name={name}
        options={qualities}
        defaultValue={value}
        classNamePrefix="select"
        onChange={handleChange}
        onBlur={setTouched}
        className={cn(
          'basic-multi-select',
          error && touched && 'is-invalid',
          !touched && 'mb-3',
          touched && 'mb-2'
        )}
        />
      {error && <div className={cn(
        'invalid-feedback mb-2',
        error && touched && 'is-invalid'
      )}>{error}</div>}
    </>
  )
}
MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.array,
  name: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default MultiSelectField
