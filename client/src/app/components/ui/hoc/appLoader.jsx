import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {getIsLoggedIn, getUsersLoadingStatus, loadUsersList} from '../../../store/users'
import Loader from '../../common/loader'
import {loadQualitiesList} from '../../../store/qualities'
import {loadProfessionsList} from '../../../store/professions'

const AppLoader = ({children}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    const usersStatusLoading = useSelector(getUsersLoadingStatus())

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
        if (isLoggedIn) {
            dispatch(loadUsersList())
        }
    }, [isLoggedIn])

    if (usersStatusLoading) return <Loader loadingTarget={'users'} />

    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader
