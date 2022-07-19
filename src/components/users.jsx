import React from 'react'
import User from './userComponent'

const Users = ({ users, onDelete, onToggleBookMark }) => {
    return users.map((user) => {
        return (
            <User
                key={user._id}
                user={user}
                onDelete={onDelete}
                onToggleBookMark={onToggleBookMark}
            />
        )
    })
}

export default Users
