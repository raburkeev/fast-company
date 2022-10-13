import React, {useEffect} from 'react'
import {useAuth} from '../hooks/useAuth'
import Loader from '../components/common/loader'

const Logout = () => {
    const {logout} = useAuth()
    useEffect(() => {
        logout()
    }, [])

    return (
        <Loader />
    )
}

export default Logout
