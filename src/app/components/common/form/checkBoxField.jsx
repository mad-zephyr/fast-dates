import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const CheckBoxField = (props) => {
  const { onChange, value, children, name, error } = props
  const [touched, setTouched] = useState(false)

  const handlerChange = (e) => {
    setTouched(true)
    onChange({
       target: { name: name, value: e.target.checked }
    })
  }

  return (
    <div className="form-check form-switch mb-3">
      <input
        className={cn('form-check-input', error && touched && 'is-invalid')}
        type="checkbox"
        role="switch"
        id={name}
        name={name}
        defaultChecked={value}
        onBlur={setTouched}
        onClick={handlerChange}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckChecked">
          {children}
      </label>
       <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}

CheckBoxField.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onChange: PropTypes.func
}

export default CheckBoxField
