import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  const { size, classes } = props

  return <img
    src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`}
    className={classes}
    style={{ width: size, height: size }}

  />
}

Avatar.defaultProps = {
  classes: 'rounded-circle'
}

Avatar.propTypes = {
  classes: PropTypes.string,
  size: PropTypes.number
}

export default Avatar
