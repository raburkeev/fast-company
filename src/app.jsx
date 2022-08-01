import React, { useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'
import Loader from './components/loader'

const App = () => {
    const [users, setUsers] = useState([])
    const [isUsersLoading, setIsUsersLoading] = useState(true)

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setIsUsersLoading(false)
            return setUsers(data)
        })
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    return (
        <>
            {isUsersLoading
                ? <Loader loadingTarget={'users'} margin={5}/>
                : (
                    <Users
                        users={users}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
        </>
    )
}

export default App
