import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({quality}) => {
    return (
        <span
            className={`badge m-1 bg-${quality.color}`}
        >{`${quality.name}`}</span>
    )
}

Quality.propTypes = {
    quality: PropTypes.object.isRequired
}

export default Quality
