import React, { useEffect, useState } from 'react'
import api from '../../../api'
import Loader from '../../common/loader'
import { useHistory, useParams } from 'react-router-dom'
import QualitiesList from '../../ui/qualities/qualitiesList'

const UserPage = () => {
    const [user, setUser] = useState({})
    const history = useHistory()
    const params = useParams()
    const { userId } = params

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
            }
        })
    }, [])

    const handleReturnToUsers = () => {
        history.push('/users')
    }

    return JSON.stringify(user) !== '{}'
        ? (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                <QualitiesList user={user} />
                <h4>{`Завершено встреч: ${user.completedMeetings}`}</h4>
                <h2>{`Оценка: ${user.rate}`}</h2>
                <button onClick={handleReturnToUsers} >Все пользователи</button>
            </div>
        )
        : <Loader loadingTarget={'user'} margin={5} />
}

export default UserPage
