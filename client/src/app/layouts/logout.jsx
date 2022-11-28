import React, {useEffect} from 'react'
import Loader from '../components/common/loader'
import {useDispatch} from 'react-redux'
import {logout} from '../store/users'

const Logout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logout())
    }, [])

    return (
        <Loader />
    )
}

export default Logout
