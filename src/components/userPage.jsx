import React, { useEffect, useState } from 'react'
import api from '../api/index'
import PropTypes from 'prop-types'
import Loader from './loader'
import { useHistory } from 'react-router-dom'

const UserPage = ({ id }) => { // может в 
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        api.users.getById(id).then((data) => {
            if (typeof data !== 'undefined') { //ну если ты хочешь проверить на undefined/ можно if (data !== undefined)
                setUser(data)
            }
        })
    }, [])

    const handleReturnToUsers = () => {
        history.push('/users')
    }

    return user
        ? (
            <>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                {user.qualities.map(quality => {
                    return <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>{quality.name}</span>
                })}
                <h4>{`Завершено встреч: ${user.completedMeetings}`}</h4>
                <h2>{`Оценка: ${user.rate}`}</h2>
                <button onClick={handleReturnToUsers} >Все пользователи</button>
            </>
        )
        : <Loader loadingTarget={'user'} margin={5} />
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
