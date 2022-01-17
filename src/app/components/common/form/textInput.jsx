/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({ type, name, placeholder, handler, search }) => {
  return (
    <input
      type={type}
      className="form-control border-0 border-bottom border-dark rounded-0"
      name={name}
      placeholder={placeholder}
      value={search}
      onChange={(e) => handler(e.target.value)}
    />
  )
}

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  handler: PropTypes.func
}

export default TextInput
