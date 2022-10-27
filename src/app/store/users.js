import {createAction, createSlice} from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import {randomInt} from '../utils/randomInt'
import history from '../utils/history'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    },
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
        }
    }
})

const {reducer: usersReducer, actions} = usersSlice
const {usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated} = actions

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
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')

export const signIn = ({payload, redirect}) => async (dispatch) => {
    const {email, password} = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({email, password})
        dispatch(authRequestSuccess({userId: data.localId}))
        localStorageService.setTokens(data)
        history.push(redirect)
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

export const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({email, password})
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.localId}))
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            img: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
            ...rest
        }))
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

function createUser(payload) {
    return async (dispatch) => {
        dispatch(userCreateRequested())
        try {
            const {content} = await userService.create(payload)
            dispatch(userCreated(content))
            history.push('/users')
        } catch (error) {
            dispatch(createUserFailed(error.message))
        }
    }
}

export const getUsersList = () => (state) => state.users.entities

export const getDataStatus = () => (state) => state.users.dataLoaded

export const getUserById = (userId) => (state) => {
    return state.users.entities ? state.users.entities.find(user => user._id === userId) : {}
}

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getIsLoggedIn = () => (state) => {
    console.log(state)
    return state.users.isLoggedIn
}

export default usersReducer
