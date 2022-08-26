import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const Qualities = ({ user }) => {
    return (
        <>
            {user.qualities.map((quality) => {
                return <Quality quality={quality} key={quality._id} />
            })}
        </>
    )
}

Qualities.propTypes = {
    user: PropTypes.object.isRequired
}

export default Qualities
