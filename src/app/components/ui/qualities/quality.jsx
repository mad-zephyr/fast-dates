import React from 'react'
import PropTypes from 'prop-types'
const Quality = ({ quality }) => {
    const { _id, color, name } = quality
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    )
}
Quality.propTypes = {
    quality: PropTypes.object.isRequired
}

export default Quality
