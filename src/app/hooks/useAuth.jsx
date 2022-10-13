import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import {toast} from 'react-toastify'
import localStorageService, {setTokens} from '../services/localStorage.service'
import Loader from '../components/common/loader'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signUp({email, password, ...rest}) {
        try {
            const {data} = await httpAuth.post(`accounts:signUp`, {email, password, returnSecureToken: true})
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                img: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const {code, message} = error.response.data.error
            console.log(code, message)
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {email: 'Пользователь с таким Email уже существует'}
                    throw errorObject
                }
            }
        }
    }

    async function signIn({email, password}) {
        try {
            const {data} = await httpAuth.post(`accounts:signInWithPassword`, {email, password, returnSecureToken: true})
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const {code, message} = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {email: 'Пользователя с таким Email не существует'}
                    throw errorObject
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {password: 'Неверный пароль'}
                    throw errorObject
                }
            }
        }
    }

    function logout() {
        localStorageService.removeAuthData()
        setCurrentUser(null)
        history.replace('/')
    }

    async function createUser(data) {
        try {
            const {content} = await userService.create(data)
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const {message} = error.response.data
        setError(message)
    }

    async function getUserData() {
        try {
            const {content} = await userService.getCurrentUser()
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])
    return (
        <AuthContext.Provider value={{signUp, signIn, currentUser, logout}}>
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
