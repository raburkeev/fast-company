import React from 'react'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/editUserPage'
import {useSelector} from 'react-redux'
import {getCurrentUserId} from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
    const params = useParams()
    const {userId, edit} = params
    const currentUserId = useSelector(getCurrentUserId())

    return (
        <>
            <UsersLoader>
                {userId
                    ? (
                        edit === 'edit'
                            ? <EditUserPage userId={currentUserId}/>
                            : <UserPage/>)
                    : <UsersListPage/>
                }
            </UsersLoader>
        </>
    )
}

export default Users
