import {createSlice} from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import {isOutDated} from '../utils/date/isOutdated'

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const {reducer: professionsReducer, actions} = professionsSlice
const {professionsRequested, professionsReceived, professionsRequestFailed} = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().professions
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const {content} = await professionService.get()
            dispatch(professionsReceived(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error.message))
        }
    }
}

export const getProfessionsList = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading
export const getProfessionById = (profId) => (state) => {
    return state.professions.entities ? state.professions.entities.find(prof => prof._id === profId) : ''
}

export default professionsReducer
