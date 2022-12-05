import {createAction, createSlice} from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import {generateAuthError} from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: {userId: localStorageService.getUserId()},
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    }

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        userLoggedOut: (state, action) => {
            state.entities = null
            state.auth = null
            state.isLoggedIn = false
            state.dataLoaded = false
        },
        userUpdated: (state, action) => {
            const userIndex = state.entities.findIndex(user => user._id === action.payload._id)
            state.entities[userIndex] = action.payload
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const {reducer: usersReducer, actions} = usersSlice
const {usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed, userLoggedOut, userUpdated} = actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const {content} = await userService.get()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

const authRequested = createAction('users/authRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const signIn = ({payload, redirect}) => async (dispatch) => {
    const {email, password} = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({email, password})
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.userId}))
        history.push(redirect)
    } catch (error) {
        const {code, message} = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.userId}))
        history.push('/users')
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

export const updateUser = (data) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const {content} = await userService.update(data)
        dispatch(userUpdated(content))
        history.replace(`/users/${content._id}`)
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
    }
}

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}

export const getUsersList = () => (state) => state.users.entities

export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getDataStatus = () => (state) => state.users.dataLoaded

export const getUserById = (userId) => (state) => {
    return state.users.entities ? state.users.entities.find(user => user._id === userId) : {}
}

export const getCurrentUserData = () => (state) => {
    return state.users.entities ? state.users.entities.find(user => user._id === state.users.auth.userId) : null
}

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getIsLoggedIn = () => (state) => {
    return state.users.isLoggedIn
}

export const getAuthError = () => (state) => state.users.error

export default usersReducer
