import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({loadingTarget, margin}) => {
    const getMarginForLoader = () => {
        return [1, 2, 3, 4, 5].includes(margin)
            ? `d-flex align-items-center m-${margin}`
            : 'd-flex align-items-center'
    }

    return (
        <div className={getMarginForLoader()}>
            <div className="spinner-border m-2" role="status" aria-hidden="true"/>
            <strong>Loading {loadingTarget}...</strong>
        </div>
    )
}

Loader.defaultProps = {
    margin: null
}

Loader.propTypes = {
    loadingTarget: PropTypes.string.isRequired,
    margin: PropTypes.number
}

export default Loader
