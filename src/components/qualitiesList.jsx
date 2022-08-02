import React from 'react'
import PropTypes from 'prop-types'
import Quality from './qualitie'

const QualitiesList = ({ user }) => {
    return (
        <>
            {user.qualities.map((quality) => {
                return <Quality quality={quality} key={quality._id} />
            })}
        </>
    )
}

QualitiesList.propTypes = {
    user: PropTypes.object.isRequired
}

export default QualitiesList
