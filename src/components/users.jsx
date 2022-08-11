import React, { useState, useEffect } from 'react'
import api from '../api/index'
import UsersList from './usersList'
import UserPage from './userPage'
import { useParams } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [professions, setProfessions] = useState([])
    const [isGroupListLoading, setIsGroupListLoading] = useState(true)
    const params = useParams()
    const { userId } = params

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setIsUsersLoading(false)
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then(data => {
            setIsGroupListLoading(false)
            setProfessions(data)
        })
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    return (
        userId
            ? <UserPage id={userId} />
            : <UsersList
                users={users}
                professions={professions}
                handleDelete={handleDelete}
                handleToggleBookMark={handleToggleBookMark}
                isUsersLoading={isUsersLoading}
                isGroupListLoading={isGroupListLoading}
            />)
}

export default Users
