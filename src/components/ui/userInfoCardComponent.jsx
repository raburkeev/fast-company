import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const UserInfoCardComponent = ({id, name, profession, rate}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <Link to={`/users/${id}/edit`}>
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <i className="bi bi-gear"/>
                    </button>
                </Link>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"/>
                            <i className="bi bi-caret-up text-secondary" role="button"/>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserInfoCardComponent.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    rate: PropTypes.number.isRequired
}

export default UserInfoCardComponent
