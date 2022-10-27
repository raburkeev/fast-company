import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/editUserPage'
import {useAuth} from '../hooks/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {getDataStatus, loadUsersList} from '../store/users'
import Loader from '../components/common/loader'

const Users = () => {
    const params = useParams()
    const {userId, edit} = params
    const {currentUser} = useAuth()
    const dataStatus = useSelector(getDataStatus())
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList())
        }
    }, [])

    if (!dataStatus) return <Loader loadingTarget={'users'}/>

    return (
        <>
            {userId
                ? (
                    edit === 'edit'
                        ? <EditUserPage userId={currentUser._id}/>
                        : <UserPage/>)
                : <UsersListPage/>
            }
        </>
    )
}

export default Users
