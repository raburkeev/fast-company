import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Loader from '../../common/loader'
import QualitiesList from '../../ui/qualities/qualitiesList'
import {Link} from 'react-router-dom'

const UserPage = ({id}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        api.users.getById(id).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
            }
        })
    }, [])

    return JSON.stringify(user) !== '{}'
        ? (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <h3>{`Email: ${user.email}`}</h3>
                <QualitiesList user={user}/>
                <h4>{`Завершено встреч: ${user.completedMeetings}`}</h4>
                <h2>{`Оценка: ${user.rate}`}</h2>
                <Link to={`/users/${id}/edit`}>
                    <button>
                        Изменить
                    </button>
                </Link>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5}/>
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
