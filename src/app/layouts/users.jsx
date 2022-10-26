import React from 'react'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/editUserPage'
import UserProvider from '../hooks/useUsers'
import {useAuth} from '../hooks/useAuth'

const Users = () => {
    const params = useParams()
    const {userId, edit} = params
    const {currentUser} = useAuth()

    return (
        <>
            <UserProvider>
                {userId
                    ? (
                        edit === 'edit'
                            ? <EditUserPage userId={currentUser._id}/>
                            : <UserPage/>)
                    : <UsersListPage/>
                }
            </UserProvider>
        </>
    )
}

export default Users
