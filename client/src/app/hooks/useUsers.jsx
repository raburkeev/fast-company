import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import {toast} from 'react-toastify'
import {useAuth} from './useAuth'

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

const UserProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])
    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users]
            const userIndex = newUsers.findIndex(user => user._id === currentUser._id)
            newUsers[userIndex] = currentUser
            setUsers(newUsers)
        }
    }, [currentUser])

    async function getUsers() {
        try {
            const {content} = await userService.get()
            setUsers(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function getUserById(userId) {
        return users.find(user => user._id === userId)
    }

    function errorCatcher(error) {
        const {message} = error.response.data
        setError(message)
    }

    return (
        <UserContext.Provider value={{users, getUserById}}>
            {!isLoading ? children : 'Loading...'}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserProvider
