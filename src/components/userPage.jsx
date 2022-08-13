import React, { useEffect, useState } from 'react'
import api from '../api/index'
import Loader from './loader'
import { useHistory, useParams } from 'react-router-dom'

const UserPage = () => {
    const [user, setUser] = useState({})
    const history = useHistory()
    const params = useParams()
    const { userId } = params

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            if (typeof data !== 'undefined') {
                setUser(data)
                console.log('data', data)
            }
        })
    }, [])

    const handleReturnToUsers = () => {
        history.push('/users')
    }

    return JSON.stringify(user) !== '{}'
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

export default UserPage
