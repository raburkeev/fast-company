import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'

const QualitiesCardComponent = ({user}) => {
    return (
        <div className="card mb-3">
            <div
                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
            >
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p>
                    <Qualities qualities={user.qualities}/>
                </p>
            </div>
        </div>
    )
}

QualitiesCardComponent.propTypes = {
    user: PropTypes.object.isRequired
}

export default QualitiesCardComponent
